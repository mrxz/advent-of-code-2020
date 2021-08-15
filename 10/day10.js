let input = [
111,
56,
160,
128,
25,
182,
131,
174,
87,
52,
23,
30,
93,
157,
36,
155,
183,
167,
130,
50,
71,
98,
42,
129,
18,
13,
99,
146,
81,
184,
1,
51,
137,
8,
9,
43,
115,
121,
171,
77,
97,
149,
83,
89,
2,
38,
139,
152,
29,
180,
10,
165,
114,
75,
82,
104,
108,
156,
96,
150,
105,
44,
100,
69,
72,
143,
32,
172,
84,
161,
118,
47,
17,
177,
7,
61,
4,
103,
66,
76,
138,
53,
88,
122,
22,
123,
37,
90,
134,
41,
64,
127,
166,
173,
168,
58,
26,
24,
33,
151,
57,
181,
31,
124,
140,
3,
19,
16,
80,
164,
70,
65,
]/*
input = [
28,
33,
18,
42,
31,
14,
46,
20,
48,
47,
24,
23,
49,
45,
19,
38,
39,
11,
1,
32,
25,
35,
8,
17,
7,
9,
4,
2,
34,
10,
3,
]*/
//input = [1,2,4,6,7]

const sorted = input.sort((a,b) => a - b);
const rated = sorted[sorted.length - 1] + 3
sorted.push(rated);

const diffs = {
    1: 0,
    2: 0,
    3: 0,
}

let curr = 0;
for(var i = 0; i < sorted.length; i++) {
    const diff = sorted[i] - curr;
    diffs[diff]++;
    curr = sorted[i];
}

console.log(sorted, rated, diffs, diffs[1] * diffs[3]);

// Part 2

const options = {};
sorted.splice(0, 0, 0);
console.log(sorted);
options[sorted.length - 1] = 1;
for(var i = sorted.length - 2; i >= 0; i--) {
    let opts = 0;
    if(sorted[i + 1] - sorted[i] <= 3) {
        console.log("\t",sorted[i],"=>",sorted[i+1]);
        opts += options[i + 1];
    }
    if(sorted[i + 2] - sorted[i] <= 3) {
        console.log("\t",sorted[i],"=>",sorted[i+2]);
        opts += options[i + 2];
    }
    if(sorted[i + 3] - sorted[i] <= 3) {
        console.log("\t",sorted[i],"=>",sorted[i+3]);
        opts += options[i + 3];
    }
    console.log(opts);
    options[i] = opts;
}

/*
let options = 1;
curr = 0;
for(var i = 0; i < sorted.length; i++) {
    let branches = 1;
    if(sorted[i + 1] - curr <= 3) {
        branches++;
    }
    if(sorted[i + 2] - curr <= 3) {
        branches++;
    }
    console.log(i, branches);
    options += branches;
    curr = sorted[i];
}*/
console.log(options)
