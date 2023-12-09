const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const perguntas = [
  {
    pergunta: 'Qual é a capital do Brasil?',
    alternativas: ['A) Rio de Janeiro', 'B) Brasília', 'C) São Paulo', 'D) Salvador'],
    respostaCorreta: 'B',
    premiacao: {
      acertou: 200,
      errou: -50,
      parou: 25
    }
  },
  {
    pergunta: 'Em que ano aconteceu o descobrimento do Brasil?',
    alternativas: ['A) 1400', 'B) 1700', 'C) 1500', 'D) 1900'],
    respostaCorreta: 'C',
    premiacao: {
      acertou: 200,
      errou: -100,
      parou: 50
    }
  },
  {
    pergunta: 'Em que ano Ayrton Senna faleceu?',
    alternativas: ['A) Em 1800', 'B) Em 1886', 'C) Em 1999', 'D) Em 1994'],
    respostaCorreta: 'D',
    premiacao: {
      acertou: 200,
      errou: -150,
      parou: 100
    }
  },
  {
    pergunta: 'Qual o nome científico da Banana Nanica?',
    alternativas: ['A) Aipim', 'B) Musa Cavendish', 'C) Musa Suculenta', 'D) Banana Nanica'],
    respostaCorreta: 'B',
    premiacao: {
      acertou: 200,
      errou: -200,
      parou: 150
    }
  },
  {
    pergunta: 'Quem é o fundador da empresa Apple?',
    alternativas: ['A) Jord Cluney', 'B) Steve Jobs', 'C) Mark Zuckerberg', 'D) Tim Berners-Lee'],
    respostaCorreta: 'B',
    premiacao: {
      acertou: 200,
      errou: -250,
      parou: 200
    }
  }
];

let dinheiro = 0; // Pontuação em mil reais
let indicePergunta = 0;
let nomeJogador = '';

function informarDadosRodada() {
  console.log('\n******************************Nome do jogador******************************');
  console.log(`Bem-vindo(a), ${nomeJogador}!\n`);
  console.log(`**Número/Nome da rodada: Rodada ${indicePergunta + 1}`);
  console.log('******************Premiação******************');
  console.log(`- Se acertar: R$${perguntas[indicePergunta].premiacao.acertou} mil`);
  console.log(`- Se errar: R$${Math.abs(perguntas[indicePergunta].premiacao.errou)} mil`);
  console.log(`- Se parar: R$${perguntas[indicePergunta].premiacao.parou} mil`);
}

function jogarPergunta() {
  const pergunta = perguntas[indicePergunta];

  rl.question(`${pergunta.pergunta}\n${pergunta.alternativas.join('\n')}\nSua resposta (digite a letra correspondente ou "P" para parar): `, (resposta) => {
    informarDadosRodada();

    if (resposta.toUpperCase() === pergunta.respostaCorreta) {
      dinheiro += pergunta.premiacao.acertou;
      console.log(`******************Resultado******************\nAcertou a pergunta! Você ganhou R$${pergunta.premiacao.acertou} mil. Pontuação atual: R$${dinheiro} mil.`);
    } else if (resposta.toUpperCase() === 'P') {
      dinheiro += pergunta.premiacao.parou;
      console.log(`******************Resultado******************\nVocê decidiu parar. Ganhou R$${pergunta.premiacao.parou} mil. Pontuação atual: R$${dinheiro} mil.`);
      informarDadosFinais();
      oferecerOpcaoReiniciarJogo();
      return;
    } else {
      dinheiro += pergunta.premiacao.errou;
      console.log(`******************Resultado******************\nErrou a pergunta! Você perdeu R$${Math.abs(pergunta.premiacao.errou)} mil. Pontuação atual: R$${dinheiro} mil.`);
    }

    indicePergunta++;

    if (indicePergunta < perguntas.length) {
      jogarPergunta();
    } else {
      informarDadosFinais();
      oferecerOpcaoReiniciarJogo();
    }
  });
}

function informarDadosFinais() {
  console.log(`\n******************** Informações Finais ********************`);
  console.log(`- Nome do jogador: ${nomeJogador}`);
  console.log(`- Rodada em que parou: Rodada ${indicePergunta + 1}`);
  console.log(`- Resposta correta da última pergunta respondida: ${perguntas[indicePergunta - 1].respostaCorreta}`);
  console.log(`- Premiação Final: R$${dinheiro} mil`);
}

function oferecerOpcaoReiniciarJogo() {
  rl.question('\nDeseja jogar novamente? (Digite "sim" ou "nao"): ', (resposta) => {
    if (resposta.toLowerCase() === 'sim') {
      reiniciarJogo();
    } else {
      rl.close();
    }
  });
}

function reiniciarJogo() {
  indicePergunta = 0;
  dinheiro = 0;
  informarDadosRodada();
  jogarPergunta();
}

rl.question('Digite seu nome: ', (nome) => {
  nomeJogador = nome;
  informarDadosRodada();
  jogarPergunta();
});

rl.on('close', () => {
  console.log(`\nFim do jogo! Pontuação final: R$${dinheiro} mil.`);
});
