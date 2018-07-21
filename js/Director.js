import { DataStore } from "./base/DataStore.js"
import {UpPencil} from "./runtime/UpPencil.js"
import {DownPencil} from "./runtime/DownPencil.js"
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
export class Director{


  static getInstance(){
    if(!Director.instance){
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor(){
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2 ;
    this.pencilGap = screenHeight/5;
  }

  createPencil(){
    const minTop = screenHeight / 8 ; 
    const maxTop = screenHeight / 2; 
    const top = minTop + Math.random()*(maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }

  run(){
    this.check();
    if(!this.isGameOver){
      const backgroundSprite = this.dataStore.get('background');
      //debugger;
      backgroundSprite.draw();


      const pencils = this.dataStore.get("pencils");

      if (pencils[0].x + pencils[0].width <= 0 &&
        pencils.length === 4) {
        pencils.shift();
        pencils.shift();
        const score = this.dataStore.get('score');
        score.isScore = true ;
      }

      if (pencils[0].x <= (screenWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil();
      }

      pencils.forEach(function (value) {
        value.draw();
      });
      const landSprite = this.dataStore.get('land');
      landSprite.draw();

      const score = this.dataStore.get('score');
      score.draw();
      const birds = this.dataStore.get('birds');
      birds.draw();

      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put("timer",timer);
    }else{
      this.dataStore.bgm.stop();
      console.log('game over...');
      this.dataStore.get("startButton").draw();
      cancelAnimationFrame(this.dataStore.get("timer"));
      this.dataStore.destory();

      wx.triggerGC();

      wx.vibrateShort({
        success:function(){
          console.log("vibrateShort...")
        }

      });
    }
  }

  birdsEvent(){
    for(let i = 0 ; i <= 2 ; i++){
      this.dataStore.get('birds').y[i] = 
        this.dataStore.get('birds').birdsY[i]; let y = this.dataStore.get('birds').birdsY[i];
        console.log("touch " + y)
        this.dataStore.get('birds').time = 0 ;
    }
  }

  check(){
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y){
      console.log("landed...");
      this.isGameOver = true;
      return ;
    }

    const pencils = this.dataStore.get('pencils');

    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }

    const  length = pencils.length;
    for(let i = 0 ; i < length ; i++){
      const pencil = pencils[i];
      const pencilBorder = {
        top:pencil.y,
        bottom:pencil.y + pencil.height,
        left:pencil.x,
        right:pencil.x + pencil.width 
      };
      if (Director.isStrike(birdsBorder, pencilBorder)){
        console.log("撞击铅笔...");
        this.isGameOver = true;
        this.dataStore.bgm.stop();
        return;
      }
    }

    const score = this.dataStore.get('score');
    if(birds.birdsX[0] > pencils[0].x + pencils[0].width &&
    score.isScore){
      score.isScore = false;
      score.scoreNumber++ ;
    }
  }

  static isStrike(bird, pencil){
    let s = false ;
    if(bird.top > pencil.bottom || 
    bird.bottom < pencil.top ||
    bird.right < pencil.left ||
    bird.left > pencil.right){
      s = true ;
    }
    return !s ;
  }

}