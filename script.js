const screen = document.getElementById("screen");
const context = screen.getContext('2d');
const currentPlayer = "jogador1"


function createGame() {
  const state = {
    jogadores: {
      'jogador1': { x: 1, y: 1 },
      'jogador2': { x: 9, y: 9 }
    },

    frutas: {
      'fruta': { x: 5, y: 5 }
    }
  }

  function movePlayer(command) {
    console.log(`movend ${command.jogadorId} with ${command.keypress}`);

    const acceptedMuves = {
      ArrowUp(player) {
        console.log("Movel para cima")
        return player['jogador1'].y--;
      },
      ArrowDown(player) {
        console.log("Movel para baixo")
        return player['jogador1'].y++;
      },
      ArrowRight(player) {
        console.log("Movel para Direita")
        return player['jogador1'].x++;
      },
      ArrowLeft(player) {
        console.log("Movel para esquerda")
        return player['jogador1'].x--;
      },
    }
    const keypressed = command.keypress
    const player = game.state.jogadores
    const moveFunction = acceptedMuves[keypressed];
    if (moveFunction) {
      moveFunction(player)
    }

    console.log(player['jogador1']);
    const barUp = player['jogador1'].y >= screen.height - 1;
    const barDown = player['jogador1'].y <= -1;
    const barRight = player['jogador1'].x >= screen.width - 1;
    const barLeft = player['jogador1'].x <= -1;

    if (barUp)
      player['jogador1'].y = screen.height - 1;
    if (barDown)
      player['jogador1'].y = 0;
    if (barRight)
      player['jogador1'].x = screen.width - 1;
    if (barLeft)
      player['jogador1'].x = 0;
  }

  return {
    movePlayer,
    state
  }
}

const game = createGame();
const keyBoardListener = createkeyboardListener();
keyBoardListener.subscribe(game.movePlayer);

function createkeyboardListener() {
  // Observers
  const state = {
    observer: []
  }
  function subscribe(observerFunction) {
    state.observer.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(`Notifying ${state.observer.length} observers`);

    for (const observerFunction of state.observer) {
      observerFunction(command);
    }
  }


  document.addEventListener("keydown", inputsBoard)
  function inputsBoard(event) {
    const keypress = event.key;

    const command = {
      jogadorId: "jogador1",
      keypress
    }
    notifyAll(command);

  }
  return { subscribe }
}


renderizar()
function renderizar() {
  context.fillStyle = "white";
  context.clearRect(0, 0, 10, 10)

  for (const jogadorId in game.state.jogadores) {
    const jogador = game.state.jogadores[jogadorId];
    context.fillStyle = "black";
    context.fillRect(jogador.x, jogador.y, 1, 1);
  }

  for (const frutaId in game.state.frutas) {
    const fruta = game.state.frutas[frutaId];
    context.fillStyle = "green";
    context.fillRect(fruta.x, fruta.y, 1, 1);
  }

  requestAnimationFrame(renderizar)
}    