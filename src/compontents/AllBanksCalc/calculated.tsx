import { useInbursaContextHook } from "@/Context/InbursaContext"
import { CalculadoraGeral } from "@/MathCalculator/GlobalCalculato"
import { saldoReal } from "@/types/SaldoReal/saldoReal"

export const CalculadoraInbursa = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) => {


    const taxas = [ 1.45, 1.54, 1.58 , 1.68 ,1.78]
    const InbursaCalc = new CalculadoraGeral(taxas)
    const TaxaCalc = InbursaCalc.calcularTaxa(
      parcelaAtual,
      parcelaRestante,
      -SaldoDevedor,
      1e-6
    )
    
    const pmt = InbursaCalc.calcularPMT(
        SaldoDevedor,
        parcelaRestante
    )
    
    const objInbursaPmt = {
      nameBank: 'Inbursa',
      taxas,
      pmt,
      parcelaAtual,
      parcelaRestante,
      SaldoDevedor
    };
    return objInbursaPmt



}


export const CalculadoraPagBank = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) =>{

  const taxas = [1.72, 1.70, 1.66, 1.60, 1.56]
        const pagbankCalc = new CalculadoraGeral(taxas)
        const taxaPagbank = pagbankCalc.calcularTaxa(
          parcelaAtual,
          parcelaRestante,
          -SaldoDevedor,
          1e-6
        );
        const pmt = pagbankCalc.calcularPMT(SaldoDevedor, parcelaRestante)
        

        const objPagBank = {
          nameBank: 'Pagbank',
          taxas,
          pmt,
          parcelaAtual,
          parcelaRestante,
          SaldoDevedor
        };

        return objPagBank
        
}

export const CalculadoraC6 = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) => {
        const taxas = [1.55, 1.60, 1.65, 1.70, 1.75]

        const c6calc = new CalculadoraGeral(taxas)
        const taxaCalc = c6calc.calcularTaxa( parcelaAtual,
          parcelaRestante,
          -SaldoDevedor,
          1e-6)
        const pmt = c6calc.calcularPMT(SaldoDevedor, parcelaRestante)
        const objc6Bank = {
          nameBank: 'C6',
          taxas,
          pmt,
          parcelaAtual,
          parcelaRestante,
          SaldoDevedor
        };
      
        return objc6Bank
}