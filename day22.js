const input = [
"Player 1:",
"30",
"42",
"25",
"7",
"29",
"1",
"16",
"50",
"11",
"40",
"4",
"41",
"3",
"12",
"8",
"20",
"32",
"38",
"31",
"2",
"44",
"28",
"33",
"18",
"10",
"",
"Player 2:",
"36",
"13",
"46",
"15",
"27",
"45",
"5",
"19",
"39",
"24",
"14",
"9",
"17",
"22",
"37",
"47",
"43",
"21",
"6",
"35",
"23",
"48",
"34",
"26",
"49",
]

const decks = [[], null];
input.forEach(line => {
    if(line === "") {
        decks[1] = [];
    } else if(line[0] === "P") {
        return;
    } else if(decks[1] === null) {
        decks[0].push(+line);
    } else {
        decks[1].push(+line);
    }
});


// Rounds
let round = 1;
while(decks[0].length && decks[1].length) {
    console.log(round, decks[0], decks[1]);
    
    // Draw cards
    cards = [...decks[0].splice(0, 1), ...decks[1].splice(0, 1)];
    console.log(cards);
    if(cards[0] > cards[1]) {
        decks[0].splice(decks[0].length, 0, ...cards);
    } else {
        decks[1].splice(decks[1].length, 0, cards[1], cards[0]);
    }
    
    round++;
    //break;
}

const score = (decks[0].length ? decks[0] : decks[1]).reverse().map((x, i) => x * (i + 1)).reduce((a,b) => a+b);
console.log(score);
