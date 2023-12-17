let tiles = document.querySelectorAll(".tile");

let turn = "X";
let isGameOver = false;

let player1Score = 0;
let player2Score = 0;

document.getElementById("player1-score").innerText = "Player 1";
document.getElementById("player2-score").innerText = "Player 2";

document.querySelector("#submit-btn").addEventListener("click", () => {
  const player1Value = document.getElementById("input1").value;
  const player2Value = document.getElementById("input2").value;

  if (
    player1Value.trim() !== "" &&
    player2Value.trim() !== "" &&
    player1Value.trim() === player2Value.trim()
  ) {
    Swal.fire({
      icon: "error",
      title: "same names!",
      text: "The players selected same names, please change the names",
    });
    return;
  } else if (player1Value.trim() === "" || player2Value.trim() === "") {
    Swal.fire("Please enter both player names before starting the game");
    return;
  }

  document.getElementById(
    "player1-score"
  ).innerText = `${player1Value} (${player1Score})`;
  document.getElementById(
    "player2-score"
  ).innerText = `${player2Value} (${player2Score})`;
});

tiles.forEach((element) => {
  element.innerHTML = "";
  element.addEventListener("click", () => {
    const player1Value = document.getElementById("input1").value;
    const player2Value = document.getElementById("input2").value;

    if (player1Value.trim() === "" || player2Value.trim() === "") {
      Swal.fire("Please enter both player names before starting the game");
      return;
    }

    if (!isGameOver && element.innerHTML === "") {
      element.innerHTML = turn;
      cheakWin();
      cheakDraw();
      changeTurn();
    }
  });
});

function changeTurn() {
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }

  if (turn === "X") {
    document.getElementById("player1-score").style.backgroundColor = "green";
    document.getElementById("player2-score").style.backgroundColor = "#b35047";
  } else {
    document.getElementById("player1-score").style.backgroundColor = "#b35047";
    document.getElementById("player2-score").style.backgroundColor = "green";
  }
}

function cheakWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = tiles[winConditions[i][0]].innerHTML;
    let v1 = tiles[winConditions[i][1]].innerHTML;
    let v2 = tiles[winConditions[i][2]].innerHTML;

    if (v0 !== "" && v0 === v1 && v0 === v2) {
      isGameOver = true;
      if (turn === "X") {
        player1Score++;
        document.getElementById("player1-score").innerText = `${
          document.getElementById("input1").value
        }  ${player1Score}`;
      } else {
        player2Score++;
        document.getElementById("player2-score").innerText = `${
          document.getElementById("input2").value
        } ${player2Score}`;
      }

      Swal.fire({
        title: "Congratulations!",
        text: `The winner is: ${turn}`,
        imageUrl: "congredulation img.jpg",
        imageWidth: 500,
        imageHeight: 300,
        imageAlt: "congredulation image",
      });
    }
  }
}

function cheakDraw() {
  if (!isGameOver) {
    let isDraw = true;
    tiles.forEach((element) => {
      if (element.innerHTML === "") isDraw = false;
    });

    if (isDraw) {
      isGameOver = true;
      document.querySelector("#reset-btn").style.display = "inline";
    }
  }
}

document.querySelector("#reset-btn").addEventListener("click", () => {
  isGameOver = false;
  turn = "X";
  document.querySelector("#reset-btn").style.display = "inline";

  tiles.forEach((element) => {
    element.innerHTML = "";
  });
});
