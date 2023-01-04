const fs = require('fs');
// 仅对var __encode ='jsjiami.com'有效
// 填入脚本路径，粘贴加密字符串数组，和该数组的名字，运行即可，输出在./output.js
const filename = "moyu-amap.js"
var __Oxf2fb5 = ["\x62\x6F\x64\x79", "\x70\x61\x72\x73\x65", "\x76\x61\x6C\x75\x65\x61\x64\x64\x65\x64\x2F\x61\x6C\x69\x6D\x61\x6D\x61\x2F\x73\x70\x6C\x61\x73\x68\x5F\x73\x63\x72\x65\x65\x6E", "\x69\x6E\x64\x65\x78\x4F\x66", "\x75\x72\x6C", "\x64\x61\x74\x61", "\x61\x64", "\x64\x69\x73\x70\x6C\x61\x79\x5F\x74\x69\x6D\x65", "\x73\x65\x74\x74\x69\x6E\x67", "\x73\x65\x74", "\x73\x74\x61\x72\x74\x5F\x74\x69\x6D\x65", "\x63\x72\x65\x61\x74\x69\x76\x65", "\x65\x6E\x64\x5F\x74\x69\x6D\x65", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x66\x61\x61\x73\x2F\x61\x6D\x61\x70\x2D\x6E\x61\x76\x69\x67\x61\x74\x69\x6F\x6E\x2F\x6D\x61\x69\x6E\x2D\x70\x61\x67\x65", "\x63\x61\x72\x64\x4C\x69\x73\x74", "\x64\x61\x74\x61\x54\x79\x70\x65", "\x4C\x6F\x67\x69\x6E\x43\x61\x72\x64", "\x66\x69\x6C\x74\x65\x72", "\x76\x61\x6C\x75\x65\x73", "\x70\x72\x6F\x66\x69\x6C\x65\x2F\x69\x6E\x64\x65\x78\x2F\x6E\x6F\x64\x65", "\x74\x69\x70\x44\x61\x74\x61", "\x4D\x79\x4F\x72\x64\x65\x72\x43\x61\x72\x64", "\x47\x64\x52\x65\x63\x6F\x6D\x6D\x65\x6E\x64\x43\x61\x72\x64", "\x6E\x65\x77\x5F\x68\x6F\x74\x77\x6F\x72\x64", "\x68\x65\x61\x64\x65\x72\x5F\x68\x6F\x74\x77\x6F\x72\x64", "\x77\x73\x2F\x6D\x73\x67\x62\x6F\x78\x2F\x70\x75\x6C\x6C", "\x6D\x73\x67\x73", "\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x6C\x6F\x67", "\u5220\u9664", "\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A", "\u671F\u5F39\u7A97\uFF0C", "\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C", "\x6A\x73\x6A\x69\x61", "\x6D\x69\x2E\x63\x6F\x6D"];
let paramName = "__Oxf2fb5"

let arr = decodeArr(eval(paramName))
try {
    let data = fs.readFileSync(filename, 'UTF-8');
    for (let i = 0; i < arr.length; i++) {
        let num = "0x" + i.toString(16)
        let str = paramName + "\\[" + num + "\\]"
        let reg = new RegExp(str, "g")
        data = data.replace(reg, "\"" + arr[i] + "\"")
    }

    fs.writeFile(`output.js`, data, function (err) {
        if (err) {
            return console.error(err)
        }
    })
} catch (err) {
    console.error(err)
}

function decodeArr(arr) {
    let result = []
    for (const item of arr) {
        result.push(decodeStr(item))
    }
    return result
}

function decodeStr(str) {
    return str.split("\\")[0]
}