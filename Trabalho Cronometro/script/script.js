//Primeira parte dedicada ao cronometro

const timer = document.querySelector(".timer");
const btnStartPause = document.getElementById("btnStartPause");
const btnStop = document.getElementById("btnStop");

let intervalId;
let startTime;
let elapsedTime = 0;
let isPaused = true;

function updateTimer() 
{
  const now = Date.now();
  elapsedTime = now - startTime;
  hora(elapsedTime);
}

function hora(elapsedTime)
{
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60).toString().padStart(2, "0");
  const seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, "0");
  timer.textContent = `${hours}:${minutes}:${seconds}`;
}

btnStartPause.addEventListener("click", function(e) {
  e.preventDefault();
  if (isPaused) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimer, 1000);
    isPaused = false;
  } else {
    clearInterval(intervalId);
    isPaused = true;
  }
});

//Segunda parte dedicada a inserir os dados corretos dentro do card 3

btnStop.addEventListener("click", function(a)
{
  a.preventDefault();
  clearInterval(intervalId);
  isPaused = true;
  hora(elapsedTime);
  addColuna();
  timer.textContent = "00:00:00";
});

function addColuna()
{
  const usuario = document.getElementById("Usuario").value;
  const atividade = document.getElementById("Atividade").value;
  const tipoAtividade = document.getElementById("TipoAtividade").value;
  const tempo = timer.textContent;
  const elapsedTime = parseInt(tempo)

  var table = document.getElementById("TabelaBody");

  for(var i = 0; i < table.rows.length; i++)
  {
    var row = table.rows[i];
    if(row.id == usuario + '_' + atividade + '_' + tipoAtividade)
    {
      var tempoCell = row.cells[3];
      var tempoAntigo = tempoCell.innerText;
      var tempoNovo = Date.now() + parseInt(tempoAntigo) + parseInt(elapsedTime);
      tempoCell.innerHTML = hora(tempoNovo);
      return;
    }
  }

  var row = table.insertRow(-1);
  row.id = usuario + '_' + atividade + '_' + tipoAtividade;
  var usuarioCell = row.insertCell(0);
  usuarioCell.innerHTML = usuario;
  var atividadeCell = row.insertCell(1);
  atividadeCell.innerHTML = atividade;
  var tipoAtividadeCell = row.insertCell(2);
  tipoAtividadeCell.innerHTML = tipoAtividade;
  var tempoCell = row.insertCell(3);
  tempoCell.innerHTML = hora(elapsedTime);
}


