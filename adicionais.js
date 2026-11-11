function analisarSaudeFinaceira(dados) {
    const {
        lucroBruto,
        ativos,
        passivos,
        margemVendasSemanal,
        metaSemanalVendas,
        gastosEmpresa
    } = dados;

    const ativoCirculante = ativos * 0.50;      // 50% do ativo total
    const passivoCirculante = passivos * 0.60;   // 60% do passivo total
    const passivoNaoCirculante = passivos * 0.40; // 40% do passivo total
    const estoques = ativoCirculante * 0.30;     // 30% do ativo circulante
    const disponivel = ativoCirculante * 0.20;   // 20% do ativo circulante (caixa/equivalentes)
    const realizavelLongoPrazo = (ativos * 0.50) * 0.5; // Metade do ativo não circulante

    const lucroLiquidoEstimado = lucroBruto - gastosEmpresa;
    const dividendosEstimados = Math.max(0, lucroLiquidoEstimado * 0.25); // Ex: 25% do lucro líquido para dividendos

    // --- CÁLCULOS DOS INDICADORES ---

    const isf = passivos > 0 ? ativos / passivos : 0;
    const icdlp = passivoNaoCirculante > 0 ? lucroBruto / passivoNaoCirculante : 0;
    const icdiv = dividendosEstimados > 0 ? lucroLiquidoEstimado / dividendosEstimados : (lucroLiquidoEstimado > 0 ? 999 : 0);
    const icd = passivos > 0 ? lucroBruto / passivos : 0;
    const ilm = passivoCirculante > 0 ? disponivel / passivoCirculante : 0;
    const ils = passivoCirculante > 0 ? (ativoCirculante - estoques) / passivoCirculante : 0;
    const ilc = passivoCirculante > 0 ? ativoCirculante / passivoCirculante : 0;
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

function enviar_fr() {
    const EmpresaExemplo = {
        lucroBruto: Number(document.getElementById("lucroBruto").value) || 0,
        ativos: Number(document.getElementById("ativos").value) || 0,
        passivos: Number(document.getElementById("passivos").value) || 0,
        margemVendasSemanal: (Number(document.getElementById("margemVendasSemanal").value) || 0) / 100,
        metaSemanalVendas: Number(document.getElementById("metaSemnalDeVendas").value) || 0,
        gastosEmpresa: Number(document.getElementById("gastoEmpresa").value) || 0
    };

    const analise = analisarSaudeFinaceira(EmpresaExemplo);
    const nomeEmpresa = document.getElementById("nomeEmpresa").textContent;
    const relatorio = document.getElementById("relatorioInfo").textContent;

    // Exibe o resultado de forma legível
    let mensagem = "=== RESULTADO DA ANÁLISE === <table><th> indicador</th><th>estado</th><th>status</th>";
    for (let [indicador, dados] of Object.entries(analise)) {
        mensagem += `<tr><td>${indicador}</td><td>${dados.valor}</td><td> ${dados.status}</td></tr>`;
    }
    document.getElementById("final").innerHTML = mensagem;
    
    mensagem += `</table>`
	
    document.getElementById("final").innerHTML = `<p> Relatorio ${nomeEmpresa} data ${dataDia}</p><pre> ${relatorio}</pre>`;
}

function reset() {
const input = confirm("ao confirar apagara todos os dados enviados");
    if(input){
    document.getElementById("ativos").value = "";
    document.getElementById("passivos").value = "";
    document.getElementById("lucroBruto").value = "";
    document.getElementById("metaSemnalDeVendas").value = "";
    document.getElementById("margemVendasSemanal").value = "";
    document.getElementById("gastoEmpresa").value = "";
    document.getElementById("relatorioInfo").value = "dados do relatorio";}
}

