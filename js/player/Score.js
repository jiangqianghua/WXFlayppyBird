import {DataStore} from "../base/DataStore.js"
export class Score{
  constructor(){
    this.ctx = DataStore.getInstance().ctx;
    this.scoreNumber = 0 ;
    this.isScore = true ;// 控制能否加分,加完分设置false，当铅笔回收设置true
  }
  draw(){
    this.ctx.font = '25px Arial';
    this.ctx.fillStyle = '#ffcceb';
    this.ctx.fillText(
      this.scoreNumber,
      window.innerWidth/2,
      window.innerHeight/18,
      1000
    );
  }
}