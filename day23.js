const cups = "364297581".split("").map(x => +x);
const rounds = 10000000;
const cupTotal = 1000000; // cups.length

const realCups = [...new Array(1000000)].map((x,i) => ({val: i}));
for(let i = 0; i < cups.length - 1; i++) {
    realCups[cups[i] - 1].next = realCups[cups[i + 1] - 1];
}
for(let i = cups.length; i < cupTotal - 1; i++) {
    realCups[i].next = realCups[i + 1];
}
// Connect end of our sequence to generic one million cups
realCups[cups[cups.length - 1] - 1].next = realCups[cups.length];
// Connect last cup of one million to start sequence;
realCups[cupTotal - 1].next = realCups[cups[0] - 1];

// Check for missing next
/*
let count = 0;
let curr2 = realCups[0];
do {
    curr2 = curr2.next;
    count++;
} while(curr2 !== realCups[0]);
console.log(count); */

const printCups = (label, cups, marked = -1) =>{
    let els = [];
    let curr = cups[0];
    do {
        if(curr.val === marked) {
            els.push("(" + (curr.val + 1) + ")");
        } else {
            els.push(curr.val + 1);
        }
        curr = curr.next;
    } while(curr !== cups[0]);
    console.log(label + ": " + els.join(" "));
}

// Single round
let currentCup = realCups[cups[0] - 1];
const doRound = () => {
    //printCups("cups", realCups, currentCup.val);
    
    let pickedUp = [currentCup.next, currentCup.next.next, currentCup.next.next.next];
    //console.log("pickedUp:", pickedUp.map(c => c.val + 1).join(", "));

    let destination = realCups[currentCup.val - 1 < 0 ? realCups.length - 1: currentCup.val - 1];
    while(pickedUp.indexOf(destination) !== -1) {
        destination = realCups[destination.val - 1 < 0 ? realCups.length - 1 : destination.val - 1];
    }
    //console.log("destination: " + (destination.val + 1));

    const oldPickedUpNext = pickedUp[2].next;
    const oldDestinationNext = destination.next;
    destination.next = pickedUp[0];
    pickedUp[2].next = oldDestinationNext;
    currentCup.next = oldPickedUpNext;
    
    //printCups("placed", cups);
    currentCup = currentCup.next;
    //console.log();
}

for(let i = 0; i < rounds; i++) {
    if(i % 100000 === 0)
        console.log(`-- move ${i + 1} --`);
    doRound();
}

console.log(`-- final --`);
//printCups('cups', realCups, 1);

const result = [];
let curr = realCups[0].next;
do {
    result.push(curr.val + 1);
    curr = curr.next;
} while(curr !== realCups[0]);
//console.log(result.join(''));

// Part 2
console.log(realCups[0].next.val);
console.log(realCups[0].next.next.val);
console.log(BigInt(realCups[0].next.val + 1) * BigInt(realCups[0].next.next.val + 1));
//cups = "364297581".split("").map(x => +x);
