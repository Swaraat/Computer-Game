
let score = 0;
let cross = true;
let gameOver = false;//New Addition
// Initial delay and play background music
audiogo = new Audio('music/gameover.wav');
audio = new Audio('music/in-game-music.mp3');
let gameInterval;

//initial position of meu
const initialPositionElement = document.querySelector(".meu");
const intitialPosition = parseInt(window.getComputedStyle(initialPositionElement, null).getPropertyValue("left"));

// Game loop using setInterval for collision detection and scoring

const playGame = document.querySelector("#play");

playGame.addEventListener('click', () => {
    gameOver = false;
    score = 0;
    cross = true;
    updatescore(score);
    document.querySelector(".gameover").style.visibility = "hidden";
    initialPositionElement.style.left = intitialPosition + "px";
    audio.play();
    audiogo.pause();

    //Make play button invisible
    playGame.style.visibility = "hidden";

    //Add infinite animation of obstacle
    const enemy = document.querySelector(".obstacle");
    enemy.classList.add("obsticalhero");

    document.onkeydown = function (e) {

        if (gameOver) {
            clearInterval(gameInterval);
            return;
        }

        meu = document.querySelector(".meu");
        muex = parseInt(window.getComputedStyle(meu, null).getPropertyValue("left"));
        muetop = parseInt(window.getComputedStyle(meu, null).getPropertyValue("top"));


        if (e.keyCode == 38) {
            // Up arrow key
            meu.classList.add("animatemeu");

            setTimeout(() => {
                meu.classList.remove("animatemeu");
            }, 1000);
        }
        if (e.keyCode == 39) {
            // Right arrow key
            if ((muex + 90) < window.innerWidth - 90) {
                meu.style.left = muex + 90 + "px";
            }
        }
        if (e.keyCode == 37) {
            // Left arrow key
            if (muex - 90 > 0) {
                meu.style.left = (muex - 90) + "px";
            }
        }
    }

    gameInterval = setInterval(() => {

        if (gameOver) {
            clearInterval(gameInterval);
        }

        // Selecting necessary element
        meu = document.querySelector(".meu");
        gameoverDiv = document.querySelector(".gameover");
        obstacle = document.querySelector(".obstacle");

        // Getting positions of player character and obstacle

        let dx = parseInt(window.getComputedStyle(meu, null).getPropertyValue("left"));
        let dy = parseInt(window.getComputedStyle(meu, null).getPropertyValue("top"));
        console.log("Height of character: "+dy);
        let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
        let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));
        // console.log("Height of obstackle: "+oy);

        ofsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);
        
        // Collision detection

        if (ofsetX <= 40 && offsetY <= 40) {
            // Player character collided with the obstacle

            ox = dx + 40;
            document.querySelector(".obstacle").style.left = ox + "px";
            gameoverDiv.style.visibility = "visible";
            obstacle.classList.remove("obsticalhero");
            playGame.style.visibility = "visible";
            audio.pause();
            gameOver = true;//New Addition
            audiogo.play();
        }
        else if (ox <= 0 && cross) {
            // Player character successfully crossed the obstacle
            score = score + 1;
            updatescore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            // Adjusting obstacle animation duration for increased difficulty
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.010;
                obstacle.style.animationDuration = newDur + "s";
            }, 500)

        }
    }, 10);
})

// Function to update and display the score
function updatescore(score) {
    scorecount.innerHTML = "Your Score: " + score;
}
