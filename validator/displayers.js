
const {extractTerminals} = require('./extractors');

const createTerminalsOutPut = (grammar) => {
    let terminals = extractTerminals(grammar);
    let terminalsOutput = '';

    if(terminals.indexOf('ε') === -1){
        terminalsOutput = '{' + terminals.toString() + '}';
    }
    else{
        terminals = terminals.filter(terminal => terminal !== 'ε');
        terminalsOutput = '{' + terminals.toString() + '}*';
    }

    return terminalsOutput;
}

function displayGrammar(grammar, grammarNum) {

    const terminalsOutput = createTerminalsOutPut(grammar);

    let output = `G${grammarNum} = ({${Object.keys(grammar.rules).join(', ')}}, ${terminalsOutput}, P, ${grammar.start}),\n`;
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

const generateStepResult = (obj) => {
    if(Object.keys(obj).length > 0){
        console.log("A(s) seguinte(s) produções devem ser alteradas: ");
        console.log(displayProductions(obj));
    }
    else{
        console.log("Etapa não aplicável !");
    }
}

module.exports = {displayGrammar, displayProductions, generateStepResult };