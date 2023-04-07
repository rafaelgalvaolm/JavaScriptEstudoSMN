//Segunda parte dedicada a nserir os dados corretos dentro do 3 card

function addColuna()
{

  const usuario = document.getElementById("Usuario").value;
  const atividade = document.getElementById("Atividade").value;
  const tipoAtividade = document.getElementById("TipoAtividade").value;
  const tempo = document.getElementById("timer")[0].innerHTML;

  var table = document.getElementById("tabela")[0];
  var row = table.insertRow(-1);

  var usuarioCell = row.insertCell(0);
  usuarioCell.innerHTML = usuario;
  var atividadeCell = row.insertCell(1);
  atividadeCell.innerHTML = atividade;
  var tipoAtividadeCell = row.insertCell(2);
  tipoAtividadeCell.innerHTML = tipoAtividade;
  var tempoCell = row.insertCell(3);
  tempoCell.innerHTML = tempo;

}

btnStop.addEventListener("click", function(a)
{
  a.preventDefault();
  clearInterval(intervalId);
  ispaused = true;
  addColuna();  
  elapsedTime = 0;
  timer.textContent = "00:00:00";
});
