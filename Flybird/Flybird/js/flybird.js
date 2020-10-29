
var timer1; //主定时器
var timer2; //鼠标事件定时器
var score=0;
var zhuzi=[];
var bird=[];
var zhuzicount=0;
var isshowtoast=true;

//弹窗
function showtoast(){
    var a=confirm("是否开始游戏？");  
        if(a){  
                startgame();  
             }
}
function showtoast1(){
    var a=confirm("游戏结束，您的分数为"+score+"\n"+"是否开始游戏！");  
        if(a){  
                init();
                startgame();  
             }
}
function startgame(){

    timer1=setInterval(function(){
    //小鸟位置跟新
    var bird1=document.getElementById("bird");
    bird1.style.top=bird1.offsetTop+4+"px";

    //柱子位置跟新
    zhuzi.forEach((item,index)=>{
    item.style.left=item.offsetLeft-5+"px";
        if(item.offsetLeft<=0){
            score=(score+1);
          document.body.removeChild(item);
          zhuzi.splice(index,1);
        }
         })

   //碰撞检测
    isboom();    
    //监听事件
    document.addEventListener("mousedown", anxia);
    document.addEventListener("mouseup", tanqi);
    //判断游戏是否结束
    if(bird1.offsetTop>=window.innerHeight)
    {
     gameover();

    }

    zhuzicount++;
    if(zhuzicount>=50){
     creatzhuzi();//生成柱子
    zhuzicount=0;
    }
//分数更新
var tt=document.getElementById("score");
          tt.innerHTML="分数："+score

},20)
}
 
 function init(){
     //数据初始化
     console.log(zhuzi)
     timer1; //主定时器
     timer2; //鼠标事件定时器
     score=0;
     zhuzi=[];
     bird=[];
     zhuzicount=0;
    

     /*背景图片初始化*/
     var screenx=window.innerWidth;
     var screeny=window.innerHeight;
     var bacimg=document.getElementById('background1');
     bacimg.height=screeny;
     bacimg.width=screenx;
     
     document.removeEventListener("mousedown", anxia);
     document.removeEventListener("mouseup", tanqi);
     if(isshowtoast){
        setTimeout(showtoast,100);
        isshowtoast=false;
     }
     
     //showtoast(); //显示弹窗
 }   

 //生成柱子
function creatzhuzi(){
    //console.log("敌人")
     var div1=document.createElement("img");
     var div2=document.createElement("img");
     var x=window.innerWidth-60;
     //top柱子
     div1.className="enemy";
     div1.src="./img/pipe.png";
     div1.style.height = window.innerHeight*0.5*(0.4+Math.random()*0.5)+"px";
     div1.style.left = x + "px";
     div1.style.top = 0+ "px";
     zhuzi.push(div1);
     document.body.appendChild(div1); 

     //bottom柱子
     div2.className="enemy";
     div2.src="./img/pipe.png";
     div2.style.left = x + "px";
     var t=window.innerHeight*0.5*(0.4+Math.random()*0.5);
     div2.style.height=t+"px";
     div2.style.top = window.innerHeight+(-t)+ "px";
     zhuzi.push(div2);
     document.body.appendChild(div2); 
}

   //碰撞函数
   function isCollide(sp,st){
    let spX = sp.offsetLeft + sp.scrollWidth / 2;  /*获取中心点*/
    let spY = sp.offsetTop + sp.offsetHeight / 2;
    return !!(   spX >= st.offsetLeft-(sp.scrollWidth / 2-5)
              && spX <= st.offsetLeft + st.width+(sp.scrollWidth / 2-5)
              && spY >= st.offsetTop- (sp.offsetHeight / 2 -5)
              && spY <= st.offsetTop + st.height+ (sp.offsetHeight / 2-5));
  }
  //碰撞检测函数
  function isboom(){
      
    for ( let i = 0, il = zhuzi.length; i < il;i++ ) {
      let enemy2 = zhuzi[i];
      if (isCollide(document.getElementById("bird"),enemy2)) {    //检测碰撞
        gameover();
        break;
      }
    }
    /*
    zhuzi.forEach((item,index)=>{
        if (isCollide(document.getElementById("bird"),item)) {    //检测碰撞
        gameover();
        break;
      }
         })
         */
  }
 //鼠标按下响应
function anxia(){
    timer2=setInterval(function(){
    var bird1=document.getElementById("bird");
    bird1.style.transform="rotate("+(-30)+"deg)";
    bird1.style.top=bird1.offsetTop-10+"px"; 
    if(bird1.offsetTop<=0){bird1.style.top=0+"px";} //不会超出上边界
    },20)
 };
 //鼠标弹起响应
 function tanqi(){
    var bird1=document.getElementById("bird");
    bird1.style.transform="rotate("+20+"deg)";
    clearInterval(timer2)
 }
 //游戏结束
 function gameover()
 {
        clearInterval(timer1);
        clearInterval(timer2);
        document.removeEventListener("mousedown", anxia);
        document.removeEventListener("mouseup", tanqi);
        var bird1=document.getElementById("bird");
        bird1.style.bottom=0.5;
        bird1.style.top=230+"px"; 
         //清空img 
         zhuzi.forEach((item,index)=>{
          document.body.removeChild(item);
         })
         zhuzi=[];
         showtoast1();
 }
