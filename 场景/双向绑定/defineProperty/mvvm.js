function defineReactive(data, key, val) {
  observe(val)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set(newVal) {
      if (val === newVal) return
      val = newVal
      dep.notify()
    }
  })
}


// 递归遍历对象
function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  /**
   * 
   * @param {*} vm 
   * @param {*} exp 
   * @param {*} cb 
   */
  constructor(vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.value = this.get()  // 调用get方法将自己添加到订阅器
  }

  update() {
    this.run()
  }

  run() {
    let val = this.vm.data[this.exp]
    let oldVal = this.value
    if (val !== oldVal) {
      this.value = val
      this.cb.call(this.vm, this.value, oldVal)
    }
  }

  get() {
    Dep.target = this // 缓存自身
    let value = this.vm.data[this.exp]  //强制执行监听器里的get函数
    Dep.target = null  //释放自己
    return value
  }
}

