var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var predio,predio2,pasago,olha_o_poste_desgrama


var gameOver, gameOverImg
var restart, restartImg

var pontos = 0;
var nome;
var nomePontuacao;

var pontuacao = 0;

var gameState = 0;


function preload() {
  bgImg = loadImage("assets/bg.png")
  predio = loadImage("assets/obsBottom1.png")
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  olha_o_poste_desgrama = loadImage ("assets/obsBottom2.png")
  predio2 = loadImage ("assets/obsBottom3.png")
  pasago = loadImage ("assets/obsTop2.png") 

  gameOverImg = loadImage("assets/fimdejogo.png");
  restartImg = loadImage("assets/restart.png");

  jumpSound = loadSound("assets/jump.mp3");
  dieSound = loadSound("assets/die.mp3");

}

function setup() {

  createCanvas(800, 750)
  //imagem de plano de fundo
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3


  //criando o balão   
  balloon = createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.2;

  obstop2 = new Group()

obstacles1 = new Group() 

//configura os elementos de html 
  elementos()

  //manda executar o que acontece quando vc clica no botão de começar
  cliqueComecar();

}

function draw() {

  background("black");

  if (gameState === 1) {
    play();
  }

}


function play() {
  //fazendo o balão de ar quente pular
  if (keyDown("space")) {
    balloon.velocityY = -6;

  }


  //adicionando gravidade
  balloon.velocityY = balloon.velocityY + 0.5;

  nomePontuacao.html(nome + " " + pontos);
  obstacles()
  obstaclevoador()

  if (balloon.isTouching(obstacles1) || balloon.isTouching(obstop2)) {
    balloon.remove()
  }
  
  drawSprites();
}


function obstaclevoador(){
  if (frameCount % 150 === 0) {
    var obstacleVoador = createSprite(800,500)
  
  obstacleVoador.velocityX = -5 
  
obstacleVoador.y = Math.round(random(100,300))

    obstacleVoador.addImage(pasago)
   obstacleVoador.scale = 0.3 

obstop2.add(obstacleVoador)


   }
}


function obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(800,500)
  
  obstacle.velocityX = -5 
  
  var rand = Math.round(random(1,3))
  switch(rand) {
  
   case 1: obstacle.addImage(predio)
   obstacle.scale = 0.3 
   break; 
  
  case 2: obstacle.addImage(olha_o_poste_desgrama)
  obstacle.scale = 0.2 
  obstacle.y = 600
  break; 
  
  case 3: obstacle.addImage(predio2)
  obstacle.scale = 0.3 
  break;
  
  default: break
  
   }
  
  obstacles1.add(obstacle)

  }
}

//o que acontece quando a gente clica em começar
function cliqueComecar() {
  startButton.mouseClicked(() => {
    gameState = 1;
    nome = nomeInput.value();
    esconder();
  })
}

//esconde o texto inicial e o botão começar
function esconder() {
  startButton.hide();
  texto.hide();
  nomeInput.hide();
}

function elementos() {
  //digitar nome do jogador
  nomeInput = createInput("").attribute("placeholder", "Digite Seu Nome");
  nomeInput.position(280, height / 2 - 30);
  nomeInput.class("inputNome");

  //botão pra começar o jogo
  startButton = createButton("Começar");
  startButton.position(340, height / 2);
  startButton.class("botaoComecar");

  nomePontuacao = createElement("h2");
  nomePontuacao.position(10, 10);
  nomePontuacao.class("nomePontuacao");


  //texto explicativo que aparece no começo do jogo
  texto = createElement("h2");
  texto.position(130, 150);

  var message = `
      Como jogar: aperte espaço para manter
    </br>o balão no ar. Desvie dos obstaculos. 
    </br></br>Digite seu nome e clique em Começar para Jogar.
      `;

  texto.html(message);
  texto.class("textostyle");
}



