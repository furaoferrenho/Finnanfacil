
function analisarSaudeFinaceira(dados) {
    const {
        lucroBruto,
        ativos,
        passivos,
        margemVendasSemanal,
        metaSemanalVendas,
        gastosEmpresa
    } = dados;

    // 1. Estimativas de Contas Patrimoniais (Proporções padrão ajustáveis)
    const ativoCirculante = ativos * 0.50;      // 50% do ativo total
    const passivoCirculante = passivos * 0.60;   // 60% do passivo total
    const passivoNaoCirculante = passivos * 0.40; // 40% do passivo total
    const estoques = ativoCirculante * 0.30;     // 30% do ativo circulante
    const disponivel = ativoCirculante * 0.20;   // 20% do ativo circulante (caixa/equivalentes)
    const realizavelLongoPrazo = (ativos * 0.50) * 0.5; // Metade do ativo não circulante

    // Resultado líquido estimado para cálculos de cobertura
    const lucroLiquidoEstimado = lucroBruto - gastosEmpresa;
    const dividendosEstimados = Math.max(0, lucroLiquidoEstimado * 0.25); // Ex: 25% do lucro líquido para dividendos

    // --- CÁLCULOS DOS INDICADORES ---

    // 1. Suficiência Total / Índice de Suficiência Financeira (ISF) - Capacidade geral de cobertura patrimonial
    const isf = passivos > 0 ? ativos / passivos : 0;

    // 2. Cobertura de Dívidas de Longo Prazo (ICDLP) = Lucro / Passivo Não Circulante
    const icdlp = passivoNaoCirculante > 0 ? lucroBruto / passivoNaoCirculante : 0;

    // 3. Cobertura de Dividendos (ICDIV) = Lucro Líquido / Dividendos Estimados
    const icdiv = dividendosEstimados > 0 ? lucroLiquidoEstimado / dividendosEstimados : (lucroLiquidoEstimado > 0 ? 999 : 0);

    // 4. Cobertura de Dívidas (ICD) = Lucro Bruto / Passivo Total
const icd = passivos > 0 ? lucroBruto / passivos : 0;

    // 5. Liquidez Imediata (ILM) = Disponível / Passivo Circulante
const ilm = passivoCirculante > 0 ? disponivel / passivoCirculante : 0;

    // 6. Liquidez Seca (ILS) = (Ativo Circulante - Estoques) / Passivo Circulante
    const ils = passivoCirculante > 0 ? (ativoCirculante - estoques) / passivoCirculante : 0;

    // 7. Liquidez Corrente (ILC) = Ativo Circulante / Passivo Circulante
    const ilc = passivoCirculante > 0 ? ativoCirculante / passivoCirculante : 0;

    // 8. Liquidez Geral (ILG) = (Ativo Circulante + Realizável a Longo Prazo) / (Passivo Circulante + Passivo Não Circulante)
    const denominadorLG = passivoCirculante + passivoNaoCirculante;
    const ilg = denominadorLG > 0 ? (ativoCirculante + realizavelLongoPrazo) / denominadorLG : 0;

    // --- FUNÇÃO DE AVALIAÇÃO ---
    function avaliar(valor, bomMin, medianoMin) {
        if (valor >= bomMin) return "BEM";
        if (valor >= medianoMin) return "MEDIANO";
        return "RUIM";
    }

    // --- RESULTADOS E CLASSIFICAÇÕES ---
    return {
        ISF: { valor: isf.toFixed(2), status: avaliar(isf, 1.5, 1.0) },
        ICDLP: { valor: icdlp.toFixed(2), status: avaliar(icdlp, 1.5, 1.0) },
        ICDIV: { valor: icdiv.toFixed(2), status: avaliar(icdiv, 2.0, 1.0) },
        ICD: { valor: icd.toFixed(2), status: avaliar(icd, 1.2, 0.8) },
        ILM: { valor: ilm.toFixed(2), status: avaliar(ilm, 0.5, 0.2) },
        ILS: { valor: ils.toFixed(2), status: avaliar(ils, 1.0, 0.7) },
        ILC: { valor: ilc.toFixed(2), status: avaliar(ilc, 1.5, 1.0) },
        ILG: { valor: ilg.toFixed(2), status: avaliar(ilg, 1.2, 1.0) }
    };
}

function enviar_fr(){
const EmpresaExemplo = {
	lucroBtruto: document.getElementById("lucroBruto");
	ativos: document.getElementById("ativos");
	passivos: document.getElementById("passivos");
	margemVendasSemanal: document.getElementById("margemVendasSemanal") / 100;
	metaSemanalVendas: document.getElementById("metaSemanalVendas");
	gastosEmpresa: document.getElementById("gastoEmpresa");
};

function enviar_fr(){
const analise = analisarSaudeFinaceira(EmpresaExemplo);
alert(analise);
alert("funfa");
};
//table(relatorio);

