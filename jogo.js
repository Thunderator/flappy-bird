const source = new Image();
source.src = './src/sprites.png';

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

const getReadyMsg = {
  sourceX: 134,
  sourceY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  
  draw() {
    contexto.drawImage(
      source,
      getReadyMsg.sourceX, getReadyMsg.sourceY,
      getReadyMsg.largura, getReadyMsg.altura,
      getReadyMsg.x, getReadyMsg.y,
      getReadyMsg.largura, getReadyMsg.altura,
    );
  }
}

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
}

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

let activeScreen = {};
function changeScreen(newScreen) {
  activeScreen = newScreen;
}

let Screens = {
  START: {
    draw() {
      backGround.draw();
      floor.draw();
      flappyBird.draw();
      getReadyMsg.draw();
    },
    click() {
      changeScreen(Screens.GAME);
    },
    atualiza() {

    }
  }
};

Screens.GAME = {
  draw() {
    backGround.draw();
    floor.draw();
    flappyBird.draw();
  },
  atualiza() {
    flappyBird.atualiza();
  }
}

function loop() {
  activeScreen.draw();
  activeScreen.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(activeScreen.click) {
    activeScreen.click();
  }
})

changeScreen(Screens.START);
loop();