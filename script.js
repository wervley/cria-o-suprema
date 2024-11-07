let currentQuestion = 1; // Inicializa a primeira pergunta
let acertos = 0; // Inicializa a contagem de acertos

function mostrarMensagem() {
    document.getElementById("mensagem-secreta").style.display = "none";
    document.getElementById("emoticon-chuva").style.display = "block";
    iniciarChuva();

    // Mostra a frase "Espero que goste, amor..." por 3 segundos
    const fraseSurpresa = document.getElementById("frase-surpresa");
    fraseSurpresa.style.display = "block";
    setTimeout(() => {
        fraseSurpresa.style.display = "none";
    }, 3000);
}

function iniciarChuva() {
    const emoticonContainer = document.getElementById("emoticon");
    emoticonContainer.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const emoticon = document.createElement('span');
        emoticon.textContent = Math.random() < 0.5 ? '❤️' : '💀';
        emoticon.style.position = 'absolute';
        emoticon.style.top = Math.random() * window.innerHeight + 'px';
        emoticon.style.left = Math.random() * window.innerWidth + 'px';
        emoticon.style.fontSize = Math.random() * 20 + 10 + 'px';
        emoticonContainer.appendChild(emoticon);

        setTimeout(() => {
            emoticon.style.transition = 'top 6s';
            emoticon.style.top = window.innerHeight + 'px';
        }, 100);
    }

    setTimeout(() => {
        document.getElementById("emoticon-chuva").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        mostrarPergunta(currentQuestion);
    }, 6000);
}

function mostrarPergunta(numero) {
    const perguntas = document.querySelectorAll('.pergunta');
    perguntas.forEach(p => p.style.display = 'none');
    document.getElementById("pergunta" + numero).style.display = "block";
}

function responderQuiz(pergunta, resposta) {
    const resultado = document.getElementById("resultado-quiz");

    if (resposta === 'certa') {
        if (pergunta === 6 && resposta === 'certa') {
            // Redireciona para a nova página com a mensagem especial
            window.location.href = "mensagem-final.html";
            return;
        }
        resultado.textContent = "Você acertou! 🎉❤️";
        resultado.style.color = "green";
        acertos++;
    } else {
        resultado.textContent = "Você errou. ❌💀";
        resultado.style.color = "red";
    }

    if (pergunta < 6) {
        currentQuestion++;
        mostrarPergunta(currentQuestion);
    } else {
        mostrarResultadoFinal();
    }
}

function mostrarResultadoFinal() {
    const resultado = document.getElementById("resultado-quiz");
    resultado.textContent = `Você acertou ${acertos} de 6 perguntas.`;
    document.getElementById("mensagem-final").style.display = "block";
    mostrarMensagemFinal();
}

function mostrarMensagemFinal() {
    const mensagemTexto = document.getElementById("mensagem-texto");
    mensagemTexto.textContent = "Você é muito especial para mim: Te amo, srta. Trindade.";
    mensagemTexto.style.display = "block";

    setTimeout(() => {
        let opacity = 1;
        const fadeOut = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(fadeOut);
                mensagemTexto.style.display = "none";
            } else {
                opacity -= 0.05;
                mensagemTexto.style.opacity = opacity;
            }
        }, 100);
    }, 10000);
}

function recomeçar() {
    currentQuestion = 1;
    acertos = 0;
    document.getElementById("resultado-quiz").textContent = '';
    document.getElementById("mensagem-final").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("mensagem-secreta").style.display = "block";
    mostrarPergunta(currentQuestion);
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarPergunta(1);
});
