export class WX {
  constructor() {
    // this.onshow=null;
    
  }
  onShow(func) {
    setTimeout(func, 1);
    // func();
  }
  onHide(func) {
    // do nothing
  }
  createCanvas() {
    let canvas = document.querySelector('canvas');
    return canvas;
  }
  getSystemInfoSync() {
    let screenWidth=window.screen.width;
    let screenHeight=window.screen.height;
    let pixelRatio=window.devicePixelRatio;
    console.log(screenWidth);
    console.log(screenHeight);
    console.log(pixelRatio);
    return {screenWidth,screenHeight,pixelRatio};
  }
  onTouchStart(func) {
    let canvas = document.querySelector('canvas');
    canvas.ontouchstart=func;
  }
  onTouchMove(func) {
    let canvas = document.querySelector('canvas');
    canvas.ontouchmove=func;
  }
  onTouchEnd(func) {
    let canvas = document.querySelector('canvas');
    canvas.ontouchend=func;
  }
};

var wx = new WX();
// wx.onShow();
export {wx}