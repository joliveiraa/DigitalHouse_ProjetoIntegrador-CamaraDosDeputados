function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var busca = getParameterByName("id");

const dataInicio = getParameterByName("inicio_mandato");
const nomeDeputado = getParameterByName("nome");
const UF = getParameterByName("uf");
const sexo = getParameterByName("sexo");

const qtdaPerfisPorPagina = 70;

const urlConstante = `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${nomeDeputado}&
siglaUf=${UF}&siglaSexo=${sexo}&itens=300&dataInicio=${dataInicio}&ordem=ASC&ordenarPor=siglaUF`;

function pegarDadosApi(url) {
  let totalDeputados = qtdaPerfisPorPagina;
  fetch(url).then((response) => {
    let resultados = response.text();

    resultados.then(function (res) {
      let parse = JSON.parse(res);
      let dados = parse.dados;

      for (let i = 0; i < totalDeputados; i++) {
        let loopDeputados = dados[i];

        let id = loopDeputados.id;
        let idLegislatura = loopDeputados.idLegislatura;
        let nome = loopDeputados.nome;
        let siglaPartido = loopDeputados.siglaPartido;
        let siglaUf = loopDeputados.siglaUf;
        let uri = loopDeputados.uri;
        let uriPartido = loopDeputados.uriPartido;
        let urlFoto = loopDeputados.urlFoto;

        let bloco = blocoDeputado(
          id,
          nome,
          urlFoto,
          uri,
          siglaPartido,
          siglaUf
        );
        //console.log(bloco);

        document.getElementById("demo").innerHTML += bloco;
        estaSeguindo(id)
      }

    });
  });
}

pegarDadosApi(urlConstante);

function estaSeguindo(id){
  if(localStorage['acompanharDeputado'].includes(id)){
      document.getElementById("acompanharBtn"+id).innerHTML="Parar de Acompanhar";
    }
  
  }

function acompanharPerfil(id) {

  if (localStorage) {
    var dados;
    if (!localStorage['acompanharDeputado']) dados = [];
    else dados = JSON.parse(localStorage['acompanharDeputado']);
    if (!(dados instanceof Array)) dados = [];
    if (!dados.includes(id)){
      dados.push(id);
      alert('Você agora acompanha esse Perfil!');
  
      localStorage.setItem('acompanharDeputado', JSON.stringify(dados));
      document.getElementById("acompanharBtn"+id).innerHTML="Parar de Acompanhar";

    }else{
      pararDeacompanharPerfil(id)
      document.getElementById("acompanharBtn"+id).innerHTML="Acompanhar Mandato";
      alert('Você não acompanha mais esse Perfil!');
    }

  }
}

function pararDeacompanharPerfil(id) {
  //pego todos os itens   
  let listaDeputado =  JSON.parse(localStorage.getItem("acompanharDeputado"));
  //quem vai sai
  let removerDeputado = id;     

  for(let i = 0; i < listaDeputado.length;i++){
      if(listaDeputado[i] == removerDeputado){        
          let splice = listaDeputado.splice(i,1);  
      }
  }
  localStorage.setItem('acompanharDeputado', JSON.stringify(listaDeputado));
}

function blocoDeputado(id, nome, urlFoto, uri, siglaPartido, siglaUf) {
  let linkDeputado = "deputado.html?id=" + id;

  let perfil = `
    <div class="col-md-3">
    <div class="panel perfil-deputado box-shadow">
        <div class="row">
            <div class="col-md-5">
                <figure>
                    <img class="img-responsive img-thumbnail" src="${urlFoto}" alt="${nome}">
                </figure>
            </div>
            <div class="col-md-7">
                <div class="panel">
  
                   <div class="panel-body">
                     <p>${nome}</p>
                     <p>${siglaPartido} - ${siglaUf}</p>
                   </div>
  
                </div>
            </div>
            <div class="col-md-12">
                <div class="btn-group">
                    <a class="btn btn-primary btn-sm" href="deputado.html?id=${id}">Acessar Perfil</a>
                     <button id="acompanharBtn${id}" class="btn btn-warning btn-sm" onclick="acompanharPerfil(${id})">Acompanhar Mandato</button>
                  </div>
            </div>
        </div>
    </div>
  </div>`;

  return perfil;
}
