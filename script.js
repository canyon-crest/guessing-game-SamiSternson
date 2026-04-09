let name=prompt("Please enter your name").toLowerCase();
name=name[0].toUpperCase()+name.slice(1)
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
    date.textContent=months[month]+" "+day+suffexs[day]+" "+year+" "+ hours+":"+minutes+":"+seconds;
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
playButton.addEventListener("click", Play)
guessButton.addEventListener("click", makeGuess)
giveUpButton.addEventListener("click", giveUp)
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
    }
    else if (Math.abs(answer-guess)>2)
    {
        warmth="warm"
    }
    else
    {
        warmth="hot"
    }
    if (guess==answer)
    {
        message.textContent="Good job "+name+"! You got it correct! It took "+guessCount+" tries. Play again?";
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
    scores.push(range)
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