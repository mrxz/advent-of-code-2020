let input = [
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

input2 = [
"Player 1:",
"9",
"2",
"6",
"3",
"1",
"",
"Player 2:",
"5",
"8",
"4",
"7",
"10"
]

input3 = [
"Player 1:",
"43",
"19",
"",
"Player 2:",
"2",
"29",
"14",
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

const playRound = (decks, cards, level) => {
    //console.log(level + cards);
    if(decks[0].length >= cards[0] && decks[1].length >= cards[1]) {
        // Recursion;
        return play([[...decks[0].slice(0, cards[0])], [...decks[1].slice(0, cards[1])]], level + "\t");
    }
    return cards[0] > cards[1] ? 0 : 1;
}

const play = (decks, level = "") => {
    let round = 1;
    const rounds = {};
    while(decks[0].length && decks[1].length) {
        const key = decks[0].join(',') + "|" + decks[1].join(",");
        if(rounds[key]) {
            console.log("Round observed before in this game, letting player 1 win");
            return 0; // Player one wins if round is the same as before;
        }
        rounds[key] = true;
        
        //console.log(level + round, decks[0], decks[1]);
        const cards = [...decks[0].splice(0, 1), ...decks[1].splice(0, 1)];
        const roundWinner = playRound(decks, cards, level);
        if(roundWinner) {
            decks[roundWinner].splice(decks[roundWinner].length, 0, cards[1], cards[0]);
        } else {
            decks[roundWinner].splice(decks[roundWinner].length, 0, cards[0], cards[1]);
        }
        
        round++;
    }
    
    // Determine winner
    if(decks[0].length) {
        return 0;
    } else {
        return 1;
    }
}

// Rounds
const winner = play(decks);
const score = decks[winner].reverse().map((x, i) => x * (i + 1)).reduce((a,b) => a+b);
console.log(score);
