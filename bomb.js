console.log("loaded!");
document.addEventListener("DOMContentLoaded", 
function(){


    //DOM References
    let body = document.querySelector("body");
    let wireBox = document.getElementById("wirebox");
    let resetBtn = document.getElementById("reset");
    let timer = document.getElementById("timer");

    //Game Logic Variables
    const STARTING_TIME = 30;
    let remainingTime = 0;
    let gameOver = false;
    let countdown = null; //will hold my countdown interval


    let wiresToCut = [];

    let wireState = {
        blue: false,
        green: false, 
        red: false, 
        white: false,
        yellow: false
    }

    //Event Listeners
    resetBtn.addEventListener("click", reset);
    wirebox.addEventListener("click", wireClick);

    //Reset function
    function reset(){
        console.log("Clicked reset");
        init();
    }

    //Define the initialization function
    function init(){
        remainingTime = STARTING_TIME;
        //loop over wires, set wires to cut
        for (const color in wireState){
            let randomNum = Math.random();
            if (randomNum > 0.5) {
                wiresToCut.push(color)
            }
        }
    //For debugging
    console.log(wiresToCut);
    countdown = setInterval(updateClock, 1000);
    resetBtn.disabled = true;

    }

    //Function for wires
    function wireClick(e){
        console.log("You clicked " + e.target.id);
        let color = e.target.id;
        //if the game is not over and the wire has not been cut
        if (gameOver === false && wireState[color] === false){
            e.target.src = "img/cut-" + color + "-wire.png";
            wireState[color] = true;
            let wireIndex = wiresToCut.indexOf(color);
            //if the wire has an index, it needs to be cut!
            if (wireIndex > -1){
                console.log("Correct!")
                wiresToCut.splice(wireIndex, 1);
                if (wiresToCut.length === 0){
                    endGame(true);
                }
            }else{
                console.log("Bad news bears!");
            }
        }
    }

    function updateClock() {
        remainingTime--;
        //remaining time = remainingTime - 1
        timer.textContent = "00:00:" + remainingTime;
        if (remainingTime <= 0){
            endGame(false)
        }
 
        function endGame(win){
            console.log("Win is " + win);

            clearInterval(countdown)
            gameOver = true;
            resetBtn.disabled = false;
            if (win) {
                timer.classList.add("green");
            }else{
                body.classList.add("flat");
            }
        }
    }

})
