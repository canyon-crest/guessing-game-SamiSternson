let name=""
while (name==""){
    name=prompt("Please enter your name")
    if (name!="")
    {
    name=name.toLowerCase();
    name=name[0].toUpperCase()+name.slice(1)
    }
}
let current_red=243;
let current_green=232;
let current_blue=144;
let playButton=document.getElementById("playBtn");
let guessButton=document.getElementById("guessBtn");
let giveUpButton=document.getElementById("giveUpBtn");
let message=document.getElementById("msg");
let winMessage=document.getElementById("wins")
let avgMessage=document.getElementById("avgScore")
let guessMesage=document.getElementById("guess")
let avgTimeMessage=document.getElementById("avgTime")
let fastestTimeMessage=document.getElementById("fastest")
let date=document.getElementById("date");
let guess=NaN;
let answer=NaN;
let guessCount=0;
let scores=[];
let times=[]
let range=0;
let warmth=""
let startTime=0;
timeUpdater()
let timeUpdate=setInterval(timeUpdater, 1000);
function timeUpdater()
{
    let dateObject= new Date()
    let day= dateObject.getDate()
    let month= dateObject.getMonth()
    let year =dateObject.getFullYear()
    let hours= dateObject.getHours()
    let minutes=dateObject.getMinutes()
    let seconds=dateObject.getSeconds()
    let months=["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December" ]
    let suffexs =["st", "nd", 'rd', "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"]
    date.textContent=months[month]+" "+day+suffexs[day]+" "+year+" "+ String(hours).padStart(2, '0')+":"+String(minutes).padStart(2, '0')+":"+String(seconds).padStart(2, '0');
}
function updateScore(score){
    scores.push(score)
    times.push((new Date().getTime()-startTime)/1000)

    winMessage.textContent="Total wins: "+scores.length
    avgMessage.textContent="Average Score: "+avg(scores).toFixed(1)
    scores.sort(function(a,b){return a-b;});
    times.sort(function(a,b){return a-b;});
    let lb=document.getElementsByName("leaderboard")
    for (let i=0; i<lb.length; i++)
    {
        if (i<scores.length)
        {
            lb[i].textContent=scores[i];
        }
    }
    fastestTimeMessage.textContent="Fastest Game: "+times[0].toFixed(3)+" seconds."
    avgTimeMessage.textContent="Average Time: "+avg(times).toFixed(3)+ " seconds."


}
function avg(data)
{
    let average=0;
    for (let i=0; i<data.length; i++)
    {
        average+=data[i];
    }
    return average/data.length;
}
function resetGame()
{
    guessCount=0;
    guessButton.disabled=true;
    giveUpButton.disabled=true;
    guessMesage.value="";
    let levels=document.getElementsByName('level');
    for (let i=0; i<levels.length;i++)
    {
        levels[i].disabled=false;
    }
    playButton.disabled=false;
    
}
function Play()
{
    document.body.style.backgroundColor="rgb(243, 232, 144)";
    let levels=document.getElementsByName('level');
    startTime=new Date().getTime()
    playButton.disabled=true;

    for (let i=0; i<levels.length;i++)
    {
        if (levels[i].checked)
        {
            range=parseInt(levels[i].value)
        }
        levels[i].disabled=true;
    }
    message.textContent=name+", Guess a number between 1 and "+range;
    answer=Math.floor(Math.random() * range) + 1;
    guessButton.disabled=false;
    giveUpButton.disabled=false;
    guesscount=0;
}

function makeGuess() {
    guess=parseInt(document.getElementById("guess").value);
    if (isNaN(guess)||guess<1||guess>range)
    {
        message.textContent="Please pick a valid number"
        return;
    }
    guessCount++;
    if (Math.abs(answer-guess)>5)
    {
        warmth="cold"
        current_red+=40;
        current_blue-=10;
        current_green-=40;
        document.body.style.backgroundColor=`rgb(${current_red}, ${current_green}, ${current_blue})`;
    }
    else if (Math.abs(answer-guess)>2)
    {
        warmth="warm"
        current_red-=40;
        current_blue-=10;
        current_green+=40;
        document.body.style.backgroundColor=`rgb(${current_red}, ${current_green}, ${current_blue})`;
    }
    else
    {
        current_red-=80;
        current_blue-=10;
        current_green+=80;
        document.body.style.backgroundColor=`rgb(${current_red}, ${current_green}, ${current_blue})`;
        warmth="hot"
    }
    if (guess==answer)
    {
        message.textContent="Good job "+name+"! You got it correct! It took "+guessCount+" tries. Play again?";
        document.body.style.backgroundColor="rgb(59, 208, 59)";
        updateScore(guessCount);
        resetGame();
    }
    else if (guess<answer)
    {
        message.textContent="Too low, try again. You are "+warmth+"." 
    }
    else{
        message.textContent="Too high, try again. You are "+warmth+"."
    }
}
function giveUp()
{
    document.body.style.backgroundColor="rgb(172, 48, 48)";
    scores.push(range);
    message.textContent=name+", you gave up :(  Play Again?"
    winMessage.textContent="Total wins: "+scores.length
    avgMessage.textContent="Average Score: "+avg(scores).toFixed(1)
    scores.sort(function(a,b){return a-b;});
    let lb=document.getElementsByName("leaderboard")
    for (let i=0; i<lb.length; i++)
    {
        if (i<scores.length)
        {
            lb[i].textContent=scores[i];
        }
    }
    resetGame();
}
playButton.addEventListener("click", Play)
guessButton.addEventListener("click", makeGuess)
giveUpButton.addEventListener("click", giveUp)
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && playButton.disabled) {
    makeGuess()
  }
  else if (event.key==="p" && !playButton.disabled)
    {
        Play()
    }
else if (event.key=="g" && playButton.disabled)
{
    giveUp()
}
  
});