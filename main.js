import {gradientColors} from "./color.js"
import {wx} from "./mochat.js"

/**
 * @description: 用于canvas绘制按钮
 * @param {*} ctx canvas的2d对象上下文
 * @param {*} startPoint 按钮的左上角坐标点
 * @param {*} width 按钮的宽度
 * @param {*} height 按钮的高度
 * @param {*} radius 按钮的圆角
 * @param {*} borderColor 边框颜色
 * @param {*} backgroundColor 背景色
 * @param {*} text 按钮文字
 * @param {*} textColor 文字颜色
 * @param {*} fontSize 文字大小
 * @return {*}
 */
function drawBottom(ctx, startPoint, width, height, radius, backgroundColor) {
  ctx.strokeStyle = backgroundColor;
  ctx.fillStyle = backgroundColor;
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y + radius);
  ctx.arcTo(startPoint.x, startPoint.y, startPoint.x + radius, startPoint.y, radius);
  ctx.lineTo(startPoint.x + width - radius, startPoint.y)
  ctx.arcTo(startPoint.x + width, startPoint.y, startPoint.x + width, startPoint.y + radius, radius);
  ctx.lineTo(startPoint.x + width, startPoint.y + height - radius)
  ctx.arcTo(startPoint.x + width, startPoint.y + height, startPoint.x + width - radius, startPoint.y + height, radius);
  ctx.lineTo(startPoint.x + radius, startPoint.y + height)
  ctx.arcTo(startPoint.x, startPoint.y + height, startPoint.x, startPoint.y + height - radius, radius)
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  // console.log("here");
}
function drawFront(ctx, startPoint, width, height, radius, backgroundColor) {
  ctx.strokeStyle = backgroundColor;
  ctx.fillStyle = backgroundColor;
  ctx.beginPath();
  //从150,150的位置为圆心，50为半径，画一个从0-2π的圆
  ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
export class Main {
  
  constructor(){
    
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    let ctx=this.ctx;

    wx.onShow(()=>{
      this.exec()
    })
    wx.onHide(()=>{
      wx.offTouchStart()
      wx.offTouchMove()
      wx.offTouchEnd()
      wx.offTouchEnd()
    })
  }
  exec() {
    // 使清晰 
    let { screenWidth, screenHeight, pixelRatio } = wx.getSystemInfoSync();
    pixelRatio=3;
    this.canvas.width = screenWidth * pixelRatio;
    this.canvas.height = screenHeight * pixelRatio;
    this.pixelRatio = pixelRatio;

    this.ctx.fillStyle = 'white'
    // this.ctx.strokeStyle = 'blue'
    this.ctx.lineWidth = '0'
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const center_point_lat = canvas_width / 2
    const center_point_long = canvas_height / 2
    // console.log("-----------------");
    // console.log(this.canvas);
    this.ctx.clearRect(0, 0, 300, 300)
    this.ctx.fillRect(0, 0, canvas_width, canvas_height)
    drawBottom(this.ctx, { x: center_point_lat - 180, y: center_point_long - 100 }, 360, 200, 100, '#cccccc')
    this.button_lat = (center_point_lat - 180) / pixelRatio
    this.button_long = (center_point_long - 100) / pixelRatio
    this.button_width = 360 / pixelRatio
    this.button_height = 200 / pixelRatio
    this.bg_lat=center_point_lat - 180;
    this.bg_long=center_point_long - 100;
    this.bg_weigth=360
    this.bg_height=200
    this.bg_radius=100
    this.bg_color_left='#cccccc'
    this.bg_color_right='#13ce66'
    drawFront(this.ctx, { x: center_point_lat - 80, y: center_point_long }, 360, 200, 85, '#ffffff')
    this.last_circle_x=center_point_lat - 80
    this.last_circle_y=center_point_long
    this.circle_radius=85
    this.circle_color='#ffffff'   
    this.circle_target_left=this.last_circle_x
    this.circle_target_right=this.last_circle_x+160
    this.circle_move_orientation='r'
    // console.log("here1");
    let in_button = false;
    let touch_move_x
    let touch_move_y
    wx.onTouchStart(e => {
      // console.log(e.touches[0].pageX);
      // console.log(e.touches[0].pageY);

      touch_move_x = e.touches[0].pageX
      touch_move_y = e.touches[0].pageY
      if (this.isInButton(e.touches[0].pageX, e.touches[0].pageY)) {
        // console.log("in");
        in_button = true;
      } else {
        in_button = false;
      }
      // console.log("touchstart");
    })
    wx.onTouchMove(e => {
      // console.log(e.touches[0].pageX);
      // console.log(e.touches[0].pageY);
      touch_move_x = e.touches[0].pageX
      touch_move_y = e.touches[0].pageY
      // console.log("touchmove");
    })
    wx.onTouchEnd(e => {
      // console.log("touchend 1");
      // console.log(e);
      // console.log(e.touches[0].pageX);
      // console.log(e.touches[0].pageY);
      // console.log("touchend 2");
      if (in_button == false) {
        return;
      }
      if (this.isInButton(touch_move_x, touch_move_y)) {
        // console.log("in");
        in_button = true;
        this.buttonSwitch();
      } else {
        in_button = false;
      }
      // console.log("touchstart");
    })
    this.canvas.addEventListener('touchend', e => {
      // console.log("touchend");
    })


    // console.log(canvas_width);
    // console.log(canvas_height);
    // console.log(center_point_lat);
    // console.log(center_point_long);
    //描边矩形 描边样式为蓝色
    // this.ctx.strokeRect(center_point_lat-45,center_point_long-25,90,50)
  
  }
  buttonSwitch() {
    // console.log("buttonSwitch");
    // 第一帧执行的时间
    let startTime;
    // 期望动画持续的时间
    const duration = 250

    const color_gradients_left2right=gradientColors(this.bg_color_left, this.bg_color_right, 7);
    const color_gradients_right2left=gradientColors(this.bg_color_right, this.bg_color_left, 7);
    // console.log(color_gradients_left2right);
    // console.log(color_gradients_right2left);
    let current_frame_num=0;

    // console.log("========================");
    // console.log(this.last_circle_x);
    // console.log(this.circle_target_left);
    // console.log(this.circle_target_right);
    // console.log(this.circle_move_orientation);

    /*
    * 动画帧绘制方法.
    * currentTime是requestAnimation执行回调方法step时会传入的一个执行时的时间(由performance.now()获得).
    * */
    const step = (currentTime) => {
      // 第一帧绘制时记录下开始的时间
      !startTime && (startTime = currentTime)
      // 已经过去的时间(ms)
      const timeElapsed = currentTime - startTime
      // 动画执行的进度 {0,1}
      const progress = Math.min(timeElapsed / duration, 1)
      // let last_button_pos
      // 绘制方法
      const draw = () => {
        // 掩盖旧小圆圈
        // 画新的小圆圈
        
        // this.last_circle_x
        // this.last_circle_y
        // this.circle_radius
        // this.circle_color

        // console.log(a);

        if(this.circle_move_orientation=='r'){
          let t_color="#ffffff";
          if(current_frame_num<color_gradients_left2right.length){
            t_color=color_gradients_left2right[current_frame_num];
            current_frame_num++;
          }else{
            t_color=color_gradients_left2right[color_gradients_left2right.length-1];
          }
          drawBottom(this.ctx, { x: this.bg_lat, y: this.bg_long }, this.bg_weigth, this.bg_height, this.bg_radius, t_color)

          drawFront(this.ctx, { x: this.last_circle_x, y: this.last_circle_y}, 360, 200, this.circle_radius, "#cccccc")
          // console.log(progress);
          this.last_circle_x=this.last_circle_x+(this.circle_target_right-this.last_circle_x)*progress;

        }else{
          
          let t_color="#ffffff";
          if(current_frame_num<color_gradients_right2left.length){
            t_color=color_gradients_right2left[current_frame_num];
            current_frame_num++;
          }else{
            t_color=color_gradients_right2left[color_gradients_right2left.length-1];
          }
          drawBottom(this.ctx, { x: this.bg_lat, y: this.bg_long }, this.bg_weigth, this.bg_height, this.bg_radius, t_color)

          drawFront(this.ctx, { x: this.last_circle_x, y: this.last_circle_y}, 360, 200, this.circle_radius, "#cccccc")

          this.last_circle_x=this.last_circle_x+(this.circle_target_left-this.last_circle_x)*progress;
        }
        drawFront(this.ctx, { x: this.last_circle_x, y: this.last_circle_y}, 360, 200, this.circle_radius, this.circle_color)
      }
      draw()
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        if(this.circle_move_orientation=='r'){
          this.circle_move_orientation='l'
        }else{
          this.circle_move_orientation='r'
        }
        current_frame_num=0;
        // console.log('动画执行完毕')
      }
    }

    requestAnimationFrame(step)
  }

  isInButton(x, y) {
    // console.log("-----------------");
    x=x/this.pixelRatio; // H5与微信不同的地方
    y=y/this.pixelRatio; // H5与微信不同的地方
    // console.log(x);
    // console.log(y);
    // console.log("-----------------+++");
    // console.log(this.button_lat);
    
    // console.log(this.button_width);
    // console.log(this.button_long);
    // console.log(this.button_height);
    if (x >= this.button_lat && x <= this.button_lat + this.button_width) {
      if (y >= this.button_long && y <= this.button_long + this.button_height) {
        return true;
      }
    }
    return false;
  }
}