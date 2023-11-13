// estilos botoes categorias

document.addEventListener('DOMContentLoaded', function() {
    const botoesCategoria = document.querySelectorAll('.categoria-bttn');

    function selecionarCategoria(event) {
        botoesCategoria.forEach(function(botao) {
            botao.classList.remove('selecionada');
        });
        this.classList.add('selecionada');
        event.preventDefault();
    }

    botoesCategoria.forEach(function(botao) {
        botao.addEventListener('click', selecionarCategoria)
    });
});

// tempo botoes temporizador pomodoro
let timer; 

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    document.getElementById('iniciar-bttn').innerHTML = '<i class="fas fa-play"></i>';
}

document.getElementById('pomodoro').addEventListener('click', function() {
    document.getElementById('timer-display').textContent = '25:00';
    resetTimer();
});

document.getElementById('short-bttn').addEventListener('click', function() {
    document.getElementById('timer-display').textContent = '05:00';
    resetTimer();
});

document.getElementById('long-bttn').addEventListener('click', function() {
    document.getElementById('timer-display').textContent = '15:00';
    resetTimer();
});

// alterando os icones  e funçao do botao pause/start

let isTimerRunning = false;
let pauseTimer;

document.getElementById('iniciar-bttn').addEventListener('click', function() {
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
        this.innerHTML = '<i class="fas fa-play"></i>';
        pauseTimer = document.getElementById('timer-display').textContent;
    } else {
        if (pauseTimer) {
            document.getElementById('timer-display').textContent = pauseTimer;
        }
        startTimer();
        isTimerRunning = true;
        this.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

// iniciando display temporizador

function startTimer() {
    timer = setInterval(function() {
        var timeParts = document.getElementById('timer-display').textContent.split(':');
        var minutes = parseInt(timeParts[0], 10);
        var seconds = parseInt(timeParts[1], 10);

        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            document.getElementById('alarme-som').play();
        } else {
            if (seconds > 0) {
                seconds--;
            } else {
                minutes--;
                seconds = 59;
            }

            var displayTime = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
            document.getElementById('timer-display').textContent = displayTime;            
        }
    }, 1000);

// parar o som do alarme 

    document.addEventListener('click', function() {
        var somAlarme = document.getElementById('alarme-som');
        if (!somAlarme.paused) {
            somAlarme.pause();
            somAlarme.currentTime = 0;
        }
    });
}

// botao proximo pomodoro
const pomodoroNumber = 0
const shortBreakNumber = 1
const longBreakNumber = 2;
let currentStep = pomodoroNumber;
const steps = [pomodoroNumber, shortBreakNumber, pomodoroNumber, shortBreakNumber, pomodoroNumber, shortBreakNumber, pomodoroNumber, longBreakNumber]

document.getElementById('proximo-bttn').addEventListener('click', function() {
    const botoesCategoria = document.querySelectorAll('.categoria-bttn');
    currentStep = currentStep + 1
   
    
    if(currentStep === steps.length) {
        currentStep = 0;
    }
    const buttonNumber = steps[currentStep];

    resetTimer(); //reset temporizador ao avançar
  
    botoesCategoria[buttonNumber].click();
   
}); 



// input output lista tarefas

function adicionarTarefa() {
    var inputTarefa = document.getElementById('input-tarefa');
    var textoTarefa = inputTarefa.value;

    if (textoTarefa.trim() !== '') {
        var lista = document.getElementById('lista');
        var novaTarefa = document.createElement('li');

        novaTarefa.innerHTML = `
            <input type="text" value="${textoTarefa}" disabled>
            <input type="checkbox" onclick="marcarCheckbox(this)">
        `;

        lista.appendChild(novaTarefa);

        inputTarefa.value = ''; // limpa o input após adicionar tarfa
    }
}

function marcarCheckbox(checkbox) {
    checkbox.disabled = true;
}