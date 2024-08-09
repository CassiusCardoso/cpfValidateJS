function cpfIsValid(cpf) {
    // Remove todos os caracteres especiais(. e -)
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o cpf tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se os dígitos são iguais, ex: 000.000.000-00
    const firstNumber = cpf[0];
    if(cpf.split('').every(number => number === firstNumber)) return false;
    
    // Valida o primeiro dígito e o segundo dígito verificador. Ex: (000.000.000-digito1digito2)
    const digito1 = firstNumberVerify(cpf);
    const digito2 = secondNumberVerify(cpf);


    return verifyNumbers(cpf, digito1, digito2)
}

// Função para verificar o primeiro dígito verificador
// Lembrando que a lógica para verificar o primeiro dígito é praticamente a mesma para verificar o segundo, a única diferença está no número de index que o segundo dígito possui, que são (11) e não 10
// Isso é representando na lógica do loop for
// soma+= parseInt(cpf.charAt(i)) * (11-1) -> Para o segundo dígito
function firstNumberVerify(cpf) {
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    const resto = 11 - (soma % 11);
    return (resto === 10 || resto === 11) ? 0 : resto;
}

function secondNumberVerify(cpf) {
    let soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    const resto = 11 - (soma % 11);
    return (resto === 10 || resto === 11) ? 0 : resto;
}

// Função para verificar o segundo dígito verificador
function verifyNumbers(cpf, digito1, digito2){
    return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10))
}

console.log(cpfIsValid('00000000000'))
