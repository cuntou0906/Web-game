//点击开始游戏-生成100个div
//左击 没有雷显示数字（点击为0 则扩散），有雷则失败 
//右击 有标记则取消标记，没标记则标记，并且判断标记是否正确 10个都标记则
//
var startbtn = document.getElementById('start');
var overbtn = document.getElementById('over');
var box = document.getElementById('box');
var flagbox = document.getElementById('flagbox');
var alertbox = document.getElementById('alertbox');
var alertimg = document.getElementById('alertimg');
var close = document.getElementById('close');
var score = document.getElementById('score');
var mineNum;  //总共雷数
var mineOver;
var block;
var minemap=[];
var stargame=false;

bindEvent();
function bindEvent(){
startbtn.onclick=function(){
    if(!stargame){
    box.style.display="block";
    flagbox.style.display="block";
    init();
    stargame=true
    }
    else{return}
}
box.oncontextmenu=function(){   //取消默认点击事件
    return false;
}
box.onmousedown=function(e){
    var event= e.target;
    if(e.which==1){
        leftClick(event); //左击
    }
    else if(e.which==3)
    {
        rightclick(event); //右击
    }
}
close.onclick=function(){
    alertbox.style.display="none";
    flagbox.style.display="none";
    box.style.display="none";
    box.innerHTML='';
    stargame=false;
}
over.onclick=function(){
    alertbox.style.display="none";
    flagbox.style.display="none";
    box.style.display="none";
    box.innerHTML='';
    stargame=false;
}
}
function init(){
    mineNum=10;
    mineOver=10;
    score.innerHTML=mineOver;
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            var con = document.createElement('div');
            con.classList.add("block");
            con.setAttribute('id',i+'+'+j);
            box.appendChild(con);
            minemap.push({mine:0});
        }
    }
    block=document.getElementsByClassName('block');
while(mineNum){
    var mineIndex = Math.floor(Math.random()*100)
    if(minemap[mineIndex].mine===0){
        minemap[mineIndex].mine=1;
        block[mineIndex].classList.add("islei");
        mineNum--;
    }
}
}

function leftClick(dom){  
    if(dom.classList.contains('flag')){return;}
    var islei=document.getElementsByClassName('islei');
    if(dom&&dom.classList.contains('islei')){
        console.log("点到雷了")
        for(var i=0;i<islei.length;i++){
            islei[i].classList.add("isshow");
        }
        setTimeout(function(){
            alertbox.style.display="block";
            alertimg.style.backgroundImage="url(img/失败.jpg)"
            },800)
    }else{
        var n=0;
        var posArr=dom&&dom.getAttribute('id').split('+');
        var posx=posArr&&+posArr[0];
        var posy=posArr&&+posArr[1];
        dom&&dom.classList.add('num');//展示数字
        for( var i=posx-1;i<=posx+1;i++){
            for( var j=posy-1;j<=posy+1;j++){
            var arroundbox=document.getElementById(i+'+'+j);
           if(arroundbox&&arroundbox.classList.contains('islei')){
               n++;
           }
            }
        }
        dom&&(dom.innerHTML=n);
        if(n==0){  //扩散
            for( var i=posx-1;i<=posx+1;i++){
                for( var j=posy-1;j<=posy+1;j++){
                var nearbox=document.getElementById(i+'+'+j); 
                if(nearbox&&nearbox.length !=0){
                    if(!nearbox.classList.contains('check')){
                      nearbox.classList.add('check');
                      leftClick(nearbox);
                    }
                }
                }
            }
        }
    }

}
function rightclick(dom){
    if(dom.classList.contains('num')){
        return;
    }
     dom.classList.toggle('flag');
     if(dom.classList.contains('islei')&&dom.classList.contains('flag'))
{ mineOver--;}
if(dom.classList.contains('islei')&&!dom.classList.contains('flag'))
{mineOver++;}
score.innerHTML=mineOver;
if(mineOver==0){
    alertbox.style.display="block";
    alertimg.style.backgroundImage="url(img/胜利.jpg)"
}
    }