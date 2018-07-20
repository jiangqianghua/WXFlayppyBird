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
    const backgroundSprite = this.dataStore.get('background');
    //debugger;
    backgroundSprite.draw();


    const pencils = this.dataStore.get("pencils");

    if(pencils[0].x + pencils[0].width <= 0 &&
    pencils.length === 4){
      pencils.shift();
      pencils.shift();
    }

    if(pencils[0].x <= (screenWidth - pencils[0].width)/2 && pencils.length === 2){
      this.createPencil();
    }
    
    pencils.forEach(function (value) {
      value.draw();
    });
    const landSprite = this.dataStore.get('land');
    landSprite.draw();

    requestAnimationFrame(()=>this.run());
  }

}