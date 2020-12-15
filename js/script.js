const UfIp = document.getElementById('ufIP').Value;


function fetchPagina(url) {
    fetch(url).then(response => {
        const resultados = response.text();
        resultados.then(function (res) {
          let parse = JSON.parse(res);
          let dados = parse.dados;
            console.log(dados);
        });
    });
}

const dataInicio = '2016-01-01';
const nomeDeputado = '';
const UF = 'MG';
const sexo = '';

const urlPerfil   = `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${nomeDeputado}&
siglaUf=${UF}&siglaSexo=${sexo}&itens=300&dataInicio=${dataInicio}&ordem=ASC&ordenarPor=siglaUF`;
fetchPagina(urlPerfil);


