import { chooseHero, confirmHero } from "./choose-hero";
import { renderHeroChoisePage } from "./render";

const container = document.querySelector('.container') as HTMLElement;
welcome()
function welcome() {  
  const containertTop = createNode('div', 'container-top');
  container.append(containertTop);

  const welcomeText = createNode('p', 'welcome-text');
  welcomeText.innerText = 'Welcome';
  containertTop.append(welcomeText);

  const gameName = createNode('div', 'game-name');
  gameName.innerText = 'Savior';
  containertTop.append(gameName);

  const containerBottom = createNode('div', 'container-bottom');
  container.append(containerBottom);

  const startBtn = createNode('button', ['start-btn', 'btn']);
  startBtn.innerText = 'start';
  containerBottom.append(startBtn);

  const pressEnter = createNode('p', 'press-enter');
  pressEnter.innerText = 'or press Enter';
  containerBottom.append(pressEnter);
  
  setTimeout(() => {
    startBtn.classList.add('display-on');
    pressEnter.classList.add('display-on');
  }, 2000)

  startBtn.addEventListener('click', onStartBtnClick);

  window.addEventListener('keydown', onStartBtnClick);
}

function createNode(tagName: string, classes: Array<string> | string) {
  const node = document.createElement(tagName);
  if(Array.isArray(classes)) {
    classes.forEach(function(item) {
      node.classList.add(item)
    })
  } else {
    node.classList.add(classes)
  }
  return node;
}

function onStartBtnClick() {
  container.innerHTML = '';
  typeGameStory()
  displaySkipBtn()
}

function crateTypingItem() {
  const typingItem = createNode('div', 'typing-container__item');
  const sentence = createNode('span', 'sentence');
  const inputCursor = createNode('span', 'input-cursor');
 
  typingItem.append(sentence)
  typingItem.append(inputCursor);

  return typingItem;
}
async function typeSentence(sentence: string, eleRef: HTMLElement, delay = 100){
  const letters = sentence.split('')
  let i = 0
  while(i<letters.length){
      await waitForMs(delay);
      eleRef.append(letters[i])
      i++
  }
  return
}
function waitForMs(ms: number){
  return new Promise(resolve =>setTimeout(resolve,ms))
}
async function typeGameStory(){
  const gameStoryText = ['3023 year', 'The Earth is attacked by giant insects from outer space!', 'Your mission is to eliminate invaders and save the planet.', 'You have been chosen to accomplish this mission.'];
  for (const item of gameStoryText) {
    const typingItem = crateTypingItem();
    container.append(typingItem);
    const sentence = typingItem?.querySelector('.sentence') as HTMLElement;
    await typeSentence(item, sentence);
    const cursor =   typingItem.querySelector('.input-cursor ') as HTMLElement;
    cursor.style.visibility = 'hidden';
  }
}

function displaySkipBtn() {
  const skipBtn = createNode('button', ['skip-btn','btn'])
  skipBtn.innerHTML = 'Skip';
  container.append(skipBtn);

  skipBtn.addEventListener('click', onSkipBtnClick)
}

function onSkipBtnClick() {
  container.remove();

  // Отрисовка страницы выбора и последующие обработчики событий

  renderHeroChoisePage()
  document.body.addEventListener('keydown', chooseHero);
  document.body.addEventListener('keydown', confirmHero);
}
const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 500;

let gameFrame = 0;
class Enemy {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  spriteWidth: number;
  spriteHeight: number;
  frame: number;
  flapSpeed: number;
  constructor() {
    this.image = new Image();
    this.image.src = './catalog-img/enemy2.png';
    this.speed = Math.random() *4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * ( canvas.width - this.width);
    this.y = Math.random() *  ( canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() {
    this.x -= this.speed
    //this.y += this.speed
    if(gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }
  draw() {
    ctx?.strokeRect(this.x,this.y, this.width,this.height);
    ctx?.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth,this.spriteHeight ,this.x, this.y, this.width, this.height)
  }
}
const enemy1 = new Enemy();

function animate() {
  ctx?.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemy1.update()
  enemy1.draw()
  requestAnimationFrame(animate)
  gameFrame++;
}
animate()