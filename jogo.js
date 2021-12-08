const source = new Image();
source.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
  sourceX: 0,
  sourceY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,

  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },

  draw() {
    contexto.drawImage(
      source,
      flappyBird.sourceX, flappyBird.sourceY,
      flappyBird.largura, flappyBird.altura,
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  },
};

const floor = {
  sourceX: 0,
  sourceY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,

  draw() {
    contexto.drawImage(
      source,
      floor.sourceX, floor.sourceY,
      floor.largura, floor.altura,
      floor.x, floor.y,
      floor.largura, floor.altura,
    );

    contexto.drawImage(
      source,
      floor.sourceX, floor.sourceY,
      floor.largura, floor.altura,
      floor.x + floor.largura, floor.y,
      floor.largura, floor.altura,
    );
  },
};

const backGround = {
  sourceX: 390,
  sourceY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,

  draw() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      source, 
      backGround.sourceX, backGround.sourceY,
      backGround.largura, backGround.altura,
      backGround.x, backGround.y,
      backGround.largura, backGround.altura,
    );

    contexto.drawImage(
      source, 
      backGround.sourceX, backGround.sourceY,
      backGround.largura, backGround.altura,
      backGround.x + backGround.largura, backGround.y,
      backGround.largura, backGround.altura,
    );
  }
}

function loop() {
  flappyBird.atualiza();

  backGround.draw();
  floor.draw();
  flappyBird.draw();

  requestAnimationFrame(loop);
}

loop();