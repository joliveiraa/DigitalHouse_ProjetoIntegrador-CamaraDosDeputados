/*$(function () {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
        function (json) {
            const IP = json.ip;
            IpVisitante = IP;
            estadoVisitante(IP)
        }
    );
});

function estadoVisitante(ip){
    const url = "http://ip-api.com/json/"+ip;
    const pegarDados =  $.getJSON(url,
      function (info) {
          const ufIP = info.region;
          //console.log(ufIP)
          return  document.getElementById('ufIP').innerText = ufIP;
    });
}*/

var btnGoTop = document.getElementById("go-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnGoTop.style.display = "flex";
  } else {
    btnGoTop.style.display = "none";
  }
}

document.getElementById("go-to-top").addEventListener("click", toTop);
function toTop() {
  window.scrollTo(5000, 0);
}
