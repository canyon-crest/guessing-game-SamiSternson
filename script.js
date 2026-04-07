let name=prompt("Please enter your name");
let playbutton=document.getElementById("playBtn");
let guessbutton=document.getElementById("guessBtn");
let giveupbutton=document.getElementById("giveUpBtn");
let message=document.getElementById("msg");
let guess=NaN;
let answer=NaN;
let guessCount=0;
let winCount=0;
let scores=[];
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
}
playbutton.addEventListener("click", Play)
// guessbuttom.addEventListener("click", function() {
// guess=parseInt(document.getElementById("guess").value);
// })