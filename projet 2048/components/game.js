class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 4,
      gameBoard: new Array(4).fill(new Array(4).fill(0)),
      score: 0,
      gameState:
        "GOOD LUCK !!GOOD LUCK !!GOOD LUCK !!GOOD LUCK !!GOOD LUCK !!GOOD LUCK !!",
    };
  }

  updateScore = () => {

    const user = $("#user").text();
    $.ajax({
      url: "../../scripts/updateScore.php",
      type: "POST",
      data: {
        user: user,
        score: this.state.score,
      },
      cache: false,
      success: function (dataResult) {
        var dataResult = JSON.parse(dataResult);
        if (dataResult.statusCode == 200) {
          alert("Votre score a ete mis a jour dans notre base de donnee");
        } else if (dataResult.statusCode == 201) {
          alert("Error occured !");
        }
      },
    });

  };

  getEmptyBoard = (size) => {
    let x = [];
    let s = size - 0;

    for (let i = 0; i < s; i++) {
      x.push(new Array(s).fill(0));
    }

    return x;
  };

  handleSize = () => {
    let s = document.getElementById("customRange3").value;
    let pattern = new RegExp("[0-9]+");

    //expression reguliere nous assurant que le input est un entier
    if (pattern.test(s)) {
      let board = this.getEmptyBoard(s);
      this.setState({ size: s, gameBoard: board, score:0 });
    } else {
      s = "Entrer invalide. Veuillez entrer un entier";
      this.setState({ size: s });
    }
  };

  keyboardInput = (e) => {
    switch (e.key) {
      case "ArrowUp":
        this.up();
        break;
      case "ArrowDown":
        this.down();
        break;
      case "ArrowLeft":
        this.left();
        break;
      case "ArrowRight":
        this.right();
        break;
    }
  };

  up = () => {
    if (this.gameOver(this.state.gameBoard)) {
      const t =
        "GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST";
      this.setState({ gameState: t });
    } else {
      let board = this.boardUp(this.state.gameBoard);
      board = this.generateCell(board);
      //utiliser setState si il y a effectivement un changement
      if (!this.same(this.state.gameBoard, board)) {
        const score = this.state.score + 1;
        this.setState({ gameBoard: board, score: score });
      }

      if (this.victory(board)) {
        const t =
          "VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !!";
        this.setState({ gameState: t });
        this.updateScore();
      }
    }
  };

  boardUp = (board) => {
    board = this.compressUp(board);
    board = this.mergeUp(board);
    board = this.compressUp(board);
    return board;
  };

  compressUp = (board) => {
    const cleanBoard = this.getEmptyBoard(this.state.size);
    for (let i = 0; i < board.length; i++) {
      let colIndex = 0;
      for (let j = 0; j < board.length; j++) {
        if (board[j][i] !== 0) {
          cleanBoard[colIndex][i] = board[j][i];
          colIndex++;
        }
      }
    }

    return cleanBoard;
  };

  mergeUp = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length - 1; j++) {
        if (board[j][i] !== 0 && board[j][i] === board[j + 1][i]) {
          board[j][i] = board[j][i] * 2;
          board[j + 1][i] = 0;
        }
      }
    }
    return board;
  };

  down = () => {
    if (this.gameOver(this.state.gameBoard)) {
      const t =
        "GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST";
      this.setState({ gameState: t });
    } else {
      let board = this.boardDown(this.state.gameBoard);
      board = this.generateCell(board);
      //utiliser setState si il y a effectivement un changement
      if (!this.same(this.state.gameBoard, board)) {
        const score = this.state.score + 1;
        this.setState({ gameBoard: board, score: score });
      }
      if (this.victory(board)) {

        const t =
          "VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !!";
        this.setState({ gameState: t });
        this.updateScore();
      }
    }
  };

  boardDown = (board) => {
    board = this.compressDown(board);
    board = this.mergeDown(board);
    board = this.compressDown(board);
    return board;
  };

  compressDown = (board) => {
    const cleanBoard = this.getEmptyBoard(this.state.size);

    for (let i = 0; i < board.length; i++) {
      let colIndex = board.length - 1;
      for (let j = board.length - 1; j >= 0; j--) {
        if (board[j][i] !== 0) {
          cleanBoard[colIndex][i] = board[j][i];
          colIndex--;
        }
      }
    }

    return cleanBoard;
  };

  mergeDown = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = board.length - 1; j >= 1; j--) {
        if (board[j][i] !== 0 && board[j][i] === board[j - 1][i]) {
          board[j][i] = board[j][i] * 2;
          board[j - 1][i] = 0;
        }
      }
    }
    return board;
  };

  left = () => {
    if (this.gameOver(this.state.gameBoard)) {
      const t =
        "GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST";
      this.setState({ gameState: t });
    } else {
      let board = this.boardLeft(this.state.gameBoard);
      board = this.generateCell(board);
      //utiliser setState si il y a effectivement un changement
      if (!this.same(this.state.gameBoard, board)) {
        const score = this.state.score + 1;
        this.setState({ gameBoard: board, score: score });
      }
      if (this.victory(board)) {
        const t =
          "VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !!";
        this.setState({ gameState: t });
        this.updateScore();
      }
    }
  };

  boardLeft = (board) => {
    board = this.compressLeft(board);
    board = this.mergeLeft(board);
    board = this.compressLeft(board);
    return board;
  };

  compressLeft = (board) => {
    const cleanBoard = this.getEmptyBoard(this.state.size);
    for (let i = 0; i < board.length; i++) {
      let colIndex = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          cleanBoard[i][colIndex] = board[i][j];
          colIndex++;
        }
      }
    }
    return cleanBoard;
  };

  mergeLeft = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j + 1] = 0;
        }
      }
    }

    return board;
  };

  right = () => {
    if (this.gameOver(this.state.gameBoard)) {
      const t =
        "GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST";
      this.setState({ gameState: t });
    } else {
      let board = this.boardRight(this.state.gameBoard);
      board = this.generateCell(board);
      //utiliser setState si il y a effectivement un changement
      if (!this.same(this.state.gameBoard, board)) {
        const score = this.state.score + 1;
        this.setState({ gameBoard: board, score: score });
      }
      if (this.victory(board)) {
        const t =
          "VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !!";
        this.setState({ gameState: t });
        this.updateScore();
      }
    }
  };

  boardRight = (board) => {
    board = this.compressRight(board);
    board = this.mergeRight(board);
    board = this.compressRight(board);
    return board;
  };

  compressRight = (board) => {
    const cleanBoard = this.getEmptyBoard(this.state.size);
    for (let i = 0; i < board.length; i++) {
      let rowIndex = board[i].length - 1;
      for (let j = board[i].length - 1; j >= 0; j--) {
        if (board[i][j] !== 0) {
          cleanBoard[i][rowIndex] = board[i][j];
          rowIndex--;
        }
      }
    }

    return cleanBoard;
  };

  mergeRight = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = board.length - 1; j >= 0; j--) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j - 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j - 1] = 0;
        }
      }
    }

    return board;
  };

  //remplace une cellule de notre tableau ayant une valeur 0 avec une cellule de valeur 2 aleatoirement
  generateCell = (board) => {
    if (!this.hasValue(board, 0)) {
      return board;
    }
    // function pour generer un nombre aleatoire trouver sur https://www.joshwcomeau.com/snippets/javascript/random/
    //const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    // avec min= 0 et max =4
    let row = Math.floor(Math.random() * this.state.size);
    let col = Math.floor(Math.random() * this.state.size);

    // Si cette case a deja une valeur, alors generer une nouvelle case aleatoirement
    while (board[row][col] !== 0) {
      row = Math.floor(Math.random() * this.state.size);
      col = Math.floor(Math.random() * this.state.size);
    }

    board[row][col] = 2;

    return board;
  };

  //retourne vrai si la valeur est inclut dans le tableu
  hasValue = (board, value) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i].includes(value)) {
        return true;
      }
    }
    return false;
  };

  //retourne vrai si le joueur a gagne
  victory = (board) => {
    if (this.hasValue(board, 4)) {
      return true;
    } else {
      return false;
    }
  };

  //retourne vrai si le jeu est fini
  gameOver = (board) => {
    // si le tableau ,apres une action, nest pas le meme alors le jeu nest pas fini
    if (this.hasValue(board, 0)) {
      return false;
    } else {
      if (!this.same(board, this.boardUp(board))) {
        return false;
      } else if (!this.same(board, this.boardDown(board))) {
        return false;
      } else if (!this.same(board, this.boardLeft(board))) {
        return false;
      } else if (!this.same(board, this.boardRight(board))) {
        return false;
      } else {
        return true;
      }
    }
  };

  same = (board1, board2) => {
    for (let i = 0; i < board1.length; i++) {
      for (let j = 0; j < board1[i].length; j++) {
        if (board1[i][j] !== board2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  componentWillMount() {
    window.addEventListener("keydown", this.keyboardInput);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyboardInput);
  }

  selectState = () => {
    const w =
      "VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !! VICTORY !! YOU WON !!";
    const l =
      "GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST !! GAME OVER !! YOU LOST";
    if (this.state.gameState === w) {
      return "row alert alert-success";
    } else if (this.state.gameState === l) {
      return "row alert alert-danger";
    } else {
      return "row alert alert-primary";
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={this.selectState()}>{this.state.gameState}</div>


        <button type="button" class="btn btn-success">
          Meilleur score <span id="data" class="badge bg-secondary">0</span>
        </button>

        <button type="button" class="btn btn-primary">
          Votre score <span class="badge bg-secondary">{this.state.score}</span>
        </button>
        <div
          className="container border border-4 border-dark bg-dark"
          id="game">
          <ToolBar onSize={this.handleSize} selection={this.state.size} />
          <GameBoard key="1" gameBoard={this.state.gameBoard} />
        </div>
      </React.Fragment>
    );
  }
}
