var ballX=50;
var ballSpeedX=12;
var ballY=50;
var ballSpeedY=4;
const START_HOR_SPEED=9;
const MAX_HOR_SPEED=15;
const MIN_VER_SPEED=4;
const MAX_VER_SPEED=8;
const NUM_POS_TO_SAVE=7;

var hitsTaken=0;
//setting up array that saves previous ball position for trail
var savedX=[];
var savedY=[];

function ballReset(){
	if(player1Score>=WINNING_SCORE || player2Score>=WINNING_SCORE){
		showingWinScreen=true;
	}
	ballSpeedY=Math.random()*(MAX_VER_SPEED-MIN_VER_SPEED)+MIN_VER_SPEED;
	if(Math.random()>0.5){
	ballSpeedY=-ballSpeedY;	
	}
	ballSpeedX=-ballSpeedX/Math.abs(ballSpeedX)*START_HOR_SPEED;
	ballX=canvas.width/2;
	ballY=canvas.height/2;
	//setting up start trail position on the ball
	for(var i=0; i<NUM_POS_TO_SAVE;i++){
		savedX[i]=ballX;
		savedY[i]=ballY;
	}
	hitsTaken=0;
}

function ballMove(){
		if(ballX<paddle1X+15)
			if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT && ballX>paddle1X-5){
				ballSpeedX=-ballSpeedX;
				var deltaY=ballY-(paddle1Y+PADDLE_HEIGHT/2);
				ballSpeedY=deltaY*0.35;
				hitsTaken++;
				if(hitsTaken==4){
					ballSpeedY=ballSpeedY*1.40;
					ballSpeedX=ballSpeedX*1.40;
				}
				if(hitsTaken==12){
					ballSpeedY=ballSpeedY*1.7;
					ballSpeedX=MAX_HOR_SPEED;
				}
			}
			else{
			//mora biti ispred reset-a da bismo mogli da postavimo win condition
				if(ballX<0){
					player2Score++;
					ballReset();
				}
			}
		if(ballX>paddle2X-15){
			if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT && ballX<paddle2X+5){
				ballSpeedX=-ballSpeedX;
				var deltaY=ballY-(paddle2Y+PADDLE_HEIGHT/2);
				ballSpeedY=deltaY*0.35;	
				hitsTaken++;
				if(hitsTaken==4){
					ballSpeedY=ballSpeedY*1.45;
					ballSpeedX=ballSpeedX*1.45;
				}
				if(hitsTaken==12){
					ballSpeedY=ballSpeedY*1.7;
					ballSpeedX=9;
				}
			}
			else{
				if(ballX>canvas.width-5){
					player1Score++;
					ballReset();
				}
			}
		}
		if(ballY<0)
			ballSpeedY=-ballSpeedY;
		
		if(ballY>canvas.height-5)
			ballSpeedY=-ballSpeedY;
		for(var i=NUM_POS_TO_SAVE-1; i>0; i--){
			savedX[i]=savedX[i-1];
			savedY[i]=savedY[i-1];		
		}
		savedX[0]=ballX;
		savedY[0]=ballY;
		ballX = ballX + ballSpeedX;
		ballY = ballY + ballSpeedY;

}

function ballDraw(){
	//drawing trail
	for(var i=0; i<NUM_POS_TO_SAVE; i++){
		var op=1.0-(i+3)/10.0;
		colorCircleTransparent(savedX[i],savedY[i],8-i,'255,255,255',op);
	}
	//drawing ball
	drawBitmapCentered(ballPic,ballX,ballY);
}