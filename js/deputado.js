function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var busca = getParameterByName("id");

function pegarDadosDoDeputado(id) {
  fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`)
    .then((response) => {
      let resultados = response.text();

      resultados.then(function (res) {
        let parse = JSON.parse(res);
        let dados = parse.dados;

        //console.log(dados)

        let cpf = dados.cpf;
        document.getElementById("cpf").innerText = cpf;

        let dataNascimento = dados.dataNascimento;
        document.getElementById("dt-nascimento").innerText = dataNascimento;

        let escolaridade = dados.escolaridade;
        document.getElementById("escolaridade").innerText = escolaridade;

        let municipioNascimento = dados.municipioNascimento;
        document.getElementById("m_nascimento").innerText = municipioNascimento;

        let sexo = dados.sexo;
        document.getElementById("sexo").innerText = sexo;

        let ufNascimento = dados.ufNascimento;
        document.getElementById("ufNascimento").innerText = ufNascimento;

        let ultimoStatus = dados.ultimoStatus;

        //console.log(ultimoStatus)

        let email = ultimoStatus.email;
        document.getElementById("email").innerText = email;

        let nome = ultimoStatus.nome;
        document.getElementById("nome_civil").innerText = nome;

        let nomeEleitoral = ultimoStatus.nomeEleitoral;
        document.getElementById("nome_eleitoral").innerText = nomeEleitoral;

        let situacao = ultimoStatus.situacao;
        document.getElementById("situacao").innerText = situacao;

        let urlFoto = ultimoStatus.urlFoto;
        let foto = `<img class="img-responsive img-fotoDeputado" src="${urlFoto}" alt="${nome}" title="${nome}">`;

        document.getElementById("foto").innerHTML = foto;

        /*GABINETE*/

        let gabinete = ultimoStatus.gabinete;

        //console.log(gabinete)

        let nomeGab = gabinete.nome;
        document.getElementById("gab_nome").innerText = nomeGab;

        let predioGab = gabinete.predio;
        document.getElementById("gab_predio").innerText = predioGab;

        let salaGab = gabinete.sala;
        document.getElementById("gab_sala").innerText = salaGab;

        let andarGab = gabinete.andar;
        document.getElementById("gab_andar").innerText = andarGab;

        let telefoneGab = gabinete.telefone;
        document.getElementById("gab_fone").innerText = telefoneGab;

        let emailGab = gabinete.email;
        document.getElementById("gab_email").innerText = emailGab;
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

pegarDadosDoDeputado(busca);

//https://dadosabertos.camara.leg.br/api/v2/deputados/178879/despesas?ordem=ASC&ordenarPor=ano
function despesasDeputado(id) {
  fetch(
    `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=ASC&ordenarPor=ano`
  ).then((response) => {
    let resultados = response.text();

    resultados.then(function (res) {
      let parse = JSON.parse(res);
      let dados = parse.dados;
      //console.log(dados);
      //document.getElementById('despesasDeputado').innerHtml = dados;

      for (let i = 0; i < dados.length; i++) {
        console.log(dados[i]);

        let tipoDespesa = dados[i].tipoDespesa;
        let mes = dados[i].mes;
        let ano = dados[i].ano;
        let fornecedor = dados[i].nomeFornecedor;
        let tipo_doc = dados[i].tipoDocumento;
        let link_doc = dados[i].urlDocumento;
        let valor_doc = dados[i].valorDocumento;
        valor_liquido = dados[i].valorLiquido;

        let template = templateDespesas(
          tipoDespesa,
          mes,
          ano,
          fornecedor,
          tipo_doc,
          link_doc,
          valor_doc,
          valor_liquido
        );
        document.getElementById("despesas").innerHTML += template;
      }
    });
  });
}

despesasDeputado(busca);

function templateDespesas(
  titulo_despesa,
  mes,
  ano,
  fornecedor,
  tipo_doc,
  link_doc,
  valor_doc,
  valor_liquido
) {
  let template = `
    <table class="table table-condensed table-hover table-bordered table-striped box-shadow">
        <tbody>
            <tr>
                <td>tipoDespesa </td>
                <td id="titulo_despesa">${titulo_despesa}</td>
            </tr>
            <tr>
                <td>Data </td>
                <td id="data_despesa"> ${mes}/ ${ano} </td>
            </tr>
            <tr>
                <td>Fornecedor </td>
                <td id="nome_fornecedor">${fornecedor}</td>
            </tr>
            <tr>
                <td>Tipo de Documento </td>
                <td id="tipo_doc">${tipo_doc} </td>
            </tr>
            <tr>
                <td>Link do document </td>
                <td id="link_doc"><a target="_blank" href="${link_doc}">Link</a></td>
            </tr>
            <tr>
                <td>Valor do documento</td>
                <td id="valor_doc">R$ ${valor_doc} </td>
            </tr>
            <tr>
                <td>Valor liquido</td>
                <td id="valor_liquido">R$ ${valor_liquido}</td>
            </tr>
        </tbody>
    </table>`;
  return template;
}

function frentesParlamentares(id) {
  fetch(
    `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/frentes`
  ).then((response) => {
    let resultados = response.text();

    resultados.then(function (res) {
      let parse = JSON.parse(res);
      let dados = parse.dados;
      //console.log(dados);

      for (let i = 2; i<dados.length; i+=4) {
        console.log(dados[i]);

        let nomeFrente = dados[i].titulo;

        let template = templateFrentes(
          nomeFrente
        );
        document.getElementById("frentes").innerHTML += template;
      }
    });
  });
}

frentesParlamentares(busca);

despesasDeputado(busca);

function templateFrentes(
  nomeFrente
) {
  let template = `
    <p>Titulo: <strong id="nomeFrente">${nomeFrente}</strong></p>  
  `
  return template;
}