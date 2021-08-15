const tokenize = (expression) => {
    const result = [];
    let number = '';
    for(let i = 0; i < expression.length; i++) {
        if(expression[i] === " ") {
            continue;
        }
        if("+*()".indexOf(expression[i]) !== -1) {
            if(number !== "") {
                result.push(+number);
                number = '';
            }
            result.push(expression[i])
        } else {
            // Assume it's a number
            number += expression[i];
        }
    }
    if(number !== "") {
        result.push(+number);
        number = '';
    }
    return result;
}

const precedence = {'+': 2, '*': 1}; // Part 2

const parse = (tokens, i = 0, opPrecedence = 0) => {
    let lhs = null;
    let op = null;
    let rhs = null;
    while(i < tokens.length) {
        console.log(i, lhs, op, rhs, opPrecedence);
        console.log(tokens.join(''));
        console.log(' '.repeat(i) + '^');

        // Need a lhs
        if(lhs === null) {
            if(tokens[i] === '(') {
                [i, lhs] = parse(tokens, i + 1);
            } else if(Number.isInteger(tokens[i])) {
                lhs = tokens[i];
            } else {
                throw "PARSING FAILED: expected lhs value, got: " + tokens[i];
            }
        } else if(op === null) {
            // Expect an operator
            if(tokens[i] === "*" || tokens[i] === "+") {
                if(opPrecedence >= precedence[tokens[i]]) {
                    return [i - 1, lhs];
                }
                op = tokens[i];
            } else if(tokens[i] === ")") {
                console.log('reached closing bracket')
                return [i - (opPrecedence === 0 ? 0 : 1), lhs];
            } else {
                throw "PARSING FAILED: expected operator, got: " + tokens[i];
            }
        } else {
            // Need a rhs
            [i, rhs] = parse(tokens, i, precedence[op]);
            //if(tokens[i] === ')') i--;
            
            // Reduce
            lhs = [lhs, op, rhs];
            op = rhs = null;
        }
        
        i++;
    }
    
    console.log('reached end');
    return [i, lhs];
}

const evaluate = (ast) => {
    if(Number.isInteger(ast)) {
        return ast;
    }
    
    if(ast[1] === '+') {
        return evaluate(ast[0]) + evaluate(ast[2]);
    } else {
        return evaluate(ast[0]) * evaluate(ast[2]);
    }
}

const print = (ast) => {
    if(Number.isInteger(ast)) {
        return ast;
    }
    
    return "(" + print(ast[0]) + " " + ast[1] + " " + print(ast[2]) + ")";
}


const input = [
"(8 + 5 + 5) + (8 + (2 * 6) + (6 * 6 * 9 * 8) + 3 + 9 * 8)",
"(7 + 7 + 3) * 8 * (5 + 9 + 4 + (7 + 8 + 3 * 3 + 9 + 7) + (7 + 6 + 6) * 8) * (4 + 5 * 9)",
"8 * (3 * (3 + 8 + 4 * 9) + (7 * 9) * (3 * 3 * 3 + 6 * 8 * 2) * 7) + 5 + 2",
"2 * (2 + 9 + 6 * (5 + 9 * 2 * 2 * 5 * 5) * (6 * 9 + 4 + 8 + 4 * 9))",
"3 + 2",
"2 * ((5 * 5 + 9 * 5 * 3 + 7) + (8 * 8 + 4) + 7) * 7",
"8 * 3 + 4",
"(5 * 3 * (9 * 9 + 4 * 3) + 2) * (3 + 2 * 2 + (8 + 6) * 3 + 7)",
"((6 + 4 * 5 + 9 + 7 + 9) + 2 + 4 * 3 + 5) + 5 * 4 + (5 * (2 * 5 + 3 + 8 + 4) * 5 * 8) * 8 + 9",
"5 * 7 * (2 * 7 * 2 * 4 + 9) + 8 + 3 + 7",
"2 * (8 + 9 + 5 * 2)",
"3 * 2 + 6 * (6 + (4 + 9 + 7 * 8 * 5)) * 9",
"8 + (3 * 5 + (5 + 3) * (2 + 8 + 6) * 2)",
"(8 + 3 * 2 * (5 * 2 + 3) * 8) + 6 + ((8 + 8 + 4 * 6) * (5 * 4)) + 7",
"2 * (6 * (3 * 5 + 3) + (2 + 9) * 8) + 6 * 4 * 7",
"(2 + 7 + 9 * (3 * 3 + 4) + 5 * 5) * 9 * 4",
"8 + 9 * 5 + 3 * 2 + 7",
"2 + 9 * 4 + (3 + 9 * (6 + 2 * 2) + 9 * (8 + 8 * 3)) * 8",
"9 * ((2 + 7) * 4 + 8 + 9 * 9) + 8",
"(3 * 7 + (8 * 7) + 4 * (3 + 3 * 7 + 7 + 6)) + 2 + 9 * 8",
"9 * (7 * 6 + (2 + 4 * 2 * 9 + 4)) + 9 * 5 * 3 * (6 + (6 + 8 + 8 + 2 * 5) + 5 * 3)",
"(6 + 5 * 6) * (3 + 8 * 6) + 8 + 7",
"(5 * (5 * 2 + 4 * 4 * 5 + 2) * 9 + (2 + 6 * 4 * 2 + 3) * 6) * 4 + ((3 * 7 + 3) + 7) * 8 * 6 * 2",
"5 + 7 + 9 + 6 * 9 * 3",
"8 + 2 * 2 * (8 * (4 * 9 + 4 * 8 * 8) * 3)",
"5 + 5 + 3 + 3 * 7 + (8 + (3 * 9) * 8 * 3)",
"6 * 8 + (5 * 8 * 4 + (4 + 7 * 4 * 4 * 4)) * 6 * 8",
"6 * 2 + (2 + 9 * (2 + 2 + 4 * 5 + 6) * (4 * 9)) + 2 * 4 + 6",
"2 + (8 + (4 + 7 * 5 * 5 + 4)) * 7 + 5 * (2 * 3 * 5 + 6 * 9)",
"2 * 3 + 5 + (2 + (7 + 5 * 3) * (4 * 3))",
"(9 + (3 * 7 * 3) * 9) * 6",
"4 * (2 * 3 * (4 * 3)) * 6 + 7 * 8 * 3",
"((7 * 6 + 6) + 8) + 8 + (5 + 7 + 4 + 5 + 8) + 5 + 4",
"(9 * 7 + (3 * 9 + 7 + 5)) + 7 * 2 * (3 * 8 + 6) * 2 + 7",
"9 * 2 * (5 * (5 + 6 * 6) + 8 * 8 + 7) * (4 + 2) * 7 * 4",
"3 * (9 + (2 * 6 * 4) * 8 + 9 * (9 * 5 * 9) + (2 + 4)) + 2 + (7 * 3 * 3) + 8 + ((2 + 6 + 7) * 9 * (3 + 6 * 5 + 5) + 7 + 3)",
"2 * 3 + 8 + 3 + (9 * (3 * 7 * 5))",
"(2 * (6 * 7 + 9 * 6 + 9) * 6 + 2) + 5 * 9",
"(5 * 3) * 2 * 4 * 6 + 9 * (6 * 7 + 9 + 5 * 9 + 8)",
"2 * 3 * ((8 * 8 * 7 * 7) * 2 * 7 * 5 + 4) * (3 * (3 + 4 * 7 + 4) + 7 * (2 * 2) * 8) * (6 + 6 * 7 + 6 * 7)",
"9 * 6 * 9 + 6 * 4 + ((7 * 5 * 8 * 6 * 3) + 2 + 2)",
"(9 + 7 * 6 * (3 * 8 * 7) * 9 + 9) * 3",
"6 * 5 * 9 * 5 * 9 * 9",
"3 + 9 + 8 * 7 * 8 + 4",
"(3 * (9 * 5 + 8 + 5 + 9)) * 2 * 7",
"(2 * 9) + (4 * (6 + 4 * 3 * 7 + 4) + (9 * 9 + 8) * 7 + 3) + 7",
"(5 * 7 + 2 + 4) * 2 * 8 + 7",
"((7 + 3) + 7 + 3) + 5 + 2",
"3 * 4 * 7 + ((2 * 2 + 9 + 5 * 9) * 9 * 7 * (3 * 4 * 9 * 5)) + 9",
"7 * 7 + 9 * (4 * (8 * 8) + 4 + 2) * 4",
"7 + (4 + 7 + 9 + 3 + 7) + 8 + 7 * (6 + 8 + 9 + (9 + 2 * 5 + 7) + (4 * 9) * (2 * 6))",
"5 + 9 * (2 + (7 + 5 * 4 * 3 + 4 + 4) + 8 * 8 * (4 * 8))",
"6 + ((4 * 4) + (2 + 4 + 5 + 9 + 4 * 7) + (6 + 7 * 4 * 7 * 9 * 2) + 8 * 8 * (7 * 4)) + 4 + 9 + 8",
"(6 + 4) + (3 * 9 + 3) * 4 * 9 * 9 * 8",
"(6 * 8) * 8 + 4 * 4",
"7 * 5 * 9 * 7 + 8 + (3 * 8 * (6 * 4 * 7) * 9 * (8 * 3 * 7 + 4 + 7))",
"(2 * 8 * (7 + 5 * 3 * 6)) * 5",
"6 * (8 * 9 * (3 * 9 + 4) * 7 * 3 * 6) + 3 + 6",
"5 * 7 + 5 + 6 * 4 * (3 * 2 + 4 + 6 * (9 * 4 + 3 * 4 * 3 * 3) + 2)",
"2 * ((4 + 3 * 8 * 2 + 2 + 8) + (6 * 6 + 5 * 4) + 7 + (4 + 4 + 5 + 3 + 5)) + 8 + 7 + 2 + 6",
"(5 + 6) + 8 * (8 + 6 + 6 + 8 * 8) * 7 * 9 + 7",
"(3 * 3 + 4) * 7 + (2 * 8 * (5 + 4 * 3 * 6 * 7 + 6) + 9 * 6 * (5 * 2)) * 8 * 6 * 2",
"7 * 2",
"(4 * (4 + 5 + 7 * 9 * 7 * 2) + 5) * 7 * 7 * 3 + 7 + 8",
"2 * 2 * 6 * 9 * (9 * 5 * 4) + (6 + 2 + 7 * 2 * 6 * 3)",
"9 + 6 + ((4 * 6 + 7 * 8 + 3) + 9 + 8 * 9 + (4 + 4) + 7) * 6 + 3",
"5 * 2 + ((4 + 2 * 6) + (7 + 9 * 4)) * 7 + 4 + 2",
"(8 + 6) * 9 + ((4 + 2 + 8 + 7) + 9 * (6 * 8 + 8 * 7 + 5))",
"2 * (7 + 6) + 3 * 3 * 9",
"(4 * 8 + (8 * 4 * 2 * 7 * 8) + 5 + 9) * 7 * 3 * 5 + 7",
"7 + 8 + 5 * 2 * (3 + 3)",
"5 + 5 * (4 * 4)",
"2 * (9 + 2 + 9) * (3 * 7 + 2 + 4)",
"(9 * (8 * 5 + 5 + 4)) * 7 + 6 * 9 + 8 + 3",
"(3 + 2 + 4 + 2 + (5 * 3) + 3) + (4 * 5 + (2 * 5 * 5) + 9) * 3 * 4",
"4 * (5 * 8 + 3 * 5 + 5) + 5 + 4",
"(6 + 5 * 4 + 9 + 8 * 6) + 3 * 5 + (8 + (2 + 4) + 2 * 7 + 3)",
"5 * 2 * ((3 + 2 + 2 * 7) + 8 * 8) * 4 + 3 * 8",
"6 + 4 + (4 * 2 * 3 + 7 + 3 * 9) * 2 + 7 + 7",
"2 + 3 + (3 * 3 + 8) + 8 + (4 + (5 + 8 + 5 + 4) * 9 + (6 * 8 + 7)) * 6",
"5 * 2 + 4 * (6 * 6)",
"8 + 4 + (8 * (5 * 5 * 8 + 3 + 5) + 8 * 5) + ((9 * 3 * 4 * 8) + 9 * 7 * 7) * 3 + ((9 * 5 * 4 * 8) * 2 * 2)",
"5 * 9 * 6 + (9 + 9 + 8 + 8) * 9",
"7 * 6 * 8 + 6",
"3 + 5 + 3 * (5 + 3 * 4 + (8 * 4 * 9 + 3) + 4 * 5) + 4",
"6 + 7 * 8 * 3",
"4 + 4 + ((9 * 9 * 5) + 3 * (4 + 9)) * 9 + 9",
"4 + 5 * 3 + (5 * 6 + 4 * 2 + 8) + ((3 + 3 + 9 + 3 + 3) + 5 + 5 * (7 + 6 + 3 * 7) + 9)",
"3 * 5 * (2 + 5 * 9 + 3) * 7 + (9 * 6 + 5 * 5) * 7",
"(9 * 2 * 3) * 5 * 9 * 9 + (2 + 2 + 8) * 4",
"5 * (7 + 7 + (5 * 2 * 3 + 3 * 4 * 8) * 4 + (7 * 6 + 9 * 3 * 9 * 9)) + 6 + 2 + 6 + 9",
"(9 + 5 + (9 + 7 + 4 + 7 * 7 + 3) * 3) * (5 + (2 + 2 + 4) * 3 * 6 * 5 + 2) * 3 * 4",
"9 * (5 + 6 + 9 + 2 + 6 + 4) + 7 + 3 * 2 + (7 * 7 * 8 + 7 * 3 + 2)",
"((9 + 4 + 7 * 4 + 4 + 7) + 6 + (3 + 7)) * 4 + (8 * 2 + 3) + 2 * 3",
"(6 + 8) * (7 + 3 + 9 + 2 * 5 * 8)",
"(9 + 6 * 2 * (6 + 8 + 2 * 9 * 9 * 2)) + 7 * 6",
"(4 + 9 + (7 * 8 * 8 * 4) + 6) + 6 + (8 + 9 * (9 * 5 * 6) * 5 + (4 * 2 + 2) * 7)",
"8 * (2 * (5 + 2 + 6 + 9) + 8) * 8 + 8 + 6",
"6 + 8 * 4 * 2 + 2 * 3",
"4 * (6 + 6 + (6 * 8 * 6 + 8 * 6 + 5) + 2 * 4) * 2 * 9 + 3",
"4 * (4 + 4) + (5 + (2 * 3) * (4 + 4 + 7 * 4 + 2 + 3) * 6) * 8 * 4",
"3 * 2 + (3 * 9 * 9)",
"((5 * 3 + 7) * 5 + 7 + 6 + 2 + 3) * 5 + (9 + (8 + 4 + 2 * 2 * 9) * 8 + 9 * 5) + 7 * 3 * 9",
"(3 + 3 * 2 * 5) * 2 * 6",
"8 + 6 + 2 + 9 * (6 + 5 + 4 * 9 + (4 * 7 + 4 + 9 * 6 + 4)) + 5",
"5 * 7 * (9 * 5 * (8 + 4 * 2 + 5) + (8 + 6 + 7 * 3)) + 2 * 9",
"(8 * 7 * 2 * 2 * 8 + 6) + ((8 * 7 * 2 + 4 + 5) * 2 + (7 + 8)) + 3 + (9 * 6 * (6 * 9 + 4) * (8 * 9 * 3 * 2 + 3) + 7 * 5) * 2",
"(2 + 7 * 9 * 6) * (5 + (7 + 8 * 5 + 5 + 4) * 4 * 4 * 2 + 6) + 3 + 2",
"(6 * 5 + 3) * 5 + 7 + 9",
"(3 + 7 + 6) * 4 * (8 + 9 * 9 * 7 * (9 + 2) * 8) * 9 + (8 + 3 * 2 + 4 + 9) * 8",
"4 + ((7 * 5 * 9 * 5 * 7) * (5 + 4 * 3 + 4 + 3) + (7 + 5) + 9) + 9",
"6 * ((4 + 9 + 8) + (5 * 4 * 6) * 6) * (4 + 5 * 2 + 8 + 2 * 3) * 8",
"4 + 4 + 4",
"8 + (8 + 2 + 8 + 4) + (2 * (7 + 7 + 8) + 7 * 5 * 7 + 6) * 3",
"(2 + 7 + 7 + 2 * 3) * (7 + (6 + 6 * 4 * 6) + 6 + 3) + 5",
"6 + ((2 * 8 * 8) + (5 + 2 + 4 * 6 + 7 + 5) * 2 + 3 * 4 + 9) * 3",
"(4 + 6 + (6 + 7) + (2 + 3 + 3 * 4)) + 4 + 2 + 7",
"(9 * 3 * 9 + 3 + 2) + (9 * (2 + 2 + 2)) * 6 + 6 * 9",
"3 * 9 * 8 + 8 * (5 * 6) * (4 * 5 + 3 + 6)",
"(4 * 9 + 2 * 6) * 4 * (9 + 7 * 3 * 5 + 2) * 3 * 4",
"(5 + (4 * 5 + 6 * 4) * 5 * 7 * 8 * 4) * 3 + 8",
"2 + ((8 + 3 + 3 + 8 * 6) + 5 * 6 + (3 * 7 * 4)) * 8 + 4 + 6",
"6 * 4 * 4 * (3 * 9 + (4 * 4) * 4 + 5) * 5",
"8 * (8 * (8 * 2 * 7 * 8 * 8))",
"3 * 9 + 5 * ((6 + 6 + 2 * 3 * 7) * (2 + 9 * 3) + (4 + 5) * 5) * 7 * (7 * 4 + 6 * (8 + 4) + 9)",
"2 + (2 * 4 + 4) + 8 + (5 + 6 + 3 * 3 * 2)",
"(5 * (7 + 2 + 5 * 7 * 6) * 8 + (3 * 8) * 4) * 3",
"(5 * 2 * (4 + 8 * 5 + 8) * 4 + 4 + 2) * 7 + 6 * 8 + ((7 * 7) * 4)",
"3 + ((9 + 8 * 6 + 8 * 4) + 3 * 6) * 5 * 5 * 4 * 2",
"(4 * 3) + ((6 * 4 * 5) * (9 + 7 * 4 + 2 + 2)) + (6 + 6 + 3 + 2 * 2 + 4) * 7",
"5 + (4 + 8 * 5 * 8 * 3) * (6 * 5 * 3 * (2 * 7 + 9 * 3 * 3 * 2) * 3) * 3",
"((4 + 2 + 3 * 8 * 2) * 4 + 6 * 2) * ((5 * 8 * 6) + (6 * 3 * 8 * 8) * 7 * (6 + 2 * 9))",
"(4 + 2 + (4 * 7 + 3 + 6 * 7 * 4)) + 6 * 7 * 9",
"5 + ((2 + 7 + 7 + 3) * 6 * 5) + 6 * 3 * 6 * 7",
"7 * ((4 * 4 * 4 + 3 + 3) * (4 + 4 + 6 + 3 + 3 * 9)) + 4 * 6 * 8 + ((4 + 6) + 4 * 6 + 6 + 3)",
"9 * (4 * 4 + 5 + 3 * (9 * 7 * 5)) * 6 + 4 * 2 + 6",
"(5 * 6 * 4 * 4 + 6 * (5 * 4 + 4 + 5 + 4 * 7)) * 6",
"((3 + 3) + 7 * 3) * 6 * (2 + 5)",
"(2 * 3 + 3) + (5 * (3 + 2 + 3 + 4 + 8 * 7) * 7 * (4 * 5 * 7) * 8) * (7 + 2 + 2) * 7 * 2 + 7",
"3 * 6 * 7 * 5 * (9 * 5 * 5)",
"2 + 8 + ((6 + 2 * 4 * 2) * 8 * 4) + ((5 + 5 + 6) * 7 + 6 * 9 + 6 + 9)",
"2 * 7 + 2 * 6 * 6 * ((6 * 5 + 7 + 4 + 4 + 2) * 4 + 8)",
"5 + (2 + 7 * 7) * 3 + 3",
"(5 + (9 * 8)) * 6 + 4 + 3 * 6",
"6 * (8 + 5 + 3 * 5) * 8 + 4 + 8 + (4 * 5 * (6 + 8 + 5 + 2) + 6)",
"4 * 6 + (8 + 3 + 5) + 8",
"((5 + 6 * 3 * 5) * (8 + 7 + 6 + 5 * 7 * 7) * 8 * 5) * (3 * 7 + 5 * 8 * 2 * 5) + (2 + 7) * 2",
"(3 + (8 * 9) + 5 + (8 + 9 * 7)) + 4 * 4 * ((8 * 6 + 9 * 9) + (2 * 6 * 8 + 5) + 8) * 3",
"3 + 6 * (8 * 9) * 9",
"9 * 9 + 4 * (8 + 5 * 5 * 7 + 4)",
"4 * ((4 + 6 * 9 + 9 * 2 * 5) + 2 + 2 * 9 * 6) * 7 + ((8 + 2 * 6 + 3 * 2) + 4) + 6",
"4 + (5 * 9 + 8) * (8 * (6 + 9 * 9 + 3 * 3) + 9 + 2 * (7 * 2) * (5 + 8 * 5)) + 2",
"(4 + 5 + 6 + 6 + 8 * 8) + 2 * 7 * 4 * (5 * 2 + 6) * 7",
"(8 + 2 * 3 + 8 * 2 * 9) * 6 + (6 + 6 * 2 + 6) + 9",
"5 + 7 + (2 + 5 + 4 + 4 * 2 * 6)",
"((4 * 7 + 7) * 8 * 9 * 8 + (3 + 7 * 3 * 5) + 9) * 3 * 5",
"(6 + 9 + 5 + 3 + 5) * ((6 + 5) * 8 + 4 * 2)",
"3 + 6 * (4 + 8 + 5 + 2) + 8 * ((4 + 6 + 6 + 4) * 4) * ((6 * 6) * 3 * 6 + 8 * 7)",
"(9 * 2 + 5 * 5 + 5) * (3 * (7 * 3 * 9) * 2 * 5 * 4) * 4",
"7 * ((4 + 7 * 8 + 2 * 5 * 9) + (3 + 8 * 5 + 8) * 2 + 2 + (2 * 6 * 8) * 7) + (8 * 5) * (2 * 2 * 4 * 5) + 7",
"7 * 3 * 2 * (3 * (7 + 3 + 3 + 9 * 7) * 5 + 4 * 2 + 7) * 7 + (3 * 7 + 8 * (8 + 2 + 9 * 5) * 9 * 3)",
"4 + 7 + 9 * (6 + (4 + 9 + 6 + 7 + 4) + (6 * 3) * (3 + 3 + 9 * 4 + 8 * 4))",
"(2 + 7 * 9 * (8 + 5 + 2 + 5 * 7 * 3) * 9 + 5) * 4 + 7",
"7 * 8 + 2 + 7 + (3 + 7 * 8 * 2) + (6 + 7 + 3)",
"3 + 3 + (5 * 4 * (2 + 9 + 5 + 8 + 3 + 7) * 4) * 6 + 8 + (3 * 8 * 9)",
"5 + (9 + (8 * 5 * 7 + 3 + 2) * 3 + 4 * 6 + 6) + 6 * 9 + 7",
"4 * (4 * 3 * (4 + 6 + 2 * 8 * 7)) * 5 * 6",
"5 * 5 * 9 * (9 + (8 + 3 * 4 + 3 + 6 * 6) + 7) + 7",
"9 * 4 * 6 + (4 + 9 * 6 + 4) * (8 + 5 + 9) * 3",
"7 + 7 * (3 * 7 * 3 + 3 * (4 * 2 * 6)) + (3 + 7 * 6 + (5 * 6) * 5) * (8 + 5) * 7",
"7 + 4 + 7 * 2",
"5 + 7 * 2 * 9 + (4 + (5 * 3 + 6 * 6 + 3 * 3))",
"4 + (3 + 3 + 7 + 2 * 8) + (6 * 7)",
"((6 + 8 * 6) * 9) + 8 + (5 + (3 + 6 + 9) * 5) + 3 * 3 + 5",
"6 * (2 + 6 * (8 * 9 + 3 * 4 * 7) * 9) * 9",
"(8 * 7 * 6) * 7 + 7 * 6 + 3",
"3 * ((4 + 4 * 6 * 4 * 4 + 5) * 3 * 6 * (3 * 7 + 8 + 5 + 2) * (5 + 5) + 6) + 8",
"5 * (6 * (9 + 5 + 7 + 8 * 4) + 9 * 3) * (3 * 8 + 3 + (6 * 4 * 3) * 7 * 7) + 5 * (6 * (7 * 4 + 9)) + (8 * 5)",
"6 * 8 + ((4 * 4 + 4) + 9 * 4 + 8 + 5) + 6",
"((5 * 6) * 4 * (6 + 3 + 7) * (5 + 7 + 5 * 5) + 6) * 7",
"(4 * (2 * 9 * 6 * 8 * 9) * (5 * 4 * 3) + (5 * 7)) + 3 + 7",
"(5 + (3 + 5 * 5 + 2 + 8 * 5) + 7 * 8 * 6 + 7) * 9 * 3 + 7 * 4",
"(7 * 4 + 4 * 7 + 4) * 6 + 3",
"6 + 4",
"(6 * 3 * 9 + 8 + 7 * 5) + ((5 * 9 * 6 + 6 * 7) * (4 * 7 + 9 * 7 * 8) + 2 + (5 * 7 * 7 + 9 * 5) + 4 + 9) * 5 + 5 + 4 * 6",
"7 * (9 * 2) * (4 + 7 * (2 * 6 * 6))",
"(7 * 2 + 4) * 2 + 8 + 7 + 3 * ((4 * 7 * 7 * 6) * (8 * 4 * 7 * 2 * 7 + 5))",
"4 * 9 * 9 + 2 + (3 + (8 + 8 + 8 + 3 + 9) + (5 * 7 + 5 * 3 + 4 * 8) + 6 * 3 * (3 + 3 * 6 * 8))",
"3 + (9 * 9 * (5 + 9) + 8 * 6 + 3) * 9 + 5 + (7 + 9)",
"(5 * 7) + 5 * 4 * 6 * 5 * 7",
"9 * (4 + 4 + 3 + 3 + 6)",
"3 * 8 * (9 + 3 + 6 + 6 + 8 + 5) + (4 * 2)",
"3 + 6 + 4 * 6 * (9 * 8 * (7 + 6 * 8 + 9) * 4) + 9",
"4 * 6 * (6 * 8 * (2 * 8 * 5 + 5) + 8)",
"9 * 5 * 4 * 9 + (3 + 9 * 4) + 6",
"5 + 7 + (2 + 2 * (2 * 8) * 2 + 6 + 8) + (9 * 3) * 7",
"5 + (2 * 3 + (8 * 8 * 2 * 2 * 7 * 7) + 7 + 8 * 4) * 2 + 4",
"8 * ((6 + 3 + 6 * 3 * 7) + (6 * 5 + 2 * 3 * 4 + 9) + 2 * (9 + 7 * 7)) + 7",
"7 * (7 * 5 * 3) + 2 + (2 * 6 * 5 * 4 * 3 + 2)",
"7 + 8 * 4 * 2 * 9 + (8 * 2 + 7)",
"((4 * 8) * 5 + 2 + 3) * ((8 + 4) + 5) + (6 * (9 + 4) + (2 + 4 * 8 * 9 + 3 + 6) * 5) * ((9 + 9 * 3 * 5 * 8 * 9) + 9 + 3) + 2",
"2 * ((8 * 3 + 5 + 7 + 3) * 9 + 7 * (2 * 6 * 6) + (7 * 7 + 4 * 9 * 8) * (9 + 9 + 3)) + (3 * 7 + 5 + (5 + 4 * 7) + (2 + 9 + 3 + 5 + 2 + 2) * 2) + 3 + 3 * 4",
"(6 + 3 * 9 * (7 + 6) * 6) * 5 + 3 * 9",
"(6 * 9 * (6 + 7 + 6)) + (7 * 8) * 7 * 3 + 5 + ((3 + 2 + 5 * 5) * 9 * 8)",
"5 * (8 * 9 * 8 + 9 * (5 + 4 + 9 + 5 + 9 + 4)) + 9 + 4 * 3",
"(8 * 3 + 8 * 3) + 3 + 9 + 8 * 9",
"(2 * 9 * 4) * 4 + (2 * 4 * 8 + (6 * 2 * 7 + 6) * 7 * 8) + (5 * 5 * 8 + 8) * 5",
"(7 * 7 + 2) + 7 * 6",
"5 + 2 * 6 + 8 + (3 + 4 + 9 + 6)",
"5 + 8 + 8 + 5 * (3 * 3 + 8 * 9) + 6",
"4 * 4 * ((4 * 4) * 7 * 3) + 6 + 8",
"3 * 6 + (8 + (8 + 9 + 4 * 5 * 2) + 5 + (3 + 5)) * 3",
"5 * 3 + (6 + 5 * 4 * 2 * 2) + 9 * 6",
"5 + 3 + 8 + 6",
"7 + (9 + 3) + 6",
"(9 + 5 * 5) * 7 + 9 * 7 * 4 + 9",
"7 + (8 * 8 + 9 + 3) + 4 + 9 + 4",
"8 + ((9 + 3) + 9 + (9 * 9 + 2 + 9 + 7 * 2) * 8 + 5 * 2) * 6",
"(3 * 7 * 3 * 2) * 2 * ((5 * 8 * 7 * 2 + 2) * 9 + 8 * (4 * 5) * 2) + 9 * 6 * 9",
"3 + 9 + (3 + 7 + 2) * 3 * 9 * 8",
"(7 * 9 * 7) + 9 + 5 + ((5 * 8) * 6 * (3 * 8) * (7 * 8 * 6 * 2) + 5 * (5 + 5))",
"3 * 7 + (6 + 4 * 5 * 3 + 4)",
"3 * 4 * 2 + (4 + 3 + 3 + 7 * (6 * 4 * 7) * (6 * 4 + 5 * 3 * 2))",
"6 + (8 * 4 * (2 + 5 * 9 + 3) * 7 * 8)",
"8 + (9 * 7 + 3) + ((2 * 8 * 4 + 9 * 3 * 5) + 3 + 3) * (3 + 9 * 7 * 3 * 2) + 3",
"2 * 9 * (5 + 8 + (8 + 3 * 9 * 7 * 2 * 4) * 8) * (5 + 7 * (5 + 7 + 2 * 9 + 8 * 4) * 3 + (7 + 7 + 5)) * 9 + 3",
"(8 + 9 + 7 + 5) * (8 * (4 + 7 * 4 * 3 * 3 * 9)) * 4",
"((8 * 7 + 3) * 2 + 2) * (4 + 9 * (4 + 2 + 6 * 4 * 4 * 7)) + 5 * 3",
"9 + (6 * 6 * 8 + 5 + 6) * 8 * 7 * 2 * 4",
"7 + 5 * 9 * (3 * 7 + 2) + ((7 + 5 + 5 + 3) * 5) + 9",
"(9 + 7 * 4 * 8) + 8",
"8 * 5 + 5 * (3 * 2 * 7)",
"7 * 8 * 5 + (9 * 8 + 7 * (9 + 5 * 7) + 4 * 4) * 5 + 8",
"(3 + 9 + 6 * (7 * 5) + 5) + 8 * 5 + 8 + 4",
"8 * 6 + (6 * (4 * 7 + 2) + 4 * 2) * 2",
"(3 + 8 * 8) + (6 * 7 + 8 + 2 * 3) * (5 + 5) * (5 * 9 * 2 + 8 + 8 * 9)",
"9 * (6 + 4 + (7 + 6 + 7 + 9 * 8) * 6) * 6 * 5 * 3 * 9",
"((3 + 9) + 4 * 3 * 3) * 5 + 6 * (6 + 5 * 5)",
"3 * 2 + ((3 * 3) + 6 * (4 + 8 * 4 * 3 + 6) + 4) * (9 * 4 + 2 * (5 * 4 + 2 + 4 + 7)) * 2 * (7 * (6 + 8 * 5) + 7 * 8 + 2)",
"(4 + 8 + 5) * ((3 * 2) * 9 + (5 * 6 * 7 + 6 + 8) + 4 + 9 + 6) + 5 * 6 + 4 * 6",
"(3 * (3 * 9) * 2 + 6 * 8 + 6) * 5",
"((9 * 8 * 4 * 4) + 5) + (2 + 8 + 6) * 4",
"(3 * 9 + 6 + 3 + 6 * 7) + 4 * 7 * 7 + 6 + 9",
"3 * 3 * 5 + 5 * 9 + (3 * (3 + 3) + (3 + 9 + 5 + 4 + 9))",
"9 * ((6 + 9 * 5 + 3 + 2 + 4) + (8 + 5 + 4 * 6 * 6)) + (6 * 4 + 9 + 8 + 5 + 7)",
"9 * (8 * 8 * 4 * 8 + 4) * 7",
"5 * (5 * (6 * 6 + 4 + 7) * 5 * 2 * 5 + 6) + (4 * 5 + 2 + 6 * 6 * 9) * (2 * (5 * 6 + 7 + 8 + 2))",
"7 * 7 * 3 * 8 * 7",
"2 + 2 * 9 * (9 * 2 * 2 * 4 + (3 + 4 * 2 * 9 + 9 * 6) * 8) + 4 + 9",
"(6 + 7) * 4 + 3 * 6 * (9 + 2 + 3)",
"4 * (6 * 3 * 4) * ((4 * 3) * 7) * ((8 * 7) + 8 + (6 * 9 * 3))",
"(4 * 4 + 7 + (6 * 6 + 5 * 8) * (8 + 2 + 3) * 8) + 7",
"2 * (5 * (3 + 7 * 2) + 5 + 8 * 7) * 6 + (9 + (2 + 6 + 9 * 4 + 3) + (9 * 8 * 5 * 6 * 3 * 4) + 9 + 7 + 8) + 8",
"((7 + 5 + 2) + 6 + 6 * (4 + 8 + 8) + 5) * (4 * 4 * 9 * (4 * 5) + 2 + 5) * 7",
"2 * 6 + 7 * (7 + 2 + 5 + (5 * 3 * 4 * 9 * 6 * 7) * 9 + 3) + 5",
"9 + 6 * 7 + ((8 + 2 * 5 + 3 + 5) + (7 + 2 + 9 * 2) + 5) + 5 * 6",
"8 * (7 * 3 + 7 + 7 + 8) * 3 * (5 * 4 * 2 + 4 * 2)",
"7 + 7 + 3 * 8 + ((5 + 3 * 7 + 2 * 4 * 4) * 8 * 4 + 7)",
"8 + 8 + 4 * 3 + 9 * (2 + 5 + 3 * (6 * 2 + 5 + 2 + 2))",
"7 * ((2 * 5 + 4 + 9 * 2) + 8 * 8) * 2 * 9 * 3",
"5 * 8 + ((2 * 9 * 8 * 7 + 5) + 2 * 8 + 7) + 5",
"(8 * (9 + 5 * 3 * 5) * (3 * 3)) + 5 + 2 * 5 + ((4 * 5 * 5 + 3 * 9 + 7) * 5 * (6 + 9 * 5 * 8) + 7) * 8",
"(4 + (9 * 9) + (4 + 4 * 6) * 5 * (9 + 2)) * 3 + 9",
"6 + 3 * 3 * (8 * 3 * 5 * (7 + 4 + 6 * 8 + 6 * 9) + 9)",
"8 + (6 + 7) * 4 * 6",
"(4 * 5 * 8 + 3 * 2) + 2 + (7 + 2 + 3 * 7 + 6 + 7) * 5",
"5 + (2 * 7 * 6 + 2 * 9 * 6) * 2 * 3 + 3",
"8 + (3 + 6 + 2) + 5 + 7 + 4",
"5 + 9 + ((4 + 9 * 8 * 2 + 7) * 7 + 6 * 9 + 9) * 7",
"((8 * 7 * 9 + 8 + 9 + 9) + 2 + 5) + 9 + 3 + 4",
"8 * 6 * (4 + 2 + (4 + 3 * 5) + (7 * 4 + 9 * 9) + 9 + 4) * 4",
"9 + 3 * 6 * 6 + (9 * 9 * 4 + (7 + 9 + 5 + 7 + 3)) + ((8 * 9 + 9 + 2) + 8 * (8 * 7 * 3 + 6 + 2 * 4))",
"6 * 3 * 9 + (7 * (6 * 5 + 2 + 7))",
"5 + 8 * (3 + 5 * (6 * 9 + 5 + 9 + 5))",
"4 * 7 * 8 * (4 * (7 + 2 + 7 * 8 + 6 + 6) * 6 + 3)",
"7 + (4 * 6 * 8 + 9 + (6 + 2 + 4 * 7 * 2))",
"3 + 7 * 5 * 3 * (9 * 4) + 6",
"(6 * 8 * 9 + 6 + 5) * 9 + 5 * 4 * 7",
"9 + 4",
"3 * (3 * 7 * (3 + 3 * 9 + 3 + 5) + 6)",
"5 + 3 * (2 * 5 * 3) * 4 * 8",
"6 + ((8 * 7 * 6 + 2 + 5 + 2) + 2) * 7 + 5",
"3 + (9 + 2) * (4 + (9 + 8 * 2 + 5 + 5 + 5) + 7) * 4 * 2 + 5",
"7 + 6 * 7 + 8 * (5 * 7 * 9 * 9 + 2)",
"(9 * (3 * 8 * 9 * 8 + 7)) * 3 + 2 + 2",
"(4 + 3 * 7 * (9 + 9)) + 5 + 9",
"2 * 2 * (7 + 6 + 8 + 5 + 8 * 3) + 9 + (4 + 9 * 5 * 7 + 2 + 7) * 9",
"3 * 2 * (5 * 8 * (5 + 6) * 7 * 2) + 7",
"9 * 2 * 7 * (9 * 5 * 8 * (5 * 8 * 4 + 5 + 3))",
"(8 * (3 + 2 * 4 * 4 + 4 * 2) + 2 + 8 + (7 * 3 * 6 * 6 + 5 + 9) * 9) + 5 + 7 * 9",
"(5 * 3) + 3 * 2",
"7 * 2 * 9 * 9 * 8 + (7 + 4 + (3 * 6 + 6 + 2) + 5)",
"9 + ((6 + 2 * 9 * 2) * (7 * 4 * 6 + 3 * 7) + 5 + 9) + (5 + (5 * 4 * 5 * 8 + 8) + 5 * (3 * 2 * 2 + 4 + 3 * 4))",
"(6 * (8 + 9 + 3 * 3)) + 7 * 6 * 4 + (9 + 4 * 2) + 4",
"((2 + 2) + (8 * 7 * 6 + 4 * 2 + 6) + 3 + (5 + 8 + 2) * 2) + 6 * 9 + 2",
"(3 + 6 + 7 * 2) * 9 + (4 * 9 + (2 + 6 + 4) + 4) + 6 + 9",
"2 + 3 * 3 + 8 + (4 * 4 + 5 + 4 * 4 + 8) * 6",
"(9 * 3) + 9",
"8 * 9 + 4 * (7 * 6 + 3 * 3 + 5) * 8",
"9 + 6 * 7 + 3 * ((8 + 3) + 9 * 3 + 8 + (3 + 7 + 7 * 4) + 7) + 4",
"9 * 2 + 9 * ((8 + 7 * 8 + 7 + 7 + 4) + 4 * (9 * 8 + 3) * 2 + 4 + (5 * 5 * 5 + 2 + 2 + 9)) * 7",
"3 + (8 + (6 * 9 + 6 + 9 + 4 + 9) + 5 * 2 + 6 + 6) + (9 * (8 * 2 + 8 * 8 * 9))",
"5 * (5 + 9 * (8 * 4)) * (7 * 6 * 8) + 2 + 3",
"9 * 5",
"6 + 6 + 9 + 4 + (4 + 9 + (3 + 2) * 2 * 6)",
"(6 * 4 * 7 * 3 + 7) + 5 * (8 * 4 * (4 + 8 * 4) * 9 * 2 * 3) + 9 + 9 * 2",
"(8 * 4) + (5 * 4 + 4 * 4) * ((5 * 4 * 3 + 8) * 8 * 3 * 3 * 9 * 5) + 3 * (4 * 9 * 6)",
"8 * 4 * 6 + 2",
"(7 + 2 + 3 * (8 + 3)) + 2 + 9 * (2 * 2 * (4 + 6 * 6 + 3 * 2 * 8) + 7 + 7) + 8 * 7",
"3 * (6 + 4 * (5 * 4 + 5 * 4 * 5 * 2) * (5 * 4) + 9) + 4 + 6 + 4 * (5 + 6 * (2 * 7 + 6 + 2))",
"9 + 8 + (3 * 6 + 7 + 8 * 9 * 4) * 8 * 9 * ((3 * 8 * 8 + 9 * 7 + 6) * 4 * 2 + (2 * 2 + 4 * 3) + (6 * 6 + 9 + 9 + 8) * (8 + 8 * 4))",
"5 + (7 * 6 * 6 * (3 * 2 * 3 * 6 * 7 + 7) * 7)",
"9 * 9 + 3 * ((7 * 6 + 5 + 4) * 8 * (7 * 8 + 5 * 8) * (4 + 4 + 8 * 8 * 7 * 7) + 3 + 8) * 6",
"2 * ((4 + 2 * 9) * (8 * 3) * 7 + 9) * 6 * 5",
"(3 * (7 + 7 * 2 + 9) + (3 + 8) * 5 * (2 * 4 + 5 + 6 * 9) * 2) + 5 + 8",
"2 * (2 + 8 + 5 * 6) * 2 + 7",
"7 + (6 + 3 + 5 * 6 + 7 * 2)",
"4 + 2 * 3 * (6 + 3 + 5 * 4 + 2) * 9 * (8 * 7 * 5 * 8)",
"5 + (4 * 2 * 4 + 3 + 7 + 5) * 7 + 7",
"8 + 2 + 4 + 7 + 2",
"9 + 4 * 7",
"6 + 5 * (5 + 9 * 7 * 6 * 5 + 7) * (7 + (6 * 9 * 7 + 5 + 6 * 4) + (9 * 9 + 7 * 9)) * 4 + 5",
"7 * 7 * (8 * 3 * 3 + 9) + ((2 + 2) + 7 * 7 + 7 + 7 + 3) * 8",
"2 + (4 * 7 * (7 * 5 * 4 + 5 + 5 + 5) + 7) + 5 + (6 + (9 + 6 + 6 * 3 + 3 + 5) * 2 * 9 + (3 * 7 * 5 + 5)) * (5 * 4 * 2 * 6) * ((7 + 4 + 7 * 2) * 7 + (5 + 7 * 7 * 3 * 4) * 8)",
"((3 + 4) * (9 + 5 * 7 + 5 * 7 + 5) * 4) * 6 * 4 + 9",
"(6 * 9 + 5 + (6 + 8 * 8 * 6 + 6) + 6 + 7) + 7 + 5 * 2 + 2",
"8 * (7 * 4 + 5) * 8",
"5 + 8 + 9 + (6 + 8) + (6 + 4 * 4 * 4 * 5 + 5) * 5",
"4 * 6 * 9 + 8 * (2 * 5 + 2 * (6 * 2 + 4 + 7 * 6 * 2)) * ((7 * 3 + 6) + (2 * 9 * 6 * 8 * 5 + 6) + (8 + 8 * 2 * 9 * 7 + 2) + 8 * 7)",
"4 + 4 + 7 + 5 + 2",
"3 + (8 * 2 * 4) * 8 * (2 + (8 * 5 + 3 * 4 + 4)) * (2 * (5 * 6))",
"7 + 8 + 7 + (2 * 7 * 7 * (9 * 8) * 5)",
"5 + 7 + 9 + 4 * (8 + 6 + 9 * (3 + 9 * 3 + 5 * 3) * 5 + 4) + (8 * (3 * 8))",
"4 * 2 * ((8 + 8 + 4) * (9 + 9) * 5 * 4 + 5 * 9) * 2",
"4 + 3 * 4 * 4 * 6",
"4 + 8 * (5 + 2 * 3 * 8 * 6 * 9) + 6",
"2 + 7 * (8 * 4 * 8 * 2 * 8 + 6) + 7 + 2",
"5 + 3 + ((8 + 3) * 6 + (6 * 2 * 9 * 8 * 8 + 3) + 8 * 2 * 7) + 9 + 3 * ((4 + 9 * 5) * 3 * 4 * 3 * 2 + 9)",
"7 + (8 + (5 + 6 * 4 * 5 + 4 + 2) + (4 * 2) + 3 * 5 + 9) * 5 + 6 * 6",
"7 + 3 * (9 + 3 + 5 + 2) * 9",
"8 * 3 + (9 * (4 * 3 * 4) * 6 + 4 * 7) + 5 * 5 + (4 + 5 * (3 * 4 * 8 + 2 + 3 + 2))",
"(7 * 2 * (7 + 8 * 4 + 7)) * 9 + 5 + 9",
"4 * 7 * 5 + 3 * 5",
"9 * 4 * 4 + 2 * (7 * (7 + 8 * 6 * 9 * 4) + (8 + 2) * 3 + 9 + 5) + 2",
"8 * 7 * 5 + ((5 + 7 + 8 + 4 + 7) + 7 * (9 * 2 + 2) + 9) + 6",
"5 + 4 + (4 + 5 * 5 * 2)",
"6 + 7 * 2",
"9 + (5 + 6 * (3 + 3 * 4 + 3 * 4) * 4 * (8 * 2 + 6 + 6)) * 3 * 3 + 3 + 4",
"((3 + 6) * 8 * 5 + 8 * 2 * 9) * (4 * 7 + (5 + 6 + 5 + 9 + 4)) + ((5 + 6 * 3 + 2 * 8 * 3) + 2 + 9 + 7) + ((6 + 5 * 5 * 2 + 7) * 9) * 7",
"2 + 3 + 6 * (4 + 2 + 8) * ((2 * 8 + 4) + (2 + 3 + 3 + 8))",
"(6 * 2) + 5 * 9 + 2 + ((5 * 7 + 4) * (7 + 4 + 4) * 2 * 7 + (5 + 7 * 2 + 3 + 5) + (6 + 4 + 2)) * 6",
"4 + (5 * 3 * (6 * 7 * 8 * 4 + 5) * 3) + 2 * 7",
"((4 + 7 * 9) * 3) + 9 * (6 + 3 + 8 + 2)",
"4 * 2 + 2 * (9 + 9 * 3 + (9 + 7 * 3 * 3 + 4 + 7) + (8 + 5) + 8) + 8",
"5 + (8 * 4 + 9) * 2 + 2 * 2 * 5",
"(5 * 8 * 3 * 5 + (3 * 2 + 9 * 5) * 6) + 5 + 8 + 3 * 2",
"8 * (2 * (4 + 6 * 3 * 6 * 2 * 2) * (7 + 4 * 9 + 3) + 9)",
"6 * ((4 * 3) * 6 * (5 * 5 * 6 + 6) + (3 * 2) * 5 * 3)",
"8 + (3 * 6 + 4 + 9) * 2",
"2 * 8 * 4 * ((3 * 3 + 9 * 7 * 5) * 7) + 2",
"(6 + 9 * 2 + 4) * 4 * 4 * 3 + 6 * 8",
"2 * 7 * 7 + (3 * 8 + 5) + 5 + 7",
"3 + (9 * 2 + 6 + (4 + 8 + 9 * 5) * 4) * 8",
"9 * (7 + 8)",
"8 * (7 + 8 + (5 + 5 * 8) + 7 + 3) + 6",
"(4 + 2 + 7 * 5) * 9 * 3 + 8 + 7 + ((9 * 4 * 4) + 4 * (6 * 3 * 3 * 6))",
"(2 * 8 + (8 + 4 * 9 * 6 * 2) * 7) * 9 * 6 * 5",
"9 + 7 + (4 + 5 + 6 + 3) + 3 * 6",
"(8 * 2) + 4 + 3 + 7 * 2",
"(4 * 4 + 4) + 8",
"6 + 4 + 8",
"3 * (5 + (2 * 6 * 5 + 7 * 6) + 7 * 2 * 8 * 8) + 8 * 4",
"8 * 7 * (3 * 4 + 6 + 2 * 9 + 9) * 3 + (3 + 5)",
]


const sum = input.map(x => {
    const ast = parse(tokenize(x))[1];
    return evaluate(ast);
}).reduce((a,b) => a+b);
console.log(sum);/** /

//const x = "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"
//const x = "2 * (2 + 2 * 3 + 2) + 1"
const x = "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"
//const x = "2 * (6 + 9 * 8 + 6) + 6"

const ast = parse(tokenize(x))[1];
console.log(evaluate(ast));
console.log(print(ast));
console.log("((((((2 + 4) * 9) * (((6 + 9) * (8 + 6)) + 6)) + 2) + 4) * 2)");
console.log(x);
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2

/**/