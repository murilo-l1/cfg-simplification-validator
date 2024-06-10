const CFG = require('context-free-js');

const rules = {
    'S': ['A'],
    'A': ['a', 'b']
};

console.log(JSON.stringify(rules));

//check if the first step (null productions) is applied

//check if the second step (non-terminal replace) is applied

//check if the third step (improduct symbol) is applied

/*
print grammar function in a way that is simple to understand
 grammarName: {
  S -> A | B,
  A -> a | b
 }*/

//run grammar tests (txt file ?)