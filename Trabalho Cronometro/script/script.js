//Primeira parte criada em razao da logica do timer e play e pause
const usuario = document.getElementById('Usuario');
const atividade = document.getElementById('Atividade');
const tipoatividade = document.getElementById('TipoAtividade');
const timer = document.getElementById('Timer');
const btnPlayPause = document.getElementById('btnStartPause');
const btnStop = document.getElementById('btnStop');
const btnEditar = document.getElementById('btnEditar');
const btnDeletar = document.getElementById('btnDeletar');
let passarTempo;

function incrementarTempo()
{
  let timerString = timer.innerHTML;
  let timerArray = timerString.split(':');
  let horas = parseInt(timerArray[0]);
  let minutos = parseInt(timerArray[1]);
  let segundos = parseInt(timerArray[2]);

  segundos++;

  if(segundos == 60)
  {
    segundos = 0;
    minutos++;
  }

  if(minutos == 60)
  {
    minutos = 0;
    horas++;
  }

  timer.innerHTML = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`

}

btnPlayPause.addEventListener('click', function(playPause)
{
  playPause.preventDefault();

  if(passarTempo)
  {
    clearInterval(passarTempo);
    passarTempo = null;
  } else {
    passarTempo = setInterval(incrementarTempo, 1000);
  }
});

// Segunda parte criada em razao da necessidade de adicionar uma coluna na tabela
btnStop.addEventListener('click', function(stop)
{
  stop.preventDefault();
  clearInterval(passarTempo);
  passarTempo = null;
  addColuna();
  timer.innerHTML = "00:00:00";
});


function addColuna()
{
  let valorUsuario = usuario.value;
  let valorAtividade = atividade.value;
  let valorTipoAtividade = tipoatividade.value;
  let valorTimer = timer.innerHTML;
  let corpoTabela = document.getElementById('TabelaBody');
  let row = corpoTabela.insertRow(0);

  for(let i = 0; i < corpoTabela.rows.length; i++)
  {
    let row = corpoTabela.rows[i];
    let cell1 = row.cells[0];
    let cell2 = row.cells[1];
    let cell3 = row.cells[2];
    let cell4 = row.cells[3];

    if
    (
      cell1 && cell1.innerHTML == valorUsuario &&
      cell2 && cell2.innerHTML == valorAtividade &&
      cell3 && cell3.innerHTML == valorTipoAtividade
    )
    {
      let timerArray = cell4.innerHTML.split(':');
      let timerArray2 = valorTimer.split(':');
      let horasVelho = parseInt(timerArray[0]);
      let minutosVelho = parseInt(timerArray[1]);
      let segundosVelho = parseInt(timerArray[2]);
      let horasNovo = parseInt(timerArray2[0]);
      let minutosNovo = parseInt(timerArray2[1]);
      let segundosNovo = parseInt(timerArray2[2]);

      segundosVelho += segundosNovo;
      minutosVelho += minutosNovo;
      horasVelho += horasNovo;

      if(segundosVelho >= 60)
      {
        segundosVelho -= 60;
        minutosVelho++;
      }

      if(minutosVelho >= 60)
      {
        minutosVelho -= 60;
        horasVelho++;
      }

      cell4.innerHTML = `${horasVelho.toString().padStart(2, '0')}:${minutosVelho.toString().padStart(2, '0')}:${segundosVelho.toString().padStart(2, '0')}`;
      
      return;
    }
  }
  row = corpoTabela.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = valorUsuario;
  cell2.innerHTML = valorAtividade;
  cell3.innerHTML = valorTipoAtividade;
  cell4.innerHTML = valorTimer;
};

//terceira parte criada em razao da necessidade de se poder editar as tabelas ja criadas ou deleta-las
