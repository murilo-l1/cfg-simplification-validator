
const {extractTerminals} = require('./extractors');

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

function displayProductions(grammarProductions) {
    let output = '';

    for (const [key, productions] of Object.entries(grammarProductions)) {
        const formattedProductions = productions.join(' | ');
        output += `  ${key} → ${formattedProductions},\n`;
    }

    output = output.slice(0, -2); // Remove the last comma and newline
    return output;
}

const generateStepResult = (obj) => {
    const length = Object.keys(obj).length;

    if(length === 1) {
        console.log("A seguinte produção deve ser removida: ");
        console.log(displayProductions(obj));
    }
    else if(length > 1) {
        console.log("As seguintes produções devem ser removidas: ");
        console.log(displayProductions(obj));
    }
    else{
        console.log("Etapa não aplicável!");
    }
}

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

module.exports = {displayGrammar, generateStepResult };