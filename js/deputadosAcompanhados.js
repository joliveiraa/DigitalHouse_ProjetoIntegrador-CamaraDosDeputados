let idDeputados = localStorage.getItem('acompanharDeputado');
idDeputados = JSON.parse(idDeputados);
let total = idDeputados.length;
let loopDeputados = '';

//console.log(idDeputados[1])

document.getElementById('seguindo').innerHTML = total;

for (let i = 0; i < total; i++) {
    loopDeputados = idDeputados[i];
    //console.log(loopDeputados)
    pegarDadosDoDeputado(loopDeputados)
}



function pararDeacompanharPerfil(id) {
    //pego todos os itens   
    let listaDeputado =  JSON.parse(localStorage.getItem("acompanharDeputado"));
    //quem vai sai
    let removerDeputado = id;     

    for(let i = 0; i < listaDeputado.length;i++){
        if(listaDeputado[i] == removerDeputado){
            console.log('remover ' +  listaDeputado[i])            
            let splice = listaDeputado.splice(i,1);  
        }
    }

    //console.log(listaDeputado)
    localStorage.setItem('acompanharDeputado', JSON.stringify(listaDeputado));

    document.location.reload(true);
    
}




function pegarDadosDoDeputado(id) {

    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`).then(response => {
        let resultados = response.text();

        resultados.then(function (res) {
            let parse = JSON.parse(res);
            let dados = parse.dados;
            //console.log(dados)

            let ultimoStatus = dados.ultimoStatus;
            let gabinete = ultimoStatus.gabinete;

            //console.log(ultimoStatus)

            let id = dados.id;
            let nome = dados.nomeCivil;
            let urlFoto = 'https://www.camara.leg.br/internet/deputado/bandep/' + dados.id + '.jpg';
            let uri = ultimoStatus.uri;
            let = siglaPartido = ultimoStatus.siglaPartido;
            let = siglaUf = ultimoStatus.siglaUf;;



            let bloco = blocoDeputado(id, nome, urlFoto, uri, siglaPartido, siglaUf);
            //console.log(bloco);

            document.getElementById("demo").innerHTML += bloco;

        });

    })
        .catch(err => {
            console.error(err);
        });
}


function blocoDeputado(id, nome, urlFoto, uri, siglaPartido, siglaUf) {

    let linkDeputado = 'deputado.html?id=' + id;

    
  let perfil = `
  <div class="col-md-4">
  <div class="panel perfil-deputado box-shadow">
      <div class="row">
          <div class="col-md-5">
              <figure class="img-deputado">
                  <img class="img-responsive img-thumbnail" src="${urlFoto}" alt="${nome}">
              </figure>
          </div>
          <div class="col-md-7">
              <div>

                 <div class="panel-body">
                   <p>${nome}</p>
                   <p>${siglaPartido} - ${siglaUf}</p>
                 </div>

              </div>
          </div>
          <div class="col-md-12">
              <div class="btn-group">
              <a class="btn btn-primary btn-xs"  href="${linkDeputado}">Acessar Perfil</a>
              <button class="btn btn-warning btn-xs" onclick="pararDeacompanharPerfil(${id})">Parar de Acompanhar</button>
                </div>
          </div>
      </div>
  </div>
</div>`;

    return perfil;
}