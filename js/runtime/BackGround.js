// 背景
import {Sprite} from "../base/Sprite.js"
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export class BackGround extends Sprite{
  constructor(){
    const image = Sprite.getImage("background");
    super(image,
    0,0,
    image.width,image.height,
    0,0,
    screenWidth,screenHeight);
  }
}