//初始化
var btn=document.getElementsByTagName("button")[0]; //button
var time=document.getElementById("time"); //找到時間
var combo=document.getElementById("combo"); //找到分數
var animal=document.getElementsByClassName("cell");
var flag=0; //判別遊戲狀況 停止 0 遊戲中 1
var sec=0,count=0;
var beYellow=new Array(); //到時候會存放所有 red 事件的轉黃定時器，陣列有 100 個位置
btn.addEventListener("click",gamestart); //規劃點選動作
