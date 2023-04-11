//Primeira parte criada em razao da logica do timer e play e pause
const usuario = document.getElementById('Usuario');
const atividade = document.getElementById('Atividade');
const tipoatividade = document.getElementById('TipoAtividade');
const timer = document.getElementById('Timer');
const btnPlayPause = document.getElementById('btnStartPause');
const btnStop = document.getElementById('btnStop');
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
  usuario.value = "";
  atividade.value = "";
  tipoatividade.value = "";
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
      let timerArrayAntigo = cell4.innerHTML.split(':');
      let timerArrayNovo = valorTimer.split(':');
      let horasVelho = parseInt(timerArrayAntigo[0]);
      let minutosVelho = parseInt(timerArrayAntigo[1]);
      let segundosVelho = parseInt(timerAntigo[2]);
      let horasNovo = parseInt(timerArrayNovo[0]);
      let minutosNovo = parseInt(timerArrayNovo[1]);
      let segundosNovo = parseInt(timerArrayNovo[2]);

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

  let btnDelete = document.createElement('img');
  btnDelete.classList.add('btnDeletar');
  btnDelete.src = "../style/imgs/lixeira.png";

  btnDelete.addEventListener('click', function()
  {
    deletarColuna(row);
  });

  let btnEditar = document.createElement('img');
  btnEditar.classList.add('btnEditar');
  btnEditar.src = "../style/imgs/editar.png"

  btnEditar.addEventListener('click', function()
  {
    editarColuna(row);
  });

  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  cell5.appendChild(btnDelete);
  cell6.appendChild(btnEditar);

  function deletarColuna(row)
  {
    row.remove();
  }

  function editarColuna(row)
  {
    let inputUsuario = document.getElementById('Usuario');
    let inputAtividade = document.getElementById('Atividade');
    let inputTipoAtividade = document.getElementById('TipoAtividade');


    inputUsuario.value = row.cells[0].innerHTML;
    inputAtividade.value = row.cells[1].innerHTML;
    inputTipoAtividade.value = row.cells[2].innerHTML;

    inputUsuario.addEventListener('input' , function()
    {
      row.cells[0].innerHTML = inputUsuario.value;
    });

    inputAtividade.addEventListener('input' , function()
    {
      row.cells[1].innerHTML = inputAtividade.value;
    });

    inputTipoAtividade.addEventListener('input' , function()
    {
      row.cells[2].innerHTML = inputTipoAtividade.value;
    });
  }

};

