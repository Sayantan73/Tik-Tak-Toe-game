const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
initGame()
function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // update on ui
    boxes.forEach((box, index)=> {
        box.textContent = "";
        boxes[index].style.pointerEvents = "all"
        // Reassign all css property to boxes
        box.classList = `box box${index + 1}`
    })
    newGameBtn.classList.remove("active")
    gameInfo.textContent = `Current Player - ${currentPlayer}`
}

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "0"
    }else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `Current Player ${currentPlayer}`
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position)=> {
        // all 3 boxes should be non empty and exactly same in value
        if (( gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && ( (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])  )) {
            console.log("we have a winner");
            
            // check for winner
            if (gameGrid[position[0]] === "X") {
                answer = "X"
            }else{
                answer = "0"
            }
            // disable pointerEvent
            boxes.forEach(box => box.style.pointerEvents = "none")

            // show green line
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }
        
    });
    // it means we have a winner
    if (answer !== "") {
        gameInfo.textContent = `Winner Player - ${answer}`
        newGameBtn.classList.add("active")
    }else{ 
        // let's check whether there is tie
        let fillCount = 0;
        gameGrid.forEach((box)=> {
            if (box != "") {
                fillCount++;
            }
        });
        // board is filled, game is tie
        if (fillCount === 9) {
            gameInfo.textContent = `Game Tied !`;
            newGameBtn.classList.add("active")
        }
    }


}

function handleClick(index) {
    if (gameGrid[index] == "") {
        gameGrid[index] = currentPlayer
        boxes[index].textContent = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        // swap player
        swapTurn();
        // check for win
        checkGameOver();
    }
}

boxes.forEach((box, index)=> {
    box.addEventListener("click",()=> {
        handleClick(index)
    })
})

newGameBtn.addEventListener("click", initGame);