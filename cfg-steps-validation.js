const CFG = require('context-free-js');

const rules1 = {
    'S': ['aAa', 'bBb'],
    'A': ['a', 'null'],
    'B': ['b', 'null']
}
const grammar1 = new CFG.Grammar('S', rules1);

function displayGrammar(grammar, grammarNum) {
    let output = `G${grammarNum} = ({${Object.keys(grammar.rules).join(', ')}}, {a, b}, P, ${grammar.start}),\n`;
    output += `P = {\n`;

    for (const [key, productions] of Object.entries(grammar.rules)) {
        const formattedProductions = productions.map(p => p === 'null' ? 'ε' : p).join(' | ');
        output += `  ${key} → ${formattedProductions},\n`;
    }

    output = output.slice(0, -2); // Remove the last comma
    output += `\n}`;

    return output;
}

function displayProductions(nullProductions) {
    let output = `Produção(ões) vazia(s) encontrada(s) em:\n`;

    for (const [key, productions] of Object.entries(nullProductions)) {
        const formattedProductions = productions.map(p => p === 'null' ? 'ε' : p).join(' | ');
        output += `  ${key} → ${formattedProductions},\n`;
    }

    output = output.slice(0, -2); // Remove the last comma and newline
    return output;
}

console.log(displayGrammar(grammar1, 1));


//check if the first step (null productions) is applied
function hasNullProductions(grammar){
    const rules = grammar.rules;
    const nullProductions = {};
    for(const key in rules){
        if(rules.hasOwnProperty(key)){
            const productions = rules[key];
            productions.forEach(value => {
                if(value === 'null'){
                    if(!nullProductions[key]){
                       nullProductions[key] = [];
                   }
                   nullProductions[key].push(...productions);
                }
            });
        }
    }
    if(nullProductions){
        console.log(displayProductions(nullProductions));
    }
    else{
        console.log("Etapa não aplicável!");
    }
}

hasNullProductions(grammar1)

//check if the second step (non-terminal replace) is applied

//check if the third step (simbolos improdutivos) is applied

/*
print grammar function in a way that is simple to understand
 grammarName: {
  S -> A | B,
  A -> a | b
 }*/

//run grammar tests (txt file ?)
