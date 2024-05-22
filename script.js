let record = document.getElementById('recorde');

if (!localStorage.record) {
    localStorage.record = 0

} else {
    record.innerText = localStorage.record
}

const colors = ['vermelho', 'verde', 'azul', 'branco'];
let seqJogo = [];
let seqJogador = [];
let nivel = 0;
let pontuacaoAtual = document.getElementById('pontos');
let audios = {
    vermelho: document.querySelector('.vermelho-audio'),
    verde: document.querySelector('.verde-audio'),
    azul: document.querySelector('.azul-audio'),
    branco: document.querySelector('.branco-audio')
}
let yupAudio = document.querySelector('#lvl-up')
const botaoComecar = document.getElementById('start-button');
const botoesCores = document.querySelectorAll('.btn-grid button');

function playSound(color) {
    console.log(audios)
    if (!audios[color].paused) {
        audios[color].currentTime = 0;
    }
    audios[color].play();
}

function piscaCor(color) {
    const button = document.getElementById(color);
    button.classList.add('active')
    playSound(color);
    setTimeout(() => {
        button.classList.remove('active')
    }, 500);
}

function nextSequence() {
    const corAleatoria = colors[Math.floor(Math.random() * colors.length)];
    seqJogo.push(corAleatoria);
    pontuacaoAtual.innerText = nivel
    if (localStorage.record < nivel) {
        localStorage.record = nivel;
        record.innerText = nivel

    }
    nivel++;
    seqJogador = [];

    seqJogo.forEach((color, index) => {
        setTimeout(() => {
            piscaCor(color);
        }, (index + 1) * 800); // Aqui ele demora baseado no tamanho da lista
    });

}

function validaSeq() {
    const faseAtual = seqJogador.length - 1;
    if (seqJogador[faseAtual] !== seqJogo[faseAtual]) {
        localStorage.record = nivel - 1 > localStorage.record ? nivel - 1 : localStorage.record;
        alert('Você perdeu!');
        resetGame();
        return;
    }

    if (seqJogador.length === seqJogo.length) {
        yupAudio.play();
        setTimeout(nextSequence, 1000);
    }
}

function handleColorClick(event) {
    if (!seqJogo.length) {
        return alert('Por favor, comece o jogo')
    }
    const color = event.target.id;
    seqJogador.push(color);
    piscaCor(color);
    validaSeq();
}

function resetGame() {
    seqJogo = [];
    seqJogador = [];
    pontuacaoAtual.innerText = 0;
    nivel = 0;
    botaoComecar.disabled = false;
}

botoesCores.forEach(button => {
    button.addEventListener('click', handleColorClick);
});

botaoComecar.addEventListener('click', () => {
    botaoComecar.disabled = true;
    nextSequence();
});
