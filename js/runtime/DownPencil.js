// 下面的铅笔
// 上面的铅笔
import { Pencil } from "./Pencil.js"
import { Sprite } from "../base/Sprite.js"
import { Director } from "../Director.js"

export class DownPencil extends Pencil {
  constructor(top) {
    const img = Sprite.getImage("pencilDown");
    super(img, top)
  }

  draw() {
    this.y = this.top + Director.getInstance().pencilGap;
    super.draw();
  }
}