

// 1672. Richest Customer Wealth
// You are given an m x n integer grid accounts where accounts[i][j] is the amount of money the i-th customer has in the j-th bank. Return the wealth that the richest customer has.
// Input: accounts = [[1,2,3],[3,2,1]]
// Output: 6
// Explanation:
// 1st customer has wealth = 1 + 2 + 3 = 6
// 2nd customer has wealth = 3 + 2 + 1 = 6



/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
    const sum = (arr) => arr.reduce((acc, i) => acc + i, 0)
    return Math.max(...accounts.map(i => sum(i)))
};

console.log(maximumWealth([[1, 2, 3], [3, 2, 1]])) // 6
console.log(maximumWealth([[1, 5], [7, 3], [3, 5]])) // 10

// Time Complexity: O(n)

// Space Complexity: O(1)

// link: https://leetcode.com/problems/richest-customer-wealth/

/**=======================================> */

// 1528. Shuffle String
// Given a string s and an integer array indices of the same length.
// The string s will be shuffled such that the character at the ith position moves to indices[i] in the shuffled string.
// Return the shuffled string.
// Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
// Output: "leetcode"

const restoreString = (s, indices) => {
    let arr = Array.from(s)
    for (let i = 0; i < s.length; i++) {
        const el = s[i] // get the element
        const idx = indices[i]  // get the index of the element
        arr[idx] = el // assign the element to the index
    }
    return arr.join('')
}

console.log(restoreString("codeleet", [4, 5, 6, 7, 0, 2, 1, 3])) // leetcode
console.log(restoreString("abc", [0, 1, 2])) // abc
console.log(restoreString("aiohn", [3, 1, 4, 2, 0])) // nihao

/**=======================================> */

// 172. Factorial Trailing Zeroes

// Given an integer n, return the number of trailing zeroes in n!.

// Input: n = 5
// Output: 1
// Explanation: 5! = 120, one trailing zero.

// logic: the number of trailing zeroes in n! is the number of 10s in the prime factorization of n!.
// why we need to count the number of 10s? because 10 = 2 * 5, and we have more 2s than 5s in n!.


const trailingZeroes = (n) => {
    let count = 0
    while (n > 0) {
        n = Math.floor(n / 5) // divide by 5    
        count += n  // add the result to the count
    }
    return count
}

console.log(trailingZeroes(5)) // 1
console.log(trailingZeroes(10)) // 2
console.log(trailingZeroes(3)) // 0

// Time Complexity: O(log n)

// Space Complexity: O(1)

// link: https://leetcode.com/problems/factorial-trailing-zeroes/

/**=======================================> */
// Is Subsequence
// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.
// (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
// Input: s = "abc", t = "ahbgdc"
// Output: true

const isSubsequence = (s, t) => {
    let i = 0
    let j = 0
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++
        }
        j++
    }
    return i === s.length
}

console.log(isSubsequence("abc", "ahbgdc")) // true
console.log(isSubsequence("axc", "ahbgdc")) // false
console.log(isSubsequence("abc", "ahbgdc")) // true

// Time Complexity: O(n)

// link: https://leetcode.com/problems/is-subsequence/description/

/**=======================================> */

// First Unique Character in a String
// Given a string s, return the first non-repeating character in it and return its index. If it does not exist, return -1.
// Input: s = "leetcode"
// Output: 0

const firstUniqChar = (s) => {
    let map = new Map()
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1)
    }
    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) return i
    }
    return -1
}

console.log(firstUniqChar("leetcode")) // 0
console.log(firstUniqChar("loveleetcode")) // 2
console.log(firstUniqChar("aabb")) // -1

// Time Complexity: O(n)
// Link: https://leetcode.com/problems/first-unique-character-in-a-string/description/

/**=======================================> */

// 389. Find the Difference

// You are given two strings s and t.
// String t is generated by random shuffling string s and then adding one more letter at a random position.
// Return the letter that was added to t.
// Input: s = "abcd", t = "abcde"
// Output: "e"

