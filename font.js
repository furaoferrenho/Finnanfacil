
const Display = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const Estilo = document.querySelector('html').style;
window.onload = function(){
	if( !Display ){
		// provavelmente a uma maneira mais bonita de se fazer isto
 	Estilo.setProperty("--escala", "1");
		
	Estilo.setProperty("--tamanho-padrao", "5tp");
	Estilo.setProperty("--tamanho-relativo", "2tp");
	
	};

const dialogo = document.getElementById("alerta");
const version = fetch("/README.md");
dialogo.querySelector("div").innerText= version;
};

function fechar(){
document.getElementById("alerta").close();
};
