
var direction='left'; //移动方向
var timer=null;  //定时器
var speed;  //移动像素
var timerspeed; //定时周期
var snack=[];  //贪吃蛇
var food=[];   //食物
var game_status=0; //未开始 1：开始
var score=0;

function keyDownTextField(e) {
    if (e.keyCode == 37&(direction!='right')) {
       direction='left'
       //console.log(direction)
    }
    else if(e.keyCode == 38&(direction!='down')){
        direction='up'
        //console.log(direction)
    }
    else if(e.keyCode == 39&(direction!='left')){
        direction='right'
        //console.log(direction)
    }
    else if(e.keyCode == 40&(direction!='up')){
        direction='down'
        //console.log(direction)
    }
}
function startgame(){
    if(game_status==0){
   window.onkeydown = keyDownTextField;   //键盘响应
    init();          //初始化
    game_status=1;
   timer=setInterval(function(){
      carryout();  //贪吃蛇移动
   if(food.length==0||food==undefined){
      addfood();   //添加食物
      //console.log("添加食物！")
    }
    else{
        //console.log("已有食物，不需添加！")  
    }
    //isboom();
    eatfood()
    },timerspeed)
    }else
    {
        return;
    }
}

function init(){
    //数据初始化
    direction='left'; //移动方向
    timer=null;  //定时器
    speed=10;  //移动像素
    timerspeed =200; //定时周期
    snack=[];  //贪吃蛇
    food=[];   //食物
    game_status=0; //未开始
    score=0;

    snack.push(document.getElementById("head"));
    snack.push(document.getElementById("body1"));
    snack.push(document.getElementById("body2"));

    settimerspeed();
}
function settimerspeed(){
    var index1=document.getElementById("timerspeed").selectedIndex;
    if(index1==0){
     timerspeed=600;
    }
    else if(index1==1){
    timerspeed=500;
    }
    else if(index1==2){
    timerspeed=400;
    }
    else if(index1==3){
    timerspeed=200;
    }
    else if(index1==4){
    timerspeed=50;
    }
}

function carryout(){
    if (direction=='left') {
        snackmove('left')
        //head.style.left=head.offsetLeft-speed+"px";
     }
     else if(direction=='up'){
         snackmove('up')
        //head.style.top=head.offsetTop-speed+"px";
     }
     else if(direction=='right'){
         snackmove('right')
        //head.style.left=head.offsetLeft-(-speed)+"px";
     }
     else if(direction=='down'){
         snackmove('down')
        //head.style.top=head.offsetTop-(-speed)+"px";
     }
}

function snackmove(dir){
    var div1 = snack[0];
    var div2 = snack[snack.length-1];
    div2.style.left = div1.offsetLeft+"px";
    div2.style.top = div1.offsetTop+"px";
    if(dir == "left"){
    div1.style.left = div1.offsetLeft-speed+"px";
    }
    else if(dir == "up"){
    div1.style.top = div1.offsetTop-speed+"px";
    }
    else if(dir == "right"){
    div1.style.left = div1.offsetLeft-(-speed)+"px";
    }
    else if(dir == "down"){
    div1.style.top = div1.offsetTop-(-speed)+"px"; 
    }
    //console.log("变化前"+snack.length)
    snack.shift();//删除第一个元素
    snack.unshift(div2);
    snack.unshift(div1);
    snack.pop();//删除最后一个元素
    //console.log("变化后"+snack.length)
}

function addfood(){
     var div1=document.createElement("div");
     div1.className="food";
     //保证食物的位置为十个像素整数倍
     var t1=window.innerHeight*Math.random()*0.9;
     var t2=window.innerWidth*Math.random()*0.9;
     div1.style.top = Math.round(t1)-Math.round(t1)%10+"px";
     div1.style.left = Math.round(t2)-Math.round(t2)%10+"px";
     //console.log(Math.round(t1)-Math.round(t1)%10)
     //console.log(Math.round(t2)-Math.round(t2)%10)
     food.push(div1);
     document.body.appendChild(div1); 
}

function deletefood(){
    if(food==null) return;
    food.forEach((item,index)=>{
     document.body.removeChild(item)
     food=[];
    })
}

function eatfood(){
    if((food[0].offsetTop==snack[0].offsetTop)&&(food[0].offsetLeft==snack[0].offsetLeft)){
        //console.log("吃到食物啦~")
        
        score=score+1;
        document.getElementById("score").innerHTML="分数："+score;
        addbody();
        deletefood();
        addfood();
    }
}
function addbody(){
    var div1=document.createElement("div");
     div1.className="snackbody";
     //保证食物的位置为十个像素整数倍
     div1.style.top = snack[snack.length-1].offsetTop+"px";
     div1.style.left = snack[snack.length-1].offsetLeft+"px";
     snack.push(div1);
     document.body.appendChild(div1); 
}
function overgame(){
    food.forEach((item,index)=>{
        document.body.removeChild(item)
        food=[];
       })
    snack.forEach((item,index)=>{
        if(index>2){     
        document.body.removeChild(item)}
    })

   clearInterval(timer);
   game_status=0;
}