
window.onload = function(){
const dialogo = document.getElementById("alerta");
const version = fetch("/README.md");
dialogo.querySelector("div").innerText= version;
};

function fechar(){
document.getElementById("alerta").close();
};
