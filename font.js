
const Display = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
alert(!Display);
window.onload = function(){
const dialogo = document.getElementById("alerta");
const version = fetch("/README.md");
dialogo.querySelector("div").innerText= version;
	//if(){
//document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
//
//	}


};

function fechar(){
document.getElementById("alerta").close();
};
