var canvas = document.getElementById('game');
var context = canvas.getContext("2d");
var aster=[];
var timer=0;
var ship={x:300,y:300};
var fire=[];
var kill=0;
var health=0;
var m1=m2=m3=25;

var asterImg = new Image();
asterImg.src = "img/rock.png";
var fireImg = new Image();
fireImg.src = "img/attack1.png";
var healthImg = new Image();
healthImg.src = "img/health.png";
var starImg = new Image();
starImg.src = "img/star.png";

var shipImg = new Image();
var a = prompt("rocket", "1");
// var oneRocket=new Image();
// oneRocket.src = "img/roket1.png";
// var twoRocket=new Image();
// twoRocket.src = "img/roket2.png";
// var threeRocket=new Image();
// threeRocket.src = "img/roket3.png";
// var fourRocket=new Image();
// fourRocket.src = "img/roket4.png";
// context.drawImage(oneRocket, 0, 0, 50, 75);
// context.drawImage(twoRocket, 100, 0, 50, 75);
// context.drawImage(threeRocket, 0, 100, 50, 75);
// context.drawImage(fourRocket, 100, 100, 50, 75);

window.onload = function(){
	if (confirm("go play?")) {

	switch (a) {
	  case "1":
	    shipImg.src = "img/roket1.png";
	    break;
	  case "2":
	    shipImg.src = "img/roket2.png";
	    break;
	  case "3":
	    shipImg.src = "img/roket3.png";
	    break;
	    case "4":
	    shipImg.src = "img/roket4.png";
	    break;
	}
	game();
}
else
{
	alert("bye!");
	window.close();
}
	

}

function game() {

	update();
	render();
	requestAnimFrame(game);

}

function update() {
context.clearRect(0, 0, canvas.width, canvas.height);
timer++;

if (timer%10==0) {
	aster.push({
		x:Math.random()*600,
		y:-50,
		dx:Math.random()*2-1,
		dy:Math.random()*2+2,
		del:0
	});
}

if (timer%20==0 && kill<20) {
	fire.push({x:ship.x+10,y:ship.y,dx:0,dy:-10});
	//fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5});
	//fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5.2});
}
else if (timer%20==0 && kill>=20) {
	fireImg.src = "img/attack.png";
	fire.push({x:ship.x+10,y:ship.y,dx:0,dy:-5.2});
	fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5});
	fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5.2});
}

for (i in fire) {
	fire[i].x=fire[i].x+fire[i].dx;
	fire[i].y=fire[i].y+fire[i].dy;
	if (fire[i].y<-30) {
		fire.splice(i,1);
	}
}

canvas.addEventListener("mousemove", function(event) {
	ship.x=event.offsetX-25;
	ship.y=event.offsetY-10;
	
})

	for(i in aster)
	{
	aster[i].x+=aster[i].dx;
	aster[i].y+=aster[i].dy;

		if (aster[i].x>=750 ||aster[i].x<0) {
			aster[i].dx=-aster[i].dx;
		}

		if (aster[i].y>=600) {
			aster.splice(i,1);
		}
		for(j in fire)
		{
			if (Math.abs(aster[i].x+25-fire[j].x-10)<50 && Math.abs(aster[i].y-fire[j].y)<25) {
				aster[i].del=1;
				fire.splice(j,1);
				kill+=1;
				break;
			}
		}
		if (aster[i].del==1) 
		{
			aster.splice(i,1);
		}

		
		if (aster[i]!=undefined && ship!=undefined && Math.abs(aster[i].x-ship.x)<50 && Math.abs(aster[i].y-ship.y)<25) {
			
			health+=1;
			//написать три ифа для переменных m2 m1 m3, сделать счетчик и смерть
			if (health==1) {
				m3=0;
			}
			if (health==2) {
				m2=0;
			}
			aster.splice(i,1);
			if (health==3) {
				m1=0;
				health=0;
				var game = document.getElementById("game");
				game.style.display="none";
				alert("end!");

			}
		}



	}
}

function render() {

	context.drawImage(shipImg, ship.x, ship.y, 50, 75);
	context.drawImage(healthImg, 0,0, m1, m1);
	context.drawImage(healthImg, 15, 0, m2, m2);
	context.drawImage(healthImg, 30, 0, m3, m3);
	context.drawImage(starImg, 0,30, 20, 20);
	context.drawImage(starImg, 15, 30, 20, 20);
	context.drawImage(starImg, 30, 30, 20, 20);


	for (i in fire)
	{
	context.drawImage(fireImg, fire[i].x, fire[i].y, 30, 60);
	}

	for(i in aster)
	{
	context.drawImage(asterImg, aster[i].x, aster[i].y, 50, 50);
}
	
}

// function gameOver() {
// 	alert("game over");
// }
var requestAnimFrame = (function() {

	return window.requestAnimationFrame
	window.webkitRequestAnimationFrame
	window.oRequestAnimationFrame
	window.aster.msRequestAnimationFrame
	window.mozRequestAnimationFrame

})();