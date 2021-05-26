
(function() {
    console.log('--------迭代器--------')
    
    let arr = [1, 2, 3];
    let iter = arr[Symbol.iterator]();

    console.log(iter.next());  //{ value: 1, done: false }
    console.log(iter.next());  //{ value: 2, done: false }
    console.log(iter.next());  //{ value: 3, done: false }
    console.log(iter.next());  //{ value: undefined, done: true }
    console.log(iter.next());  //{ value: undefined, done: true }

    console.log('--------迭代器--------')
})()