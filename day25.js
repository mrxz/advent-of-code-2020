const compute = (subject, loopSize, start = 1) => {
    let res = start;
    while(loopSize--) {
        res *= subject
        res %= 20201227;
        //console.log(res);
    }
    return res;
}

const doorPublicKey = compute(7, 11);
const cardPublicKey = compute(7, 8);

console.log(doorPublicKey, cardPublicKey);


const findLoopSize = (subject, target) => {
    let i = 0;
    let res = 1;
    while(true) {
        res *= subject;
        res %= 20201227;
        i++;
        if(res === target) {
            return i;
        }
    }
}

const targetCardPublicKey = 15113849;
const targetDoorPublicKey = 4206373;
console.log(targetCardPublicKey, findLoopSize(7, targetCardPublicKey), compute(7, findLoopSize(7, targetCardPublicKey)))
console.log(targetDoorPublicKey, findLoopSize(7, targetDoorPublicKey), compute(7, findLoopSize(7, targetDoorPublicKey)))

console.log(compute(targetCardPublicKey, findLoopSize(7, targetDoorPublicKey)))
console.log(compute(targetDoorPublicKey, findLoopSize(7, targetCardPublicKey)))

