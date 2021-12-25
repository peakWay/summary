
/** 文件路径经常通过通用符*来表示某文件夹下的所有文件 */

class Glob {
    constructor(glob) {
        this.glob = glob;

        //?匹配除/以外的任意字符，*匹配0或多个这样的字符
        let regexpText = glob.replace('?', '([^/])').replace('*', '([^/]*)');

        this.regexp = new RegExp(`^${regexpText}$`, 'u');
    }

    toString() {return this.glob;}
    [Symbol.search](s) { return s.search(this.regexp); }
    [Symbol.match](s) { return s.match(this.regexp); }
    [Symbol.replace](s, replacement) { return s.replace(this.regexp, replacement); }
}

function template(strings, ...values) {
    console.log(strings, values)
}

let name = '怪老头';
let age = '25';
template`我是${name},今年${age}岁`;