function* generator() {}

let g = generator();

console.log(g); //generator {<suspended>}
console.log(g.next()) //{value: undefined, done: true}


function* generator1() {
    return 'oldman'
}

let g1 = generator1();
console.log(g1.next().value) // oldman

let iter = g[Symbol.iterator]();  
console.log(iter); //generator1 {<closed>}
console.log(iter === iter[Symbol.iterator]())  //true