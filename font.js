
window.onload = function(){
const dialogo = document.getElementById("alerta");
const version = fetch("/README.md");
dialogo.querySelector("div").innerText= version;
	//if(){
//document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
//
//	}
alert(navigator.userAgent);
};

function fechar(){
document.getElementById("alerta").close();
};
