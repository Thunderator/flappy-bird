let frames = 0;

const source = new Image();
source.src = './src/sprites.png';

const hit = new Audio();
hit.src = './src/sounds/hit.wav'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function collide(flappyBird, floor) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const floorY = floor.y;

  if (flappyBirdY >= floorY) {
    return true;
  }

  return false;
}

function createFlappyBird() {
  const flappyBird = {
    sourceX: 0,
    sourceY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    jumpHeight: 4.6,
  
    jump() {
      flappyBird.velocidade = - flappyBird.jumpHeight;
    },
  
    atualiza() {
      if (collide(globais.flappyBird, globais.floor)) {
        hit.volume = 0.3;
        hit.play();

        setTimeout(() => {

        }, 500);
        changeScreen(Screens.START);
        return;
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    movements: [
      {sourceX: 0, sourceY: 0, },
      {sourceX: 0, sourceY: 26, },
      {sourceX: 0, sourceY: 52, },
      {sourceX: 0, sourceY: 26, },
    ],

    frameAtual: 0,
    atualizaFrameAtual() {
      const intervaloDeFrames = 7;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movements.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }
    },

    draw() {
      flappyBird.atualizaFrameAtual();
      const { sourceX, sourceY } = flappyBird.movements[flappyBird.frameAtual];
      contexto.drawImage(
        source,
        sourceX, sourceY,
        flappyBird.largura, flappyBird.altura,
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }
  return flappyBird;
}

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
  },
}

function createFloor() {
  const floor = {
    sourceX: 0,
    sourceY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    atualiza() {
      const repeteEm = floor.largura / 2;

      if (floor.x <= - repeteEm){
        return floor.x=0
      }

      floor.x = floor.x - 1;
    },
  
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
  return floor;
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

function createPipes() {
  const pipes = {
    largura: 52,
    altura: 400,
    floor: {
      sourceX: 0,
      sourceY: 169,
    },
    roof: {
      sourceX: 52,
      sourceY: 169,
    },

    draw() {
      pipes.pares.forEach(function(par) {
        
        const yRandom = par.y;
        const espaco = 90;
        
        const pipeRoofX = par.x;
        const pipeRoofY = yRandom;
        // Roof Pipe
        contexto.drawImage(
          source,
          pipes.roof.sourceX, pipes.roof.sourceY,
          pipes.largura, pipes.altura,
          pipeRoofX, pipeRoofY,
          pipes.largura, pipes.altura
        )

        const pipeFloorX = par.x;
        const pipeFloorY = pipes.altura + espaco + yRandom;

        // Floor Pipe
        contexto.drawImage(
          source,
          pipes.floor.sourceX, pipes.floor.sourceY,
          pipes.largura, pipes.altura,
          pipeFloorX, pipeFloorY,
          pipes.largura, pipes.altura,
        )
        
      })
    },

    pares: [],

    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        console.log("passou 100 frames");
        pipes.pares.push(
          {
            x: canvas.width,
            y: -150 * (Math.random() + 1),
          }
        );
      }

      pipes.pares.forEach(function(par) {
        par.x = par.x - 2;

        if (par.x + pipes.largura <= 0) {
          pipes.pares.shift();
        }
      });

    }
  }

  return pipes;
}

const globais = {};
let activeScreen = {};
function changeScreen(newScreen) {
  activeScreen = newScreen;

  if (activeScreen.initialize) {
    activeScreen.initialize();
  }
}

const Screens = {
  START: {
    initialize() {
      globais.flappyBird = createFlappyBird();
      globais.floor = createFloor();
      globais.pipes = createPipes();
    },
    draw() {
      backGround.draw();
      globais.pipes.draw();
      globais.flappyBird.draw();
      globais.floor.draw();
      // getReadyMsg.draw();
    },
    click() {
      changeScreen(Screens.GAME);
    },
    atualiza() {
      globais.floor.atualiza();
      globais.pipes.atualiza();
    }
  }
};

Screens.GAME = {
  draw() {
    backGround.draw();
    globais.floor.draw();
    globais.flappyBird.draw();
  },
  click() {
    globais.flappyBird.jump();
  },
  atualiza() {
    globais.flappyBird.atualiza();
    globais.floor.atualiza();
  }
}

function loop() {
  activeScreen.draw();
  activeScreen.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(activeScreen.click) {
    activeScreen.click();
  }
})

changeScreen(Screens.START);
loop();