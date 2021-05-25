
/**
 * 主要研究下break/continue与label应用
 * 注： 
 * 1.continue与label的结合，如果是在外部循环调用，则与continue等效。如果是在内部循环中调用可以退出该条件下的内部循环
 * 2.break与label的结合，如果循环多少层，都能退出标签所在的那层
 */

let num1 = 0;
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            break;
        }
        num1++;
    }
}
console.log(num1);   //95

let num2 = 0;
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            continue;
        }
        num2++;
    }
}
console.log(num2);   //99

let num3 = 0;
for(let i = 0; i < 10; i++) {
    if (i == 6) {
        break;
    }
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            continue;
        }
        num3++;
    }
}
console.log(num3);   //59

let num4 = 0;
for(let i = 0; i < 10; i++) {
    if (i == 4) {
        continue;
    }
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            break;
        }
        num4++;
    }
}
console.log(num4)   //85

let num5 = 0;
outermost:
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            break outermost;
        }
        num5++;
    }
}
console.log(num5);   //55

let num6 = 0;
outermost:
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            continue outermost; //如果不使用标签结果会是99
        }
        num6++;
    }
}
console.log(num6);   //95


let num7 = 0;
outermost:
for(let i = 0; i < 10; i++) {
    if(i == 4) {
        continue outermost;  //在这与单独continue等效,结果一致
    }
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            break outermost;
        }
        num7++;
    }
}
console.log(num7);   //45

let num8 = 0;
outermost:
for(let i = 0; i < 10; i++) {
    if(i == 6) {
        break outermost;
    }
    for(let j = 0; j < 10; j++) {
        if(i == 5 && j == 5) {
            continue outermost;
        }
        num8++;
    }
}
console.log(num8);   //55


