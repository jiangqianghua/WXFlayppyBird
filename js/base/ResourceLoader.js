// 资源文件加载器，确保cavans在图片资源加载完后才进行渲染
import {Resources} from "./Resources"
export class ResourceLoader{
  constructor(){
    // 将资源转为map存储
    this.map = new Map(Resources);
    //console.log(this.map)
    // 把图片资源生成Image对象
    for(let[key,value] of this.map){
      const image = new Image();
      image.src = value ;
      this.map.set(key,image);
    }
  }
  /**
   * 加载图片资源完成回调callback
   */
  onLoaded(callback){
    let loadedCount = 0 ; 
    for(let value of this.map.values()){
      value.onload = () =>{
        loadedCount++;
        if(loadedCount >= this.map.size){
          callback(this.map);
        }
      }
    }
  }

  static create(){
    return new ResourceLoader();
  }
}