const inputs = [
    "7,13,x,x,59,x,31,19",
    "17,x,13,19",
    "67,7,59,61",
    "67,x,7,59,61",
    "67,7,x,59,61",
    "1789,37,47,1889",
    "23,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,863,x,x,x,x,x,x,x,x,x,x,x,19,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41"
]
//const input = "23,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,863,x,x,x,x,x,x,x,x,x,x,x,19,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41";

function compute(input) {
    const busses = input.split(",").map(x => +x).map(x => Number.isNaN(x) ? -1 : x);

    console.log(busses);

    const validBusses = busses.map((b, i) => ({wait: i, id: b})).filter(x => x.id != -1);
    const N = validBusses.map(x => x.id).reduce((a,b) => a*b);
    console.log(N);

    const y = [];
    for(var i = 0; i < validBusses.length; i++) {
        y.push(N/validBusses[i].id);
    }
    console.log(y);

    const inverse = (a, n) => {
        console.log("Inverse", a, n);
        let t = 0, newt = 1;
        let r = n, newr = a % n;

        while(newr !== 0) {
            let quotient = ~~(r / newr);
            //console.log("\t", r, newr, quotient);
            [t, newt] = [newt, t - quotient * newt];
            [r, newr] = [newr, r - quotient * newr];
        }

        if(r > 1)
            return "a is not invertible";
        if(t < 0)
            t = t + n;

        return t;
    }

    let z = [];
    for(var i = 0; i < validBusses.length; i++) {
        console.log("Computing z for i=",i);
        z.push(inverse(y[i], validBusses[i].id));
    }
    console.log(z);

    
    //console.log(validBusses.map((x,i) => (x.id - x.wait < 0 ? x.id - x.wait + N : x.id - x.wait) * y[i] * z[i]));
    let a = validBusses.map(x => ({id: x.id, a: x.id - x.wait}))
        .map(x => x.a >= 0 ? x.a : Math.ceil(Math.abs(x.a/x.id)) * x.id + x.a);
    console.log(a);
    
    let x = validBusses.map((x,i) => (((a[i] * y[i])%N) * z[i])%N).reduce((a,b) => (a+b)%N);
    console.log(x);
    
    const valid = (start) => {
        return validBusses.every(x => (start + x.wait) % x.id == 0);
    }
    return [x, valid(x)];
}


//const results = inputs.map(x => compute(x));
//console.log(results);


const better = (input) => {
    let start = 0;
    
    const busses = input.split(",").map(x => +x).map(x => Number.isNaN(x) ? -1 : x);
    const validBusses = busses.map((b, i) => ({wait: i, id: b})).filter(x => x.id != -1);
    let increment = validBusses[0].id;
    for(var i = 1; i < validBusses.length; i++) {
        const bus = validBusses[i];
        while((start + bus.wait) % bus.id !== 0) {
            start += increment;
        }
        
        increment *= bus.id;
    }
    
    return start;
}
const results = inputs.map(x => better(x));
console.log(results);



// 100000000000000
