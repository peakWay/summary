
(function() {
    console.log('--------提前终止生成器--------')

    function* generator() {
        for(let x of [1, 2, 3]) {
            yield x;
        }
    }

    let g = generator();

    console.log(g.next())    //{value: 1, done: false}
    console.log(g.return(4)) //{value: 4, done: true} 
    console.log(g.next())    //{value: undefined, done: true}

    
    let g1 = generator();
    console.log(g1) //generator{<suspended>}
    try {
        g1.throw('err');
    } catch(e) {
        console.log(e);  //err
    }

    console.log(g1) //generator{<closed>}

    function* generator2() {
        for(let x of [1, 2, 3]) {
            try {
                yield x
            } catch(err) {
                console.log(err)
            }
        }
    }

    let g2 = generator2();
    console.log(g2.next())        //{value:1, done: false}
    g2.throw('err')
    console.log(g2.next())

    console.log('--------提前终止生成器--------')

})()