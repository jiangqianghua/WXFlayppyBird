// 初始化整个游戏的精灵，作为游戏的入口
import { ResourceLoader } from '../js/base/ResourceLoader'
import { Director } from './Director'
import {BackGround} from './runtime/BackGround'
import {DataStore} from "./base/DataStore"

export class Main{
  constructor(){
    this.ctx = canvas.getContext('2d')
    const loader = ResourceLoader.create();
    this.dataStore = DataStore.getInstance();
    loader.onLoaded((map) => this.onResourceFirstLoaded(map));

    //Director.getInstance();

  }
  // 一定要在图片加载完成后执行绘制操作，否则显示不出图片
  onResourceFirstLoaded(map){
    this.dataStore.ctx = this.ctx ;
    this.dataStore.res = map ; 
    this.init();
  }

  init(){
    this.dataStore.put('background',
    BackGround);

    Director.getInstance().run();
  }
}