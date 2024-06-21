//TODO: - passar os metodos que apenas mostram a gramatica para outro arquivo (incluindo o generateStepResult)
//      - Criar uma forma onde tudo é rodado de uma vez, separando por ====, (um switch deve resolver tudo)
//      - criar um método que extrai os terminais para que eles sejam corretamente passdado para o displayGrammar
//      - criar gramáticas com outros terminais para ficar mais abrangente

const CFG = require('context-free-js');

const rules1 = {
    'S': ['aAa', 'bBb'],
    'A': ['a', 'ε'],
    'B': ['b', 'ε']
}
const grammar1 = new CFG.Grammar('S', rules1);

const rules2 = {
    'S': ['aS', 'bA', 'B', 'ε'],
    'B': ['aB'],
    'A': ['aAb', 'SB'],
    'C': ['a']
}
const grammar2 = new CFG.Grammar('S', rules2);

const generateStepResult = (obj) => {
    if(Object.keys(obj).length > 0){
        console.log("A(s) seguinte(s) produções devem ser alteradas: ");
        console.log(displayProductions(obj));
    }
    else{
        console.log("Etapa não aplicável !");
    }
}

//check if the first step (null productions) is applied
function hasNullProductions(grammar){
    const rules = grammar.rules;
    const nullProductions = {};
    for(const key in rules){
        if(rules.hasOwnProperty(key)){
            const productions = rules[key];
            productions.forEach(production => {
                if(production === 'ε'){
                    if(!nullProductions[key]){
                       nullProductions[key] = [];
                   }
                   nullProductions[key].push(production);
                }
            });
        }
    }
    generateStepResult(nullProductions);
}

//check if the second step (variable replace) is applied
function hasVariableSubstitution(grammar) {
    const rules = grammar.rules;
    const variables = extractVariables(grammar);
    const variableSubstitutions = {};

    for (const key in rules) {
        if (rules.hasOwnProperty(key)) {
            const productions = rules[key];
            productions.forEach(production => {
                if (variables.indexOf(production) !== -1) {
                    if (!variableSubstitutions[key]) {
                        variableSubstitutions[key] = [];
                    }
                    variableSubstitutions[key].push(production);
                }
            });
        }
    }
    generateStepResult(variableSubstitutions);
}

//check if the third step (unproductive symbols) is applied
function hasUnproductiveSymbols(grammar){
    const rules = grammar.rules;
    const variables = extractVariables(grammar);
    const unusedProductions = {};

    for (const key in rules) {
        const productions = rules[key];
        if(variables.indexOf(key) === -1){
            if(!unusedProductions[key]){
                unusedProductions[key] = [];
            }
            unusedProductions[key].push(...productions);
        }
    }
    generateStepResult(unusedProductions);
}

console.log(displayGrammar(grammar1, 1));
console.log("\nETAPA 1 (PRODUÇÕES VAZIAS):");
hasNullProductions(grammar1);
console.log("\nETAPA 2 (PRODUÇÕES QUE SUBSTITUEM VARIÁVEIS):");
hasVariableSubstitution(grammar1);
console.log("\nETAPA 3 (Símbolos improdutivos):");
hasUnproductiveSymbols(grammar1);




function extractVariables(grammar){
    const variables = new Set();
    variables.add('S');
    const variablesRgx = /[A-Z]/g;
    for(const key in grammar.rules){
        if(grammar.rules.hasOwnProperty(key)){
            const productions = grammar.rules[key];
            productions.forEach(value => {
                let match;
                while((match = variablesRgx.exec(value)) !== null){
                    variables.add(match[0]);
                }
            })
        }
    }
    return Array.from(variables);
}

function displayGrammar(grammar, grammarNum) {
    let output = `G${grammarNum} = ({${Object.keys(grammar.rules).join(', ')}}, {a, b}, P, ${grammar.start}),\n`;
    output += `P = {\n`;

    for (const [key, productions] of Object.entries(grammar.rules)) {
        const formattedProductions = productions.join(' | ');
        output += `  ${key} → ${formattedProductions},\n`;
    }

    output = output.slice(0, -2);
    output += `\n}`;

    return output;
}

function displayProductions(nullProductions) {
    let output = '';

    for (const [key, productions] of Object.entries(nullProductions)) {
        const formattedProductions = productions.join(' | ');
        output += `  ${key} → ${formattedProductions},\n`;
    }

    output = output.slice(0, -2); // Remove the last comma and newline
    return output;
}