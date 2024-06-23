const {displayGrammar, generateStepResult } = require('./displayers');
const {extractVariables, extractReachableVariables} = require('./extractors');
const {grammar1, grammar2, grammar3, grammar4 } = require('./grammars');

testGrammar(grammar1, 1);
//testGrammar(grammar2, 2);
//testGrammar(grammar3, 3);
//testGrammar(grammar4, 4);


//check if the first step (null productions) is applied
function hasNullProductions(grammar){
    const rules = grammar.rules;
    const nullProductions = {};
    for(const key in rules){

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
    generateStepResult(nullProductions);
}

//check if the second step (variable replace) is applied
function hasVariableSubstitution(grammar) {
    const rules = grammar.rules;
    const variables = extractVariables(grammar);
    const variableSubstitutions = {};

    for (const key in rules) {

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
    generateStepResult(variableSubstitutions);
}

//check if the third step (unproductive symbols) is applied
function hasUnproductiveSymbols(grammar) {
    const rules = grammar.rules;
    const variables = extractVariables(grammar);
    const reachableVariables = extractReachableVariables(grammar);
    const unproductiveSymbols = {};

    // Verifique se as variáveis são inatingíveis
    variables.forEach(variable => {
        if (!reachableVariables.has(variable)) {
            unproductiveSymbols[variable] = rules[variable];
        }
    });

    generateStepResult(unproductiveSymbols);
}

function testGrammar(grammar, grammarNum){
    console.log(displayGrammar(grammar, grammarNum));
    console.log("ETAPA 1 (Produções vazias):");
    hasNullProductions(grammar);
    console.log("ETAPA 2 (Produções que substituem variáveis):");
    hasVariableSubstitution(grammar);
    console.log("ETAPA 3 (Símbolos improdutivos):");
    hasUnproductiveSymbols(grammar);
    console.log('\n\n\n');
}