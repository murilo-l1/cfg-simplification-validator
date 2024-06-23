function extractVariables(grammar){
    const variables = new Set();
    variables.add(grammar.start);
    const variablesRgx = /[A-Z]/g;
    for(const key in grammar.rules){
        const productions = grammar.rules[key];
        productions.forEach(production => {
            let match;
            while((match = variablesRgx.exec(production)) !== null){
                variables.add(match[0]);
            }
        });
    }
    return Array.from(variables);
}

function extractTerminals(grammar){
    const terminals = new Set()
    const rules = grammar.rules;
    const terminalsRgx = /^[a-zε]/g;

    for(const key in rules){
        const productions = rules[key];
        productions.forEach(production => {
            let match;
            while ((match = terminalsRgx.exec(production)) !== null){
                terminals.add(match[0]);
            }
        });
    }
    return Array.from(terminals);
}

function extractReachableVariables(grammar) {
    const rules = grammar.rules;
    const startVariable = grammar.start;
    const reachable = new Set();
    const toVisit = [startVariable];

    while (toVisit.length > 0) {
        const current = toVisit.pop();
        if (!reachable.has(current)) {
            reachable.add(current);
            if (rules[current]) {
                rules[current].forEach(production => {
                    production.split('').forEach(symbol => {
                        if (/[A-Z]/.test(symbol) && !reachable.has(symbol)) {
                            toVisit.push(symbol);
                        }
                    });
                });
            }
        }
    }

    return reachable;
}


module.exports = {extractTerminals, extractVariables, extractReachableVariables};