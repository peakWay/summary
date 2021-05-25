
(function () {
    console.log('--------迭代协议--------')
    let arr = [1, 2, 3]

    //for...of
    for (let v of arr) {
        console.log(v)
    }
    // 1
    // 2
    // 3

    //数组解构
    let [a, b] = arr
    console.log(a, b) //1, 2

    //扩展运算符
    let arr1 = [...arr]
    console.log(arr1) //[1, 2, 3]

    //Array.from
    let arr2 = Array.from(arr)

    //集合
    let map = new Map([arr.map(x => [x, x])])
    console.log(map)  //[[1, 1], [2, 2], [3, 3]]

    //映射
    let set = new Set(arr)
    console.log(set) //{1, 2, 3}
    console.log('--------迭代协议--------')
})()