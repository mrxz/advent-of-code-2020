const input = "7,14,0,17,11,1,2".split(",").map(x => +x);
const iterations = 30000000 // 2020

const ages = new Array(iterations);
input.forEach((x, age) => ages[x] = age);

let last = input[input.length - 1];
let i = input.length;
while(i < iterations) {
    const lastNew = (ages[last] == i - 1) || !(last in ages);
    let next = -1;
    if(lastNew) {
        next = 0;
    } else {
        next = (i - 1) - ages[last];
    }
    ages[last] = i - 1;
    
    //console.log("[" + i + "]", last, "=>", next);
    //console.log("[" + i + "]", next);
    
    i++;
    last = next;
}

console.log(last);
