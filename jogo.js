const readline = require('readline');

const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

const perguntas = [
 {
    pergunta: 'Qual é a capital do Brasil?',
    alternativas: ['Rio de Janeiro', 'Brasília', 'São Paulo', 'Salvador'],
    respostaCorreta: 'Brasília',
    premiacao: {
      acertou: 100,
      errou: -50,
      parou: 25
    }
 },
 {
    pergunta: 'Qual é o maior planeta do nosso sistema solar?',
    alternativas: ['Terra', 'Marte', 'Netuno', 'Júpiter'],
    respostaCorreta: 'Júpiter',
    premiacao: {
      acertou: 200,
      errou: -100,
      parou: 50
    }
 },
 {
    pergunta: 'Em que ano Airton Senna faleceu ?',
    alternativas: ['Em 1800', 'Em 1886', 'Em 1999', 'Em 1994'],
    respostaCorreta: 'Em 1994',
    premiacao: {
      acertou: 300,
      errou: -150,
      parou: 100
    }
 },
 {
    pergunta: 'Qual o nome científico da Banana Nanica?',
    alternativas: ['Aipim','Musa Cavendish', 'Musa Suculenta', 'Banana Nanica'],
    respostaCorreta: 'Musa Cavendish',
    premiacao: {
      acertou: 400,
      errou: -200,
      parou: 150
    }
 },
 {
    pergunta: 'Quem é o fundador da empresa Aplle?',
    alternativas: ['Jord Cluney', 'Steve Jobs', 'Mark Zuckerberg', 'Tim Berners_Lee'],
    respostaCorreta: 'Steve Jobs',
    premiacao: {
      acertou: 500,
      errou: -250,
      parou: 200
    }
 }
 // Adicione mais perguntas conforme necessário
];

let pontos = 0;
let indicePergunta = 0;

function jogarPergunta() {
 const pergunta = perguntas[indicePergunta];

 rl.question(pergunta.pergunta + ' ', (resposta) => {
    if (resposta.toLowerCase() === pergunta.respostaCorreta.toLowerCase()) {
      pontos += pergunta.premiacao.acertou;
      console.log('Resposta correta! Você ganhou ' + pergunta.premiacao.acertou + ' pontos. Pontuação atual: ' + pontos + ' pontos.');
    } else {
      pontos += pergunta.premiacao.errou;
      console.log('Resposta incorreta! Você perdeu ' + pergunta.premiacao.errou + ' pontos. Pontuação atual: ' + pontos + ' pontos.');
    }

    indicePergunta++;

    if (indicePergunta < perguntas.length) {
      jogarPergunta();
    } else {
      rl.close();
    }
 });
}

jogarPergunta();

rl.on('close', () => {
 console.log('Fim do jogo! Pontuação final: ' + pontos + ' pontos.');
});