const Player = function(mark, name) {
  return { mark, name };
};

function createElement(mark) {
  let element = document.createElement("p");
  element.innerText = mark;
  element.classList.add("input");
  return element;
}

const player1 = Player("O", "Player1");
const player2 = Player("X", "Player2");
const squares = document.querySelectorAll(".square");

const boradGame = {
  turn: 1,
  numMoves: 0,
  updateTurn: function() {
    if (this.turn === 1) this.turn = 2;
    else this.turn = 1;
  },
  allSquares: squares,
  scoreBoard: [],
  inhit: function (squares, player1, player2) {
    squares.forEach((square, index) => {
      square["taken"] = false;
      square["updateMark"] = function(mark) {
        this.appendChild(createElement(mark));
        this.taken = true;
        boradGame.updateTurn();
      };

      square.addEventListener("click", function addingClickEvents(event) {
        let element = document.createElement("p");
        element.classList.add("input");
        if (square.taken === false) {
          boradGame.numMoves++;
          if (boradGame.turn === 1) {
            square.updateMark(player1.mark);
            boradGame.updateScoreBoard(index, player1.mark);
          } else {
            square.updateMark(player2.mark);
            boradGame.updateScoreBoard(index, player2.mark);
          }
          boradGame.checkWinner();
        }
      });
    });
  },
  updateScoreBoard: function(index, mark) {
    this.scoreBoard[index] = mark;
    
  },
  checkWinner: function() {
    if (this.numMoves <= 9) {
      for (let i = 0; i < 7; i += 3) {
        if (
          this.scoreBoard[i] === this.scoreBoard[i + 1] &&
          this.scoreBoard[i] === this.scoreBoard[i + 2] &&
          this.scoreBoard[i] != undefined
        ) {
          return this.reuslt(this.scoreBoard[i], 1);
        }
      }
      for (let i = 0; i < 3; i++) {
        if (
          this.scoreBoard[i] === this.scoreBoard[i + 3] &&
          this.scoreBoard[i] === this.scoreBoard[i + 6] &&
          this.scoreBoard[i] != undefined
        ) {
          return this.reuslt(this.scoreBoard[i], 1);
        }
      }

      if (
        this.scoreBoard[0] === this.scoreBoard[4] &&
        this.scoreBoard[0] === this.scoreBoard[8] &&
        this.scoreBoard[0] != undefined
      ) {
        return this.reuslt(this.scoreBoard[4], 1);
      }

      if (
        this.scoreBoard[6] === this.scoreBoard[4] &&
        this.scoreBoard[6] === this.scoreBoard[2] &&
        this.scoreBoard[6] != undefined
      ) {
        return this.reuslt(this.scoreBoard[4], 1);
      }
      if(this.numMoves === 9)
      return this.reuslt(this.scoreBoard[0], 0);
    }
  },
  reuslt: function(mark, win) {
    if (win === 1) {
      winner = mark === player1.mark ? player1.name : player2.name;
      window.alert(`The winner is: ${winner}`);
     this.resetGame();
    } else {
      window.alert(`Tie`);
      this.resetGame();
    }
    
  },
  resetGame: function() {
 let temp = document.querySelectorAll('.input');
 temp.forEach(item => {
     item.parentNode.removeChild(item);
 })
 this.numMoves = 0;
 this.scoreBoard = [];
 newGame();
  },

  
};

boradGame.inhit(squares, player1, player2);
function newGame() {
    boradGame.inhit(squares, player1, player2);
}