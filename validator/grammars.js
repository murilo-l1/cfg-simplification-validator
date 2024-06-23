const CFG = require('context-free-js');

// usa todas as etapas
const rules1 = {
    'S': ['AB', 'BC', 'A'],
    'A': ['aA', 'a', 'ε'],
    'B': ['bB', 'b'],
    'C': ['cC', 'B', 'c', 'ε'],
    'D': ['dD', 'd']
}
const grammar1 = new CFG.Grammar('S', rules1);

const rules2 = {
    'S': ['X','x'],
    'X': ['y', 'xx', 'xSx', 'S'],
    'Y': ['yYy', 'yy'],
};
const grammar2 = new CFG.Grammar('S', rules2);


// não contém a etapa 2
const rules3 = {
    'Q': ['QR', 'qP', 'ε'],
    'P': ['pQ', 'p'],
    'R': ['rR', 'r'],
    'T': ['tT', 't']
}
const grammar3 = new CFG.Grammar('Q', rules3);

// não contém a etapa 3
const rules4 = {
    'M': ['NO', 'OM', 'n', 'N'],
    'N': ['mN', 'm', 'O'],
    'O': ['oO', 'o', 'ε'],
}
const grammar4 = new CFG.Grammar('M', rules4);

module.exports = {grammar1, grammar2, grammar3, grammar4};