/*
 * @Author: GuoWei
 * @Date: 2019-09-23 21:40:14
 * @LastEditors: GuoWei
 * @LastEditTime: 2019-09-23 21:58:47
 * @Description: leetcode 17
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 示例:
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
 */

var letterCombinations = function (digits) {
  if (digits === '') return []
  let mapping = ["0", "1",
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z']
  ]
  let ans = ['']
  // debugger
  for (let i = 0; i < digits.length; i++) {
    let num = parseInt(digits[i])
    while (ans[0].length == i) {
      let t = ans.shift()
      for (let s of mapping[num]) {
        ans.push(t + s)
      }
    }
  }
  return ans
};


letterCombinations('23')