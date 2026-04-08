let name=prompt("Please enter your name");
let playbutton=document.getElementById("playBtn");
let guessbutton=document.getElementById("guessBtn");
let giveupbutton=document.getElementById("giveUpBtn");
let message=document.getElementById("msg");
let winMessage=document.getElementById("wins")
let avgMessage=document.getElementById("avgScore")
let guess=NaN;
let answer=NaN;
let guessCount=0;
let scores=[];
let range=0;
let warmth=""
function Play()
{
let levels=document.getElementsByName('level');
playbutton.disabled=true;

for (let i=0; i<levels.length;i++)
{
    if (levels[i].checked)
    {
        range=parseInt(levels[i].value)
    }
    levels[i].disabled=true;
}
message.textContent="Guess a number between 1 and "+range;
answer=Math.floor(Math.random() * range) + 1;
guessbutton.disabled=false;
giveupbutton.disable=false;
guesscount=0;
if (guess===answer)
{
    alert("hiii")
}
}
playbutton.addEventListener("click", Play)
guessbutton.addEventListener("click", makeGuess)
function makeGuess() {
guess=parseInt(document.getElementById("guess").value);
if (isNaN(guess)||guess<1||guess>range)
{
    message.textContent="Please pick a valid number"
    return;
}
guessCount++;
if (Math.abs(answer-guess)>range/3)
{
    warmth="cold"
}
else if (Math.abs(answer-guess)>range/4)
{
    warmth="warm"
}
else
{
    warmth="hot"
}
if (guess==answer)
{
    message.textContent="Correct! It took "+guessCount+" tries.";
    updateScore(guessCount);
    reset();
}
else if (guess<answer)
{
    message.textContent="Too low, try again. You are "+warmth+"." 
}
else{
    message.textContent="Too high, try again. You are "+warmth+"."
}
}
function updateScore(score){
    scores.push(score)
    winMessage.textContent="Total wins: "+scores.length
    avgMessage.textContent=avg(scores).toFixed(0)
    

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
function reset()
{
    
}