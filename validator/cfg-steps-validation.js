const {displayGrammar, generateStepResult } = require('./displayers');
const {extractVariables, extractReachableVariables} = require('./extractors');
const {grammar1, grammar2, grammar3, grammar4 } = require('./grammars');

//testGrammar(grammar1, 1);
testGrammar(grammar2, 2);
//testGrammar(grammar3, 3);
//testGrammar(grammar4, 4);


//check if the first step (null productions) is applied
function hasNullProductions(grammar){
    const rules = grammar.rules;
    const nullProductions = {};
    for(const variable in rules){
        const productions = rules[variable];
        productions.forEach(production => {
            if(production === 'ε'){
                if(!nullProductions[variable]){
                       nullProductions[variable] = [];
                   }
                   nullProductions[variable].push(production);
            }
            });
    }
    generateStepResult(nullProductions);
}

//check if the second step (variable replace) is applied
function hasVariableSubstitution(grammar) {
    const rules = grammar.rules;
    const variables = extractVariables(grammar);
    const variableSubstitutions = {};

    for (const variable in rules) {
        const productions = rules[variable];
        productions.forEach(production => {
            if(variables.indexOf(production) !== -1) {
                    if (!variableSubstitutions[variable]) {
                        variableSubstitutions[variable] = [];
                    }
                    variableSubstitutions[variable].push(production);
                }
            });
    }
    generateStepResult(variableSubstitutions);
}

//check if the third step (unproductive symbols) is applied
function hasUnproductiveSymbols(grammar) {
    const rules = grammar.rules;
    const variables = extractVariables(grammar);
    const reachableVariables = extractReachableVariables(grammar);
    const unproductiveSymbols = {};

    variables.forEach(variable => {
        if (!reachableVariables.has(variable)) {
            unproductiveSymbols[variable] = rules[variable];
        }
    });

    generateStepResult(unproductiveSymbols);
}

function testGrammar(grammar, grammarNum){

    console.log("\x1b[1mIniciando validação => \x1b[0m");
    console.log('');

    console.log(displayGrammar(grammar, grammarNum));

    console.log("\x1b[1mETAPA 1 (Produções vazias):\x1b[0m");
    hasNullProductions(grammar);

    console.log("\x1b[1mETAPA 2 (Produções que substituem variáveis):\x1b[0m");
    hasVariableSubstitution(grammar);

    console.log("\x1b[1mETAPA 3 (Símbolos improdutivos):\x1b[0m");
    hasUnproductiveSymbols(grammar);
    console.log('\n\n\n');
}