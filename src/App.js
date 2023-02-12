//Importación que permite agregar el estado de reacción a los componentes de la función.
//useState es el que realiza la unió

import { useState } from 'react';

//Funcion para crear los cuadrados del tablero.
function Square({ value, onSquareClick }) {
  //devuelve como un valor  que llama a la función
  return (
    //crea un boton que nos ayuda a interpretar un cuadrado.
    //className="square"es una propiedad o accesorio de botón que le dice a CSS cómo diseñar el botón.
    //Evento onclick detecta cada vez que damos un click sobre la forma
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
    //.square define el estilo de cualquier componente donde la className propiedad esté establecida en square. 
  );
}
//función que nos ayuda a juntar y separar los cuadrados en forma de tablero.
function Board({ xIsNext, squares, onPlay }) {
  //funcion que nos ayuda a ver que cual es el cuadrado en donde hay cambios o pulsaciones (Actualizació en el tablero)
  function handleClick(i) {
    //condicional que nos ayuda a ver cual jugador es el ganador, el último en colocar su valor.
    if (calculateWinner(squares) || squares[i]) {
      //regresa un valor de cambio por cuadrados
      return;
    }
    //variable que nos ayuda a cambiar de lugar en las posiciones de movidas
    const nextSquares = squares.slice(); //slice() método  Array de JavaScript
    //condicional que nos indica que inicia con x pero después del turno lo cambie con una o
    if (xIsNext) { //xIsNext(un valor booleano) 
      // Inicia con una X  y el lugar lo reemplaza por la X
      nextSquares[i] = 'X';
      //toma el índice del cuadrado que debe actualizarse y lo cambia
    } else {
      //Si el valor anterior colocado es X el siguiente en pulsar colocara un O
      nextSquares[i] = 'O';
      //toma el índice del cuadrado que debe actualizarse y lo cambia
    }
    //Mientras no tenga un ganador tendra una llamada el juego a siguiente jugador.
    onPlay(nextSquares);
  }
// calculateWinner toma una matriz de 9 cuadrados, busca un ganador y devuelve 'X', 'O'o null según corresponda. 
  const winner = calculateWinner(squares);
  //variable que guarda el estatus de la partida
  let status;
  //condicionales que nos muetran quien es el ganador 
  if (winner) {
    //el estatus guarda el mensaje de ganador y el valor de X o O según el resultado de la partida
    status = 'Winner: ' + winner;
  } else {
    //si no el estatus muestra el siguiente jugador que va a continuar su valor
    //x?O  valor de eleccion a asignar despues de cada ronda (llama la funcion de cambio)
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    //asignación de código html mediante react 
    <>
    {/*Divisiones de espacios con cambios */}
      <div className="status">{status}</div>
      {/*Divisiones de espacios con cambios */}
      <div className="board-row">
        {/*Asignamos los valores de cada fila (fila 1)*/}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        {/*el valor puede cambiar al hacer un click en cualquier cuadro que activa el evento de status de cambio*/}
      </div>
      <div className="board-row">
        {/*Divisiones de espacios con cambios (fila 2)*/}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        {/*el valor puede cambiar al hacer un click en cualquier cuadro que activa el evento de status de cambio*/}
      </div>
      <div className="board-row">
        {/*Divisiones de espacios con cambios (fila 3)*/}
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        {/*el valor puede cambiar al hacer un click en cualquier cuadro que activa el evento de status de cambio*/}
      </div>
    </>
  );
}
// Game componente para rastrear qué jugador es el siguiente y el historial de movimientos
export default function Game() {
  //creación de variables y le asignamos el estado de cada cuadrado
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  //variable que revisa los movimientos
  const xIsNext = currentMove % 2 === 0;
  //guarda los movimientos en una lista en forma de historial
  const currentSquares = history[currentMove];
  //handlePlay función dentro del Game componente que llamará el Board componente para actualizar el juego.
  function handlePlay(nextSquares) {
    //variable que guarda la lista y los cambios 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    //obtención de los valores del historial
    setHistory(nextHistory);
  // obtención de los movimientos  y actualizarlos
    setCurrentMove(nextHistory.length - 1);
  }
//función que verifica los saltos del siguiente movimiento (número)
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
//Utilizará mappara transformar sus historymovimientos en elementos React que representan botones en la pantalla, 
//y mostrará una lista de botones para "saltar" a movimientos anteriores.
  const moves = history.map((squares, move) => {
    //creación de una variable
    let description;
    //mensaje de salida cuando el movimiento es mayor (usuario realiza un movimiento muestra el número de movimiento)
    if (move > 0) {
      //mensaje de salida
      description = 'Go to move #' + move;
    } else {
      //si el jugador no ha echo ningún movimiento muestra solo el mensaje inicial
      description = 'Go to game start';
    }
    return (
      //llave de activación cuando se realiza un cambio de movimiento 
      <li key={move}>
        {/*evento de click que nos ayuda a ver el n[umero de cambios o saltos y muestra el mensaje de salida */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//una función auxiliar llamada calculateWinner que toma una matriz de 9 cuadrados, 
//busca un ganador y devuelve 'X', 'O'o null
function calculateWinner(squares) {
  //matriz a trabajar 
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //ciclo que recorre las filas y columnas de nuestra matriz 3x3
  for (let i = 0; i < lines.length; i++) {
    //asigna a cada posicion una variable.
    const [a, b, c] = lines[i];
    //varifica que si una fila es completa de los mismo valores se asigna un ganador
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //regresa el valor asignado a ganar y lo manda a la función para mostrar el X o O ganador 
      return squares[a];
    }
  }
  //si no hay un ganador manda un null para que el juego siga
  return null;
}