const findTheDifference = (s, t) => {
    let sum1 = 0
    let sum2 = 0
    for (let i = 0; i < s.length; i++) {
        sum1 += s.charCodeAt(i)
    }
    for (let i = 0; i < t.length; i++) {
        sum2 += t.charCodeAt(i)
    }
    return String.fromCharCode(sum2 - sum1)
}

console.log(findTheDifference("abcd", "abcde")) // e
console.log(findTheDifference("", "y")) // y
console.log(findTheDifference("a", "aa")) // a

// Time Complexity: O(n)
// Space Complexity: O(1)

// link: https://leetcode.com/problems/find-the-difference/description/


/**=======================================> */

// 49. Group Anagrams

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
// Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
// Explanation: "eat", "tea", and "ate" are grouped together because they are anagrams.

const groupAnagrams = (strs) => {
    let map = new Map()
    for (let str of strs) {
        let key = [...str].sort().join('')
        if (!map.has(key)) {
            map.set(key, [])
        }
        map.get(key).push(str)
    }
    return Array.from(map.values())
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])) // [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
console.log(groupAnagrams([""])) // [[""]]
console.log(groupAnagrams(["a"])) // [["a"]]
// Time Complexity: O(n * k log k)
// Space Complexity: O(n)

// link: https://leetcode.com/problems/group-anagrams/description/

/**=======================================> */


// 451. Sort Characters By Frequency

// Given a string s, sort it in decreasing order based on the frequency of characters, and return the sorted string.
// Input: s = "tree"
// Output: "eert"
// Explanation: 'e' appears twice while 'r' and 't' both appear once.

const frequencySort = (s) => {
    let map = new Map()
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1)
    }
    return s.split('').sort((a, b) => map.get(b) - map.get(a)).join('')
}

console.log(frequencySort("tree")) // eert
console.log(frequencySort("cccaaa")) // cccaaa
console.log(frequencySort("Aabb")) // bbAa

// Time Complexity: O(n log n)

// Space Complexity: O(n)

// link: https://leetcode.com/problems/sort-characters-by-frequency/description/


/**=======================================> */

// 674. Longest Continuous Increasing Subsequence

// Given an unsorted array of integers nums, return the length of the longest continuous increasing subsequence (i.e. subarray).
// A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.
// Input: nums = [1,3,5,4,7]

const findLengthOfLCIS = (nums) => {
    let max = 1
    let count = 1
    for (let i = 1; i < nums.length; i++) { // start from 1
        if (nums[i] > nums[i - 1]) {    // if the current element is greater than the previous element
            count++ // increment the count
        } else {
            count = 1   // reset the count
        }
        max = Math.max(max, count) // get the maximum value
    }
    return max
}

console.log(findLengthOfLCIS([1, 3, 5, 4, 7])) // 3
console.log(findLengthOfLCIS([2, 2, 2, 2, 2])) // 1
console.log(findLengthOfLCIS([1, 3, 5, 7])) // 4

// Time Complexity: O(n)

// Space Complexity: O(1)

// link: https://leetcode.com/problems/longest-continuous-increasing-subsequence/

/**=======================================> */

// 1957. Delete Characters to Make Fancy String

// A fancy string is a string where no three consecutive characters are equal.
// Given a string s, delete the minimum possible number of characters from s to make it fancy.
// Return the final string after the deletion. It can be shown that the answer will always be unique.
// Input: s = "leeetcode"
// Output: "leetcode"

const makeFancyString = (s) => {
    let res = ''
    let count = 1
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++
        } else {
            count = 1
        }
        if (count < 3) {
            res += s[i]
        }
    }
    return res
}

console.log(makeFancyString("leeetcode")) // leetcode
console.log(makeFancyString("aaabaaaa")) // aabaa
console.log(makeFancyString("aab")) // aab


// Time Complexity: O(n)

// Space Complexity: O(1)

// link: https://leetcode.com/problems/delete-characters-to-make-fancy-string/


/**=======================================> */

// 1122. Relative Sort Array

// Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
// Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that don't appear in arr2 should be placed at the end of arr1 in ascending order.
// Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
// Output: [2,2,2,1,4,3,3,9,6,7,19]




