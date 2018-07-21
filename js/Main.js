// 初始化整个游戏的精灵，作为游戏的入口
import { ResourceLoader } from '../js/base/ResourceLoader'
import { Director } from './Director'
import {BackGround} from './runtime/BackGround'
import {DataStore} from "./base/DataStore"
import {Land} from "./runtime/Land.js"
import {Birds} from "./player/Birds.js"
import {StartButton} from "./player/StartButton.js"
import {Score} from "./player/Score.js"
export class Main{
  constructor(){
    this.ctx = canvas.getContext('2d')
    const loader = ResourceLoader.create();
    this.director = Director.getInstance();
    this.dataStore = DataStore.getInstance();
    loader.onLoaded((map) => this.onResourceFirstLoaded(map));
    this.createBackGroundMusic();

    //Director.getInstance();

  }
  // 一定要在图片加载完成后执行绘制操作，否则显示不出图片
  onResourceFirstLoaded(map){
    this.dataStore.ctx = this.ctx ;
    this.dataStore.res = map ; 
    this.init();
  }

  init(){
    this.playBackGroundMusic();
    this.director.isGameOver = false ;
    this.dataStore
    .put('pencils',[])
    .put('background',BackGround)
    .put("land",Land)
    .put("birds",Birds)
    .put("startButton",StartButton)
    .put("score",Score);
    this.registerEvent();
    this.director.createPencil();
    this.director.run();
  }

  registerEvent(){
    wx.onTouchStart((res)=>{
      console.log(res);
     // res.preventDefault();
      if(this.director.isGameOver){
        console.log("游戏开始");
        this.init();
      }else{
        this.director.birdsEvent();
      }
    });
  }

  createBackGroundMusic(){
    let bgm = wx.createInnerAudioContext();
    bgm.autoplay = false;
    bgm.loop = true;
    bgm.src = "audio/bgm.mp3";
    this.dataStore.bgm = bgm;
  }
  playBackGroundMusic(){
    this.dataStore.bgm.play();
  }

  stopBackGroundMusic(){
    this.dataStore.bgm.stop();
  }
}