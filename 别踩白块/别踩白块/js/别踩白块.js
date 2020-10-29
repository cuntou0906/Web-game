
var score = 0;
var speed = 2;
var timer = null;
var status = 0 ;
var ischaoshen = 0;

// 根据id来获取元素
function $(id) {
        return document.getElementById(id);
    }

//点击开始游戏按钮 开始游戏
/*
querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素
//添加监听器，单击事件，执行init函数
*/ 
$('start').addEventListener('click', init);
$('over').addEventListener('click', over);
$('pause').addEventListener('click', pause);

//初始化函数
function init(ev){
  if(status == 0){
  console.log('开始游戏')
  delchild();
  status = 1;
  score = 0;
  speed = 2;
  ischaoshen = 0;
  $('score').innerHTML="分数："+score;   //更新界面分数
  for (var i = 0; i < 4; i++) {
    createrow();   //创建4个row 每个row有4个cell
}

// 添加onclick事件
$('main').addEventListener('click',mouse_click);

// 定时器 每30毫秒调用一次move()
timer = window.setInterval('move()', 30);
  }
  else{
    return   //游戏进行中 直接返回
  }
}

//监听鼠标事件
function mouse_click(ev) {
  ev = ev || event
  judge(ev);
  return
}

    // 判断是否点击黑块
function judge(ev) {
      if (ev.target.className.indexOf('black') != -1) {//点击目标元素 类名中包含 black 说明是黑块
          ev.target.className = 'cell';
          ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
          addscore();
      }
  }
   //让黑块动起来
function move() {
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con, null)['top']);  //获取id=con的top值
  //console.log("当前con的top值为"+top)
    if (speed + top > 0) {
        top = 0;
    } else {
        top += speed;
    }

    con.style.top = top + 'px'; //不断移动top值，使它动起来

    if (top == 0) {
        createrow();  //创建新的一行
        con.style.top = '-100px'; //con上移动
        delrow();
    } 
    //判断是否已经游戏结束
    var rows = con.childNodes;
    if ((rows.length >= 6) && (rows[rows.length - 1].pass != 1)) {
        over();
    }
}


//结束函数
function over(ev){
    console.log('结束游戏')
    status = 0;
    clearInterval(timer);
    var a=alert("游戏结束，您的分数为"+score+" !!!");  
    if(a){  
     delchild();
         }
}

//暂停函数
function pause(ev){

  if(status == 0) //暂停->开始
  {
      status = 1;   //游戏状态置位  开始
      console.log('游戏进行中')
      // 添加onclick事件
      $('main').addEventListener('click',mouse_click);
      $('pause').innerHTML="暂停游戏";
      timer = window.setInterval('move()', 30);

  }
  else if(status==1) //开始->暂停
  {
    status = 0;   //游戏状态置位 暂停
    console.log('游戏暂停中')
    // 添加onclick事件
    $('main').removeEventListener('click',mouse_click);
    $('pause').innerHTML="继续游戏";
    clearInterval(timer);

}
}

  // 创建div, className是其类名
function creatediv(className) {
      var div = document.createElement('div');
      div.className = className;
      return div;
  }

// 创建一个类名的数组，其中一个为cell black, 其余为cell
  function creatcell() {
      var temp = ['cell', 'cell', 'cell', 'cell', ];
      var i = Math.floor(Math.random() * 4); //随机产生黑块的位置 Math.random()函数参数 0~1的随机数
      temp[i] = 'cell black';
      return temp;
  }

  // 创造一个<div class="row">并且有四个子节点<div class="cell">
  function createrow() {
        var con = $('con');
        var row = creatediv('row'); //创建div className=row
        var arr = creatcell(); //定义div cell的类名,其中一个为cell black

        con.appendChild(row); // 添加row为con的子节点

        for (var i = 0; i < 4; i++) {
            row.appendChild(creatediv(arr[i])); //添加row的子节点 cell
        }

        if (con.firstChild == null) {
            con.appendChild(row);
        } else {
            con.insertBefore(row, con.firstChild);  //在con的第一个子节点插入row
        }
    }
    //删除某行
  function delrow() {
      var con = $('con');
      if (con.childNodes.length == 7) {
          con.removeChild(con.lastChild);
      }
  }

      //删除con所有节点
    function delchild() {
        var main = $('main');
        main.removeChild(main.firstChild);
        var div = document.createElement('div');
        div.className = 'con';
        div.id='con'
        main.appendChild(div)
        console.log(main)
    }


// 记分
function addscore() {
  score++;   //分数加1
  if(ischaoshen==0){
  $('score').innerHTML="分数："+score;   //更新界面分数
  }
  else if(ischaoshen==1){
    $('score').innerHTML="您已超神！ 分数："+score;   //更新界面分数
  }

  if (score % 10 == 0) {   //当分数是10 的倍数时使用加速函数，越来越快
      speedup();     //调用加速函数
  }
}

//加速函数
function speedup(){
  console.log("加速啦")
  speed += 1;
  if (speed ==10) {
    ischaoshen = 1;
  }
}
