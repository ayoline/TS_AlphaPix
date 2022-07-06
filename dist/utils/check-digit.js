"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account = (data) => {
    const acc_num = data.split('-')[0];
    const digit = data.split('-')[1];
    let weightSum = 0;
    for (let i = 0; i < acc_num.length; i++) {
        weightSum += (acc_num.length + 1 - i) * Number(acc_num[i]);
    }
    const cd = 11 - (weightSum % 11) < 10 ? 11 - (weightSum % 11) : 0;
    if (digit) {
        return String(cd) == digit;
    }
    else {
        return cd;
    }
};
// FIXME unnecessary to have the cpf check-digit function since we can call the account function recursively
const cpf = (data) => {
    let cpf_num = data.split('-')[0].replaceAll('.', '');
    const digit = data.split('-')[1];
    if (cpf_num.split('').every((char) => cpf_num[0] === char)) {
        return false;
    }
    // Verify first digit
    let weightSum = 0;
    for (let i = 0; i < cpf_num.length; i++) {
        weightSum += (cpf_num.length + 1 - i) * Number(cpf_num[i]);
    }
    const cd_1 = 11 - (weightSum % 11) < 10 ? 11 - (weightSum % 11) : 0;
    // Verify second digit
    weightSum = 0;
    cpf_num += String(cd_1);
    for (let i = 0; i < cpf_num.length; i++) {
        weightSum += (cpf_num.length + 1 - i) * Number(cpf_num[i]);
    }
    const cd_2 = 11 - (weightSum % 11) < 10 ? 11 - (weightSum % 11) : 0;
    const cd = String(cd_1) + String(cd_2);
    if (digit) {
        return cd == digit;
    }
    else {
        return cd;
    }
};
// also works as a generator of valid cpf
// console.log('555.414.844-' + cpf('555414844'));
exports.default = { account, cpf };
