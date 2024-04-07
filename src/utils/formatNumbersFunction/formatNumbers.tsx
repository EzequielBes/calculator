export const FormatedNumber = (number: number) => {
    const fixedNumber = number.toFixed(2);
    const parts = fixedNumber.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
  
    // Adiciona um ponto a cada três dígitos da parte inteira para números maiores que 999
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Retorna o número formatado com vírgula como separador decimal
    return `${integerPart},${decimalPart}`;
  }