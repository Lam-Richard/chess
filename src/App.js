import React, { useEffect, useState, useContext, createContext} from 'react';
import "./App.css";

function importAll(r) {
  let images = {};
   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
}
const images = importAll(require.context('./chess-pictures', false, /\.(png|jpe?g|svg)$/));

const Square = ( { isWhite, isHighlighted, position, piece } ) => { 

  const SquareContext = useContext(AppContext);
  
  function checkSquare() {

    // If the square contains the current player's piece, check the selected moves.

    // If the square contains the opponent player's piece, follow capture protocol.

    // If the square is empty:
    // -- If the selected piece is the current player's pawn and en-passent is possible, follow that protocol/
    // -- Else, simply move the selected piece and switch the current player.

    if (SquareContext.lastMoved == null) {
      if (piece == null) {
        if (SquareContext.selectedPiece != null && SquareContext.highlightState[position[0]][position[1]] == true) {
          SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece, true);
        } else {
          // Nothing Happens
        }
      } else {
        // I clicked on one of my own pieces...!
        if (piece.pieceColor == "white") {
          // console.log(`There is a ${piece.pieceColor} ${piece.pieceType} at (${piece.row}, ${piece.column})`)
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          if (SquareContext.selectedPiece == null || (SquareContext.selectedPiece != null && piece != SquareContext.selectedPiece)) {
            SquareContext.setSelectedPiece(piece);
          } else {
            SquareContext.setSelectedPiece(null);
          }
        } else if (SquareContext.highlightState[position[0]][position[1]] == true) {
          // I clicked on a black piece (we know it's not null) and it's selectable
          SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece, true);
        } else {
          // Nothing Happens
        }
      }      
    } else {
      if (piece == null) {
        if (SquareContext.selectedPiece != null && SquareContext.highlightState[position[0]][position[1]] == true) {
          SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece, true);
        } else {
          // Nothing Happens
        }
      } else {
        // I clicked on one of my own pieces...!
        if (piece.pieceColor != SquareContext.boardState[SquareContext.lastMoved[0]][SquareContext.lastMoved[1]].pieceColor) {
          // console.log(`There is a ${piece.pieceColor} ${piece.pieceType} at (${piece.row}, ${piece.column})`)
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          if (SquareContext.selectedPiece == null || (SquareContext.selectedPiece != null && piece != SquareContext.selectedPiece)) {
            SquareContext.setSelectedPiece(piece);
          } else {
            SquareContext.setSelectedPiece(null);
          }
        } else if (SquareContext.highlightState[position[0]][position[1]] == true) {
          // I clicked on a black piece (we know it's not null) and it's selectable
          SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece, true);
        } else {
          // Nothing Happens
        }
      }      
    }
  }

  function promotePiece(newPiece) {
    console.log("Piece");

    switch (newPiece) {
      case 1:
        SquareContext.boardState[position[0]][position[1]]['sprite'] = `${piece['pieceColor']}Queen.jpg`;
        SquareContext.boardState[position[0]][position[1]]['pieceType'] = 'Queen';
        // SquareContext.boardState[position[0]][position[1]]['pieceColor'] = piece['pieceColor'];

        break;
      case 2:
        SquareContext.boardState[position[0]][position[1]]['sprite'] = `${piece['pieceColor']}Rook.jpg`;
        SquareContext.boardState[position[0]][position[1]]['pieceType'] = 'Rook';
        break;
      case 3:
        SquareContext.boardState[position[0]][position[1]]['sprite'] = `${piece['pieceColor']}Bishop.jpg`;
        SquareContext.boardState[position[0]][position[1]]['pieceType'] = 'Bishop';
        break;
      case 4:
        SquareContext.boardState[position[0]][position[1]]['sprite'] = `${piece['pieceColor']}Knight.jpg`;
        SquareContext.boardState[position[0]][position[1]]['pieceType'] = 'Knight';
        break;
    }


    SquareContext.setIsPiecePromoting(false);
    console.log("Board State NOW: ", SquareContext.boardState);


  }

  // So right now I need to make a thing if the Square's position is 0 or 7.
  return (
    (position[0] == 0 || position[0] == 7) && piece != null && piece['sprite'] == `${piece['pieceColor']}Pawn.jpg` ? 
    <div className={isWhite ? "Square" : "Square Black"}>
      {/* {isHighlighted == true ? <div className="highlight"></div> : null}
      {piece != null ? <img src={images[piece['sprite']]}/> :  null} */}
        <div className={`promoteFloat ${piece['pieceColor']}Promote`}>
          <div className="Square"><img className="promoteImage" onClick={() => promotePiece(1)} src={images[`${piece['pieceColor']}Queen.jpg`]}/></div>
          <div className="Square"><img className="promoteImage" onClick={() => promotePiece(2)} src={images[`${piece['pieceColor']}Rook.jpg`]}/></div>
          <div className="Square"><img className="promoteImage" onClick={() => promotePiece(3)} src={images[`${piece['pieceColor']}Bishop.jpg`]}/></div>
          <div className="Square"><img className="promoteImage" onClick={() => promotePiece(4)} src={images[`${piece['pieceColor']}Knight.jpg`]}/></div>
        </div>
    </div>  
    : 
    <div className={isWhite ? "Square" : "Square Black"} onClick={() => checkSquare()}>
      {isHighlighted == true ? <div className="highlight"></div> : null}
      {piece != null ? <img src={images[piece['sprite']]}/> :  null}
    </div>
  )
}

const AppContext = createContext();

function App() {
  const [boardState, setBoardState] = useState(null);
  const [highlightState, setHighlightState] = useState([...Array(8)].map(e => Array(8).fill(false)));
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [lastMoved, setLastMoved] = useState(null);
  const [isPiecePromoting, setIsPiecePromoting] = useState(false);
  const [kingInCheck, setKingInCheck] = useState(false);

  function isOnBoard(position) {
    return (position[0] >= 0 && position[0] <= 7) && (position[1] >= 0 && position[1] <= 7);
  }


  function isEmptySquare(rowColumn, board) {
    // console.log("boardState for empty calculation: ", boardState)
    // console.log("This is row column: ", rowColumn);
    return board[rowColumn[0]][rowColumn[1]] == null;
  }

  function isOwnPiece(rowColumn, board, selfColor) {
    return !isEmptySquare(rowColumn, board) && !isEnemyPiece(rowColumn, board, selfColor);
  }

  function isEnemyPiece(rowColumn, board, selfColor) {
    // console.log("Value: ",)
    // console.log("Test: ", boardState[rowColumn[0]][rowColumn[1]]);
    return !isEmptySquare(rowColumn, board) && board[rowColumn[0]][rowColumn[1]].pieceColor != selfColor
  }

  function arrayContains(bigArray, element) {
    return JSON.stringify(bigArray).indexOf(JSON.stringify(element)) != -1;
  }

  function isKingInCheck(kingColor, board) {
    console.log("Given Argument: ", kingColor);
    if (kingColor == "white") {
      let King = getWhitePieces(board).filter(piece => piece.pieceType == "King")[0];
      console.log("King in Question: ", King);
      return isSquareControlled([King.row, King.column], kingColor, board);
    } else {
      let King = getBlackPieces(board).filter(piece => piece.pieceType == "King")[0];
      console.log("King in Question: ", King);
      return isSquareControlled([King.row, King.column], kingColor, board);
    }
  }

  function moveToSquare(to, board, selectedPiece, shouldUpdateMove) {
    // Check if there's en-passent related clean up to do...! 

    let fromRow = selectedPiece.row;
    let fromColumn = selectedPiece.column;

    // In En Passant:
    // The moving piece is a pawn moving diagonally, but there is no piece on the to
  

    let isPawn = selectedPiece.pieceType == "Pawn";
    let isDiagonal = Math.abs(fromColumn - to[1]) != 0;
    let toIsEmpty = board[to[0]][to[1]] == null;




    // EnPassant!
    if (isPawn && isDiagonal && toIsEmpty) {
      if (selectedPiece.pieceColor == "white") {
        board[to[0] + 1][to[1]] = null;
      } else {
        board[to[0] - 1][to[1]] = null;
      }
    }

    let isKing = selectedPiece.pieceType == "King";
    let isQueenSide = (fromColumn - to[1] == 2);
    let isKingSide = (to[1] - fromColumn == 2);
    

    board[to[0]][to[1]] = structuredClone(selectedPiece);
    board[to[0]][to[1]].row = to[0];
    board[to[0]][to[1]].column = to[1];
    board[to[0]][to[1]].movesTaken += 1;
    // console.log("Moves Taken: ", board[to[0]][to[1]].movesTaken);

    if (isKing) {
      if (isQueenSide) {
        board[to[0]][to[1] + 1] = structuredClone(board[to[0]][0]);
        board[to[0]][to[1] + 1].row = to[0];
        board[to[0]][to[1] + 1].column = to[1] - 1;
        board[to[0]][to[1] + 1].movesTaken += 1;
        board[to[0]][0] = null;
      } else if (isKingSide) {
        board[to[0]][to[1] - 1] = structuredClone(board[to[0]][0]);
        board[to[0]][to[1] - 1].row = to[0];
        board[to[0]][to[1] - 1].column = to[1] - 1;
        board[to[0]][to[1] - 1].movesTaken += 1;
        board[to[0]][7] = null;
      }
    }

    


    // Need a more elaborate system for castling, but undo is a later feature...!

    board[fromRow][fromColumn] = null;


    if (shouldUpdateMove) {
      setLastMoved([to[0], to[1]]); 
      nextTurn();
    }
  }



  function isSquareControlled(position, movingPieceColor, board) {
    // console.log(`Checking if the ${movingPieceColor} King on ${position} is in check...!`)
    if (movingPieceColor == "white") {
      let pieces = getBlackPieces(board);
      for (let blackPiece of pieces) {
        switch(blackPiece['pieceType']) {
          case "King":
            if (arrayContains(validNonCastleMoves([blackPiece.row, blackPiece.column], board), position)) {
              return true;
            }
            break;
          case "Queen":
            if (arrayContains(validQueenMoves([blackPiece.row, blackPiece.column], board), position)) {
              return true;
            }
            break;
          case "Rook":
            if (arrayContains(validRookMoves([blackPiece.row, blackPiece.column], board), position)) {
             return true;
            }
            break;
          case "Bishop":
            if (arrayContains(validBishopMoves([blackPiece.row, blackPiece.column], board), position)) {
              return true;
            }
            break;
          case "Knight":
            if (arrayContains(validKnightMoves([blackPiece.row, blackPiece.column], board), position)) {
              return true;
            }
            break;
          case "Pawn":
            if (arrayContains(validPawnCaptures(blackPiece, board), position)) {
              return true;
            }
            break;
        }
      }
        
    } else {
      let pieces = getWhitePieces(board);
      for (let whitePiece of pieces) {
        switch(whitePiece['pieceType']) {
          case "King":
            if (arrayContains(validKingMoves([whitePiece.row, whitePiece.column], board), position)) {
              return true;
            }
            break;
          case "Queen":
            if (arrayContains(validQueenMoves([whitePiece.row, whitePiece.column], board), position)) {
              return true;
            }
            break;
          case "Rook":
            if (arrayContains(validRookMoves([whitePiece.row, whitePiece.column], board), position)) {
             return true;
            }
            break;
          case "Bishop":
            if (arrayContains(validBishopMoves([whitePiece.row, whitePiece.column], board), position)) {
              return true;
            }
            break;
          case "Knight":
            if (arrayContains(validKnightMoves([whitePiece.row, whitePiece.column], board), position)) {
              return true;
            }
            break;
          case "Pawn":
            // EnPassant edge case? Unlikely given this function's use case
            if (arrayContains(validPawnCaptures(whitePiece, board), position)) {
              return true;
            }
            break;
        }
      }
    }

    return false;
  }

  function getBlackPieces(board) {
    let blackPieces = [];
    for (let row of board) {
      blackPieces = blackPieces.concat(row.filter(piece => piece != null && piece.pieceColor == "black"))
    }
    return blackPieces;
  }

  function getWhitePieces(board) {
    let whitePieces = [];
    for (let row of board) {
      whitePieces = whitePieces.concat(row.filter(piece => piece != null && piece.pieceColor == "white"))
    }
    return whitePieces;
  }

  function moveResultsInCheck(to, board, selectedPiece) {
    console.log("Calling This Function!!")
    let copyBoardState = structuredClone(board);
    moveToSquare(to, copyBoardState, selectedPiece, false);
    console.log(`Moving the ${selectedPiece.pieceColor} ${selectedPiece.pieceType} to ${to} results in check: `, 
    isKingInCheck(selectedPiece.pieceColor, copyBoardState));
    console.log("The Final Board Seen By Function: ");
    console.log(copyBoardState);
  
    return isKingInCheck(selectedPiece.pieceColor, copyBoardState);
  }

  function baseKingMoves(position) {
    let positions = [];

    positions.push([position[0] + 1, position[1]]);
    positions.push([position[0] + 1, position[1] - 1]);
    positions.push([position[0] + 1, position[1] + 1]);

    positions.push([position[0] - 1, position[1]]);
    positions.push([position[0] - 1, position[1] - 1]);
    positions.push([position[0] - 1, position[1] + 1]);

    positions.push([position[0], position[1] + 1]);
    positions.push([position[0], position[1] - 1]);

    return positions;
  }

  function baseCastling(position, board) {


    let positions = [];
    let ourKing = board[position[0]][position[1]];

    if (ourKing.movesTaken > 0 || isKingInCheck(board[position[0]][position[1]].pieceColor, board)) {
      return positions;
    }

    let queenRook = board[position[0]][0];
    let kingRook = board[position[0]][7];

    // console.log("Queen Rook: ", queenRook);
    // console.log("king Rook: ", kingRook);

    if (queenRook != null 
      && queenRook['pieceType'] == "Rook" 
      && queenRook['movesTaken'] == 0 
      && [1,2,3].filter(column => isEmptySquare([position[0], column], board)).length == 3
      && [1,2,3].filter(column => isSquareControlled([position[0], column], ourKing.pieceColor, board)).length == 0
      
      ) {
        positions.push([position[0], 2]);
    }

    if (kingRook != null 
      && kingRook['pieceType'] == "Rook" 
      && kingRook['movesTaken'] == 0 
      && [5,6].filter(column => isEmptySquare([position[0], column], board)).length == 2
      && [5,6].filter(column => isSquareControlled([position[0], column], ourKing.pieceColor, board)).length == 0
      ) {
        positions.push([position[0], 6]);
    }

    console.log("Allowed Castling: ", positions);

    return positions;
  }

  function validKingMoves(position, board) {
    return baseKingMoves(position).concat(baseCastling(position, board)).filter(move => isOnBoard(move) && !isOwnPiece(move, board, board[position[0]][position[1]].pieceColor));
  }

  function validNonCastleMoves(position, board) {
    return baseKingMoves(position).filter(move => isOnBoard(move) && !isOwnPiece(move, board, board[position[0]][position[1]].pieceColor));
  }

  function validBishopMoves(position, board) {
    let horizontal = -1;
    let vertical = -1;
    let positions = [];

    while (true) {
      let newPosition = [position[0] + vertical, position[1] + horizontal];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          horizontal -= 1;
          vertical -= 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          horizontal = -1;
          vertical = 1;
          break;
        } else {
          horizontal = -1;
          vertical = 1;
          break;
        }
      } else {
        horizontal = -1;
        vertical = 1;
        break;
      }
    }

    while (true) {
      let newPosition = [position[0] + vertical, position[1] + horizontal];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          horizontal -= 1;
          vertical += 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          horizontal = 1;
          vertical = -1;
          break;
        } else {
          horizontal = 1;
          vertical = -1;
          break;
        }
      } else {
        horizontal = 1;
        vertical = -1;
        break;
      }
    }

    while (true) {
      let newPosition = [position[0] + vertical, position[1] + horizontal];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          horizontal += 1;
          vertical -= 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          horizontal = 1;
          vertical = 1;
          break;
        } else {
          horizontal = 1;
          vertical = 1;
          break;
        }
      } else {
        horizontal = 1;
        vertical = 1;
        break;
      }
    }

    while (true) {
      let newPosition = [position[0] + vertical, position[1] + horizontal];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          horizontal += 1;
          vertical += 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          horizontal = 1;
          vertical = 1;
          break;
        } else {
          horizontal = 1;
          vertical = 1;
          break;
        }
      } else {
        horizontal = 1;
        vertical = 1;
        break;
      }
    }

    return positions;

    
  }

  function validQueenMoves(position, board) {
    console.log("The queen controls these squares: ");
    console.log(validRookMoves(position, board).concat(validBishopMoves(position, board)));
    return validRookMoves(position, board).concat(validBishopMoves(position, board));
  }

  function validRookMoves(position, board) {
    let horizontal = -1;
    let vertical = -1;
    let positions = [];
    while (true) {
      let newPosition = [position[0], position[1] + horizontal];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          horizontal -= 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          horizontal = 1;
          break;
        } else {
          horizontal= 1;
          break;
        }
      } else {
        horizontal = 1;
        break;
      }
    }

    while (true) {
      let newPosition = [position[0], position[1] + horizontal];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          horizontal += 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          horizontal = 1;
          break;
        } else {
          horizontal = 1;
          break;
        }
      } else {
        horizontal = 1;
        break;
      }
    }

    while (true) {
      let newPosition = [position[0] + vertical, position[1]];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          vertical -= 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          vertical = 1;
          break;
        } else {
          vertical = 1;
          break;
        }
      } else {
        vertical = 1;
        break;
      }
    }

    while (true) {
      let newPosition = [position[0] + vertical, position[1]];
      if (isOnBoard(newPosition)) {
        if (isEmptySquare(newPosition, board)) {
          positions.push(newPosition);
          vertical += 1;
        } else if (isEnemyPiece(newPosition, board, board[position[0]][position[1]].pieceColor)) {
          positions.push(newPosition);
          vertical = 1;
          break;
        } else {
          vertical = 1;
          break;
        }
      } else {
        vertical = 1;
        break;
      }
    }

    return positions;
  }

  function validKnightMoves(position, board) {
    return knightOctopus(position).filter(p => isOnBoard(p) && !isOwnPiece(p, board, board[position[0]][position[1]].pieceColor));
  }

  function validPawnMoves(piece, board) {
    let possibleMoves = [];
    if (piece.pieceColor == "white") {
      // Starting Rank Pawns
      let oneUp = [piece.row - 1, piece.column];
      let canOneUp = isOnBoard(oneUp) && isEmptySquare(oneUp, board);

      if (piece.row == 6) {
        let twoUp = [piece.row - 2, piece.column];
        let canTwoUp = isOnBoard(twoUp) && isEmptySquare(twoUp, board);
        if (canOneUp && canTwoUp) {
          possibleMoves.push(oneUp);
          possibleMoves.push(twoUp);
        } else if (canOneUp) {
          possibleMoves.push(oneUp);
        } else {
        }
      } else {
        if (canOneUp) {
          possibleMoves.push(oneUp);
        }
      }

      if (piece.row == 3) {
        let leP = [piece.row, piece.column - 1];
        let reP = [piece.row, piece.column + 1];
        let lePf = [piece.row - 1, piece.column - 1];
        let rePf = [piece.row - 1, piece.column + 1];
        let lePiece = board[leP[0]][leP[1]];
        let rePiece = board[reP[0]][reP[1]];

        if (isOnBoard(leP) && isEnemyPiece(leP, board, piece.pieceColor) && arrayEquals(leP, lastMoved) && lePiece != null && lePiece.movesTaken == 1) {
          possibleMoves.push(lePf);
        }
        if (isOnBoard(reP) && isEnemyPiece(reP, board, piece.pieceColor) && arrayEquals(reP, lastMoved) && rePiece != null && rePiece.movesTaken == 1) {
          possibleMoves.push(rePf);
        }
      }

      let captureLeft = [piece.row - 1, piece.column - 1];
      let captureRight = [piece.row - 1, piece.column + 1];

      if (isOnBoard(captureLeft) && isEnemyPiece(captureLeft, board, piece.pieceColor)) {
        possibleMoves.push(captureLeft);
      }

      if (isOnBoard(captureRight) && isEnemyPiece(captureRight, board, piece.pieceColor)) {
        possibleMoves.push(captureRight);
      }

    } else {
      // Black Pawns
      let oneUp = [piece.row + 1, piece.column];
      let canOneUp = isOnBoard(oneUp) && isEmptySquare(oneUp, board);

      if (piece.row == 1) {
        let twoUp = [piece.row + 2, piece.column];
        let canTwoUp = isOnBoard(twoUp) && isEmptySquare(twoUp, board);
        if (canOneUp && canTwoUp) {
          possibleMoves.push(oneUp);
          possibleMoves.push(twoUp);
        } else if (canOneUp) {
          possibleMoves.push(oneUp);
        } else {
        }
      } else {
        if (canOneUp) {
          possibleMoves.push(oneUp);
        }
      }

      if (piece.row == 4) {
        let leP = [piece.row, piece.column - 1];
        let reP = [piece.row, piece.column + 1];
        let lePf = [piece.row + 1, piece.column - 1];
        let rePf = [piece.row + 1, piece.column + 1];
        let lePiece = board[leP[0]][leP[1]];
        let rePiece = board[reP[0]][reP[1]];

        if (isOnBoard(leP) && isEnemyPiece(leP, board, piece.pieceColor) && arrayEquals(leP, lastMoved) && lePiece != null && lePiece.movesTaken == 1) {
          possibleMoves.push(lePf);
        }
        if (isOnBoard(reP) && isEnemyPiece(reP, board, piece.pieceColor) && arrayEquals(reP, lastMoved) && rePiece != null && rePiece.movesTaken == 1) {
          possibleMoves.push(rePf);
        }
      }

      let captureLeft = [piece.row + 1, piece.column - 1];
      let captureRight = [piece.row + 1, piece.column + 1];

      if (isOnBoard(captureLeft) && isEnemyPiece(captureLeft, board, piece.pieceColor)) {
        possibleMoves.push(captureLeft);
      }

      if (isOnBoard(captureRight) && isEnemyPiece(captureRight, board, piece.pieceColor)) {
        possibleMoves.push(captureRight);
      }

    }
    return possibleMoves;
  }

  function validPawnCaptures(piece, board) {
    return validPawnMoves(piece, board).filter(position => position[0] != piece.row);
  }

  function knightOctopus(position) {
    let positions = [];
    let rowModifiers = [-2, -1, 1, 2];
    for (let i=0; i<rowModifiers.length; i++) {
      if (Math.abs(rowModifiers[i]) == 1) {
        positions.push([position[0] + rowModifiers[i], position[1] - 2])
        positions.push([position[0] + rowModifiers[i], position[1] + 2])
      } else {
        positions.push([position[0] + rowModifiers[i], position[1] - 1])
        positions.push([position[0] + rowModifiers[i], position[1] + 1])
      }
    }
    return positions;
  }

  function isPromoting(board) {
    let whiteIsPromoting = board[0].filter(square => square != null && square.sprite == "whitePawn.jpg").length != 0;
    let blackIsPromoting = board[7].filter(square => square != null && square.sprite == "blackPawn.jpg").length != 0;
    return whiteIsPromoting || blackIsPromoting;
  }

  function updateHighlightState(calculatedMoves) {
    let copyHighlightState = JSON.parse(JSON.stringify(highlightState));
    for (let move of calculatedMoves) {
      copyHighlightState[move[0]][move[1]] = true;
    }
    setHighlightState(copyHighlightState);
  }

  // Handle logic after movement (will encompass DWL & check[mate] checks, increment player, reset highlights. )
  function nextTurn() {
    setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
  }

  function calculateMoves(piece) {
    let possibleMoves = [];
    if (piece.pieceType == "Pawn") {
      possibleMoves = validPawnMoves(piece, boardState);
    } else {

      if (piece.pieceType == "Knight") {
        console.log("Valid Knight Moves: ", validKnightMoves([piece.row, piece.column], boardState));
        possibleMoves = validKnightMoves([piece.row, piece.column], boardState);
      }

      if (piece.pieceType == "Bishop") {
        console.log("Valid Bishop Moves: ", validBishopMoves([piece.row, piece.column], boardState));
        possibleMoves = validBishopMoves([piece.row, piece.column], boardState);
      }

      if (piece.pieceType == "Rook") {
        console.log("Valid Rook Moves: ", validRookMoves([piece.row, piece.column], boardState))
        possibleMoves = validRookMoves([piece.row, piece.column], boardState);
      }

      if (piece.pieceType == "Queen") {
        console.log("Valid Queen Moves: ", validQueenMoves([piece.row, piece.column], boardState))
        possibleMoves = validQueenMoves([piece.row, piece.column], boardState);
      }

      if (piece.pieceType == "King") {
        console.log("Valid King Moves: ", validKingMoves([piece.row, piece.column], boardState))
        possibleMoves = validKingMoves([piece.row, piece.column], boardState);
      }
    }

    possibleMoves = possibleMoves.filter(move => !moveResultsInCheck(move, boardState, selectedPiece))
    console.log("Possible Moves: ", possibleMoves)
    updateHighlightState(possibleMoves);
  }

  function initializePieces() {
    let pieceOrder = ["Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"];
    let pieceRows = [0, 7];
    let pawnRows = [1, 6];
    let colors = ['black', 'white'];

    let newBoard = [...Array(8)].map(e => Array(8).fill(null));

    for (let row=0; row < 8; row++) {
      for (let column=0; column < 8; column++) {
        let currentPieceColor = colors[+ (row > 5)];
        if (pieceRows.includes(row)) {
          newBoard[row][column] = {
            sprite: `${currentPieceColor}${pieceOrder[column]}.jpg`, 
            row: row,
            column: column,
            pieceColor: currentPieceColor,
            pieceType: pieceOrder[column],
            movesTaken: 0
          }
        } else if (pawnRows.includes(row)) {
          newBoard[row][column] = {
            sprite: `${currentPieceColor}Pawn.jpg`, 
            row: row,
            column: column,
            pieceColor: currentPieceColor,
            pieceType: 'Pawn',
            movesTaken: 0
          }
        }
      }
    }
    setBoardState(newBoard);
  }

  function generateSquares() {
    const noOfSquares = Array.from(Array(64).keys());
    return noOfSquares.map(c => {
      let row = Math.floor(c / 8);
      let column = c % 8;
      let isWhite = ((row % 2 == 0 && column % 2 == 0) || (row % 2 != 0 && column % 2 != 0));
      return <Square isWhite={isWhite} isHighlighted={highlightState[row][column]} position={[row, column]} piece={boardState[row][column]} key={[row, column]}></Square>;
    })
  }

  function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
  }

  useEffect(() => {
    if (lastMoved != null) {
      setIsPiecePromoting(isPromoting(boardState));
    }
  }, [lastMoved])

  useEffect(() => {
    if (selectedPiece != null) {
      calculateMoves(selectedPiece);
    }
  }, [selectedPiece])

  useEffect(() => {
    if (lastMoved != null && isPiecePromoting == false) {
      let oppositeColor = boardState[lastMoved[0]][lastMoved[1]].pieceColor == "white" ? "black" : "white";
      console.log(`The ${oppositeColor} King is in Check!: `, isKingInCheck(oppositeColor, boardState));
      setKingInCheck(isKingInCheck(oppositeColor, boardState));
    }
  }, [lastMoved, isPiecePromoting])
  
  useEffect(() => {
    initializePieces();
   }, [])

  return (
    <AppContext.Provider value={{
      boardState: boardState, 
      setBoardState: setBoardState,
      selectedPiece: selectedPiece,
      setSelectedPiece: setSelectedPiece,
      highlightState: highlightState,
      setHighlightState: setHighlightState,
      nextTurn: nextTurn,
      isEnemyPiece: isEnemyPiece,
      lastMoved: lastMoved,
      setLastMoved: setLastMoved,
      isPiecePromoting: isPiecePromoting,
      setIsPiecePromoting: setIsPiecePromoting,
      kingInCheck: kingInCheck,
      setKingInCheck: setKingInCheck,
      isKingInCheck: isKingInCheck,
      moveToSquare: moveToSquare
    }}>
      <div className="App">
        {boardState && isPiecePromoting ? <div className="BoardGrey" style={{display: 'block'}}></div> : null}
        <div className="Board">
          {boardState ? generateSquares() : null}
        </div>
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
