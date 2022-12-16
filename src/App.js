import React, { useEffect, useState, useContext, createContext} from 'react';
import useSound from 'use-sound';
import "./App.css";

function importAll(r) {
  let images = {};
   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
}
const images = importAll(require.context('./chess-pictures', false, /\.(png|jpe?g|svg)$/));
const sounds = importAll(require.context('./chess-sounds'), false, ".wav");

const Square = ( { isWhite, isHighlighted, position, piece } ) => { 

  const SquareContext = useContext(AppContext);


  const [isCheckedKing, setIsCheckedKing] = 
  useState((piece != null) && (SquareContext.lastMoved != null) && (piece.pieceType == "King") && (piece.pieceColor == SquareContext.getOppositeColor(SquareContext.boardState, SquareContext.lastMoved)) && SquareContext.kingInCheck);
  
  const [myClassName, setMyClassName] = useState("");


  function generateClassName () {
    if (SquareContext.checkmate) {
      return "Square Checkmate";
    } else if (SquareContext.kingInCheck) {
      return "Square Checked";
    } else if (isWhite) {
      return "Square";
    } else {
      return "Square Black";
    }
  }

  useEffect(() => {
    setMyClassName(generateClassName());
  }, [isCheckedKing])

  useEffect(() => {
    setIsCheckedKing((piece != null) && (SquareContext.lastMoved != null) && (piece.pieceType == "King") && (piece.pieceColor == SquareContext.getOppositeColor(SquareContext.boardState, SquareContext.lastMoved)) && SquareContext.kingInCheck);
  }, [SquareContext.kingInCheck])

  function checkSquare() {

    // If the square contains the current player's piece, check the selected moves.

    // If the square contains the opponent player's piece, follow capture protocol.

    // If the square is empty:
    // -- If the selected piece is the current player's pawn and en-passent is possible, follow that protocol/
    // -- Else, simply move the selected piece and switch the current player.

    if (SquareContext.lastMoved == null) {
      if (piece == null) {
        if (SquareContext.selectedPiece != null && SquareContext.highlightState[position[0]][position[1]] == true) {
          SquareContext.setBoardState(SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece));
          if (SquareContext.isEmptySquare(position, SquareContext.boardState)) {
            SquareContext.playMoveSound();
          } else {
            SquareContext.playCaptureSound();
          }
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          SquareContext.setLastMoved([position[0], position[1]]); 


        } else {
          // Nothing Happens
          SquareContext.playIllegalMoveSound();

        }
      } else {
        // I clicked on one of my own pieces...!
        if (piece.pieceColor == "white") {
          // console.log(`There is a ${piece.pieceColor} ${piece.pieceType} at (${piece.row}, ${piece.column})`)
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          if (SquareContext.selectedPiece == null || (SquareContext.selectedPiece != null && piece != SquareContext.selectedPiece)) {
            
            if (SquareContext.calculateMoves(piece, SquareContext.boardState, SquareContext.lastMoved).length == 0) {
              SquareContext.playIllegalMoveSound();
              SquareContext.setSelectedPiece(null);
            } else {
              SquareContext.setSelectedPiece(piece);
            }
          } else {
            SquareContext.setSelectedPiece(null);
          }
        } else if (SquareContext.highlightState[position[0]][position[1]] == true) {
          // I clicked on a black piece (we know it's not null) and it's selectable
          SquareContext.setBoardState(SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece));
          if (SquareContext.isEmptySquare(position, SquareContext.boardState)) {
            SquareContext.playMoveSound();
          } else {
            SquareContext.playCaptureSound();
          }
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          SquareContext.setLastMoved([position[0], position[1]]); 


        } else {
          // Nothing Happens
          SquareContext.playIllegalMoveSound();
        }
      }      
    } else {
      if (piece == null) {
        if (SquareContext.selectedPiece != null && SquareContext.highlightState[position[0]][position[1]] == true) {
          SquareContext.setBoardState(SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece));
          if (SquareContext.isEmptySquare(position, SquareContext.boardState)) {
            SquareContext.playMoveSound();
          } else {
            SquareContext.playCaptureSound();
          }
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          SquareContext.setLastMoved([position[0], position[1]]); 


        } else {
          // Nothing Happens
          SquareContext.playIllegalMoveSound();
        }
      } else {
        // I clicked on one of my own pieces...!
        if (piece.pieceColor != SquareContext.boardState[SquareContext.lastMoved[0]][SquareContext.lastMoved[1]].pieceColor) {
          // console.log(`There is a ${piece.pieceColor} ${piece.pieceType} at (${piece.row}, ${piece.column})`)
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          if (SquareContext.selectedPiece == null || (SquareContext.selectedPiece != null && piece != SquareContext.selectedPiece)) {
            if (SquareContext.calculateMoves(piece, SquareContext.boardState, SquareContext.lastMoved).length == 0) {
              SquareContext.playIllegalMoveSound();
              SquareContext.setSelectedPiece(null);
            } else {
              SquareContext.setSelectedPiece(piece);
            }
          } else {
            SquareContext.setSelectedPiece(null);
          }
        } else if (SquareContext.highlightState[position[0]][position[1]] == true) {
          // I clicked on a black piece (we know it's not null) and it's selectable
          SquareContext.setBoardState(SquareContext.moveToSquare(position, SquareContext.boardState, SquareContext.selectedPiece));
          if (SquareContext.isEmptySquare(position, SquareContext.boardState)) {
            SquareContext.playMoveSound();
          } else {
            SquareContext.playCaptureSound();
          }
          SquareContext.setHighlightState([...Array(8)].map(e => Array(8).fill(false)));
          SquareContext.setLastMoved([position[0], position[1]]); 


        } else {
          // Nothing Happens
          SquareContext.playIllegalMoveSound();
        }
      }      
    }
  }

  function promotePiece(newPiece) {
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
  }

  // So right now I need to make a thing if the Square's position is 0 or 7.
  return (
    (position[0] == 0 || position[0] == 7) && piece != null && piece['sprite'] == `${piece['pieceColor']}Pawn.jpg` ? 
    <div className={myClassName}>
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
    
    // piece != null && piece['sprite'] ==
    
    <div className={myClassName} onClick={() => checkSquare()}>
      {isHighlighted == true ? <div className="highlight"></div> : null}
      {piece != null ? <img src={images[piece['sprite']]}/> :  null}
    </div>
  )
}

const AppContext = createContext();

function App() {

  // const [gameState, setGameState] = useState([{
  //   boardState: null,
  //   highlightState: [...Array(8)].map(e => Array(8).fill(false)),
  //   selectedPiece: null,
  //   lastMoved: null,
  //   isPiecePromoting: false,
  //   kingInCheck: false,
  //   checkmate: false
  // }]);

  const [boardState, setBoardState] = useState(() => initializePieces());
  const [highlightState, setHighlightState] = useState([...Array(8)].map(e => Array(8).fill(false)));
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [lastMoved, setLastMoved] = useState(null);
  const [isPiecePromoting, setIsPiecePromoting] = useState(false);
  const [kingInCheck, setKingInCheck] = useState(false);
  const [checkmate, setCheckmate] = useState(false);

  const [display, setDisplay] = useState(null);

  const [playCheckSound] = useSound(sounds['Check.WAV'], { volume: 0.7 });
  const [playCaptureSound] = useSound(sounds['Capture.WAV'], { volume: 0.7 });
  const [playCheckmateSound] = useSound(sounds['Checkmate.WAV'], { volume: 0.7 });
  const [playMoveSound] = useSound(sounds['Move_Piece.WAV'], { volume: 0.9 });
  const [playIllegalMoveSound] = useSound(sounds['Illegal_Move.WAV'], { volume: 0.9 });


  // STATELESS FUNCTIONS

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
    return newBoard;
  }

  function arrayContains(bigArray, element) {
    return JSON.stringify(bigArray).indexOf(JSON.stringify(element)) != -1;
  }

  function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
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

  function isPromoting(board) {
    let whiteIsPromoting = board[0].filter(square => square != null && square.sprite == "whitePawn.jpg").length != 0;
    let blackIsPromoting = board[7].filter(square => square != null && square.sprite == "blackPawn.jpg").length != 0;
    return whiteIsPromoting || blackIsPromoting;
  }

  function isOnBoard(position) {
    return (position[0] >= 0 && position[0] <= 7) && (position[1] >= 0 && position[1] <= 7);
  }

  function isEmptySquare(position, board) {
    return board[position[0]][position[1]] == null;
  }

  function isEnemyPiece(position, board, selfColor) {
    return !isEmptySquare(position, board) && board[position[0]][position[1]].pieceColor != selfColor
  }

  function isOwnPiece(position, board, selfColor) {
    return !isEmptySquare(position, board) && !isEnemyPiece(position, board, selfColor);
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

  function validKnightMoves(position, board) {
    return knightOctopus(position).filter(p => isOnBoard(p) && !isOwnPiece(p, board, board[position[0]][position[1]].pieceColor));
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

  function validQueenMoves(position, board) {
    return validRookMoves(position, board).concat(validBishopMoves(position, board));
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

  function validNonCastleMoves(position, board) {
    return baseKingMoves(position).filter(move => isOnBoard(move) && !isOwnPiece(move, board, board[position[0]][position[1]].pieceColor));
  }

  function validPawnMoves(piece, board, lastMovedArg) {
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

        if (isOnBoard(leP) && isEnemyPiece(leP, board, piece.pieceColor) && arrayEquals(leP, lastMovedArg) && lePiece != null && lePiece.movesTaken == 1) {
          possibleMoves.push(lePf);
        }
        if (isOnBoard(reP) && isEnemyPiece(reP, board, piece.pieceColor) && arrayEquals(reP, lastMovedArg) && rePiece != null && rePiece.movesTaken == 1) {
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

        if (isOnBoard(leP) && isEnemyPiece(leP, board, piece.pieceColor) && arrayEquals(leP, lastMovedArg) && lePiece != null && lePiece.movesTaken == 1) {
          possibleMoves.push(lePf);
        }
        if (isOnBoard(reP) && isEnemyPiece(reP, board, piece.pieceColor) && arrayEquals(reP, lastMovedArg) && rePiece != null && rePiece.movesTaken == 1) {
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

  function validPawnCaptures(piece, board, lastMovedArg) {
    return validPawnMoves(piece, board, lastMovedArg).filter(position => position[0] != piece.row);
  }

  function isSquareControlled(position, movingPieceColor, board, lastMovedArg) {
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
            if (arrayContains(validPawnCaptures(whitePiece, board, lastMovedArg), position)) {
              return true;
            }
            break;
        }
      }
    }

    return false;
  }

  function getOppositeColor(board, lastMovedArg) {
    return board[lastMovedArg[0]][lastMovedArg[1]].pieceColor == "white" ? "black" : "white";
  }

  function isKingInCheck(kingColor, board, lastMovedArg) {
    if (kingColor == "white") {
      let King = getWhitePieces(board).filter(piece => piece.pieceType == "King")[0];
      // console.log("King in Question: ", King);
      return isSquareControlled([King.row, King.column], kingColor, board, lastMovedArg);
    } else {
      let King = getBlackPieces(board).filter(piece => piece.pieceType == "King")[0];
      // console.log("King in Question: ", King);
      return isSquareControlled([King.row, King.column], kingColor, board, lastMovedArg);
    }
  }

  function moveResultsInCheck(to, board, selectedPiece, lastMovedArg) {
    let copyBoardState = moveToSquare(to, structuredClone(board), selectedPiece);
    console.log(`Moving the ${selectedPiece.pieceColor} ${selectedPiece.pieceType} to ${to} results in check: `, 
    isKingInCheck(selectedPiece.pieceColor, copyBoardState, lastMovedArg));  
    return isKingInCheck(selectedPiece.pieceColor, copyBoardState, lastMovedArg);
  }

  function baseCastling(position, board, lastMovedArg) {

    let positions = [];
    let ourKing = board[position[0]][position[1]];

    if (ourKing.movesTaken > 0 || isKingInCheck(board[position[0]][position[1]].pieceColor, board, lastMovedArg)) {
      return positions;
    }

    let queenRook = board[position[0]][0];
    let kingRook = board[position[0]][7];

    if (queenRook != null 
      && queenRook['pieceType'] == "Rook" 
      && queenRook['movesTaken'] == 0 
      && [1,2,3].filter(column => isEmptySquare([position[0], column], board)).length == 3
      && [1,2,3].filter(column => isSquareControlled([position[0], column], ourKing.pieceColor, board, lastMovedArg)).length == 0
      
      ) {
        positions.push([position[0], 2]);
    }

    if (kingRook != null 
      && kingRook['pieceType'] == "Rook" 
      && kingRook['movesTaken'] == 0 
      && [5,6].filter(column => isEmptySquare([position[0], column], board)).length == 2
      && [5,6].filter(column => isSquareControlled([position[0], column], ourKing.pieceColor, board, lastMovedArg)).length == 0
      ) {
        positions.push([position[0], 6]);
    }

    return positions;
  }

  function validKingMoves(position, board) {
    return baseKingMoves(position).concat(baseCastling(position, board)).filter(move => isOnBoard(move) && !isOwnPiece(move, board, board[position[0]][position[1]].pieceColor));
  }

  function calculateMoves(piece, board, lastMovedArg) {
    let possibleMoves = [];
    if (piece.pieceType == "Pawn") {
      possibleMoves = validPawnMoves(piece, board, lastMovedArg);
    } else {

      if (piece.pieceType == "Knight") {
        console.log("Valid Knight Moves: ", validKnightMoves([piece.row, piece.column], board));
        possibleMoves = validKnightMoves([piece.row, piece.column], board);
      }

      if (piece.pieceType == "Bishop") {
        console.log("Valid Bishop Moves: ", validBishopMoves([piece.row, piece.column], board));
        possibleMoves = validBishopMoves([piece.row, piece.column], board);
      }

      if (piece.pieceType == "Rook") {
        console.log("Valid Rook Moves: ", validRookMoves([piece.row, piece.column], board))
        possibleMoves = validRookMoves([piece.row, piece.column], board);
      }

      if (piece.pieceType == "Queen") {
        console.log("Valid Queen Moves: ", validQueenMoves([piece.row, piece.column], board))
        possibleMoves = validQueenMoves([piece.row, piece.column], board);
      }

      if (piece.pieceType == "King") {
        console.log("Valid King Moves: ", validKingMoves([piece.row, piece.column], board))
        possibleMoves = validKingMoves([piece.row, piece.column], board);
      }
    }

    possibleMoves = possibleMoves.filter(move => !moveResultsInCheck(move, board, piece));

    return possibleMoves;
  }

  function noValidMoves(movingPieceColor, board, lastMovedArg) {
    let pieces;
    if (movingPieceColor == "white") {
      pieces = getWhitePieces(board);
    } else {
      pieces = getBlackPieces(board);
    }

    for (let piece of pieces) {
      if (calculateMoves(piece, board, lastMovedArg).length != 0) {
        return false;
      } 
    }

    return true;
  }

  function isCheckmate(board, lastMovedArg, kingInCheckArg) {
    return noValidMoves(getOppositeColor(board, lastMovedArg), board) && kingInCheckArg;
  }

  function moveToSquare(to, board, selectedPiece) {
    // Check if there's en-passent related clean up to do...! 

    let tempBoard = structuredClone(board);

    let fromRow = selectedPiece.row;
    let fromColumn = selectedPiece.column;


    let isPawn = selectedPiece.pieceType == "Pawn";
    let isDiagonal = Math.abs(fromColumn - to[1]) != 0;
    let toIsEmpty = tempBoard[to[0]][to[1]] == null;
    
    // EnPassant!
    if (isPawn && isDiagonal && toIsEmpty) {
      if (selectedPiece.pieceColor == "white") {
        tempBoard[to[0] + 1][to[1]] = null;
      } else {
        tempBoard[to[0] - 1][to[1]] = null;
      }
    }

    let isKing = selectedPiece.pieceType == "King";
    let isQueenSide = (fromColumn - to[1] == 2);
    let isKingSide = (to[1] - fromColumn == 2);

    tempBoard[to[0]][to[1]] = structuredClone(selectedPiece);

    tempBoard[to[0]][to[1]].row = to[0];
    tempBoard[to[0]][to[1]].column = to[1];
    tempBoard[to[0]][to[1]].movesTaken += 1;

    if (isKing) {
      if (isQueenSide) {
        tempBoard[to[0]][to[1] + 1] = structuredClone(tempBoard[to[0]][0]);
        tempBoard[to[0]][to[1] + 1].row = to[0];
        tempBoard[to[0]][to[1] + 1].column = to[1] + 1;
        tempBoard[to[0]][to[1] + 1].movesTaken += 1;
        tempBoard[to[0]][0] = null;
      } else if (isKingSide) {
        tempBoard[to[0]][to[1] - 1] = structuredClone(tempBoard[to[0]][7]);
        tempBoard[to[0]][to[1] - 1].row = to[0];
        tempBoard[to[0]][to[1] - 1].column = to[1] - 1;
        tempBoard[to[0]][to[1] - 1].movesTaken += 1;
        tempBoard[to[0]][7] = null;
      }
    }
  
    tempBoard[fromRow][fromColumn] = null;   
    return tempBoard;
  }

  // END OF STATELESS FUNCTIONS TENTATIVELY

  // STATEFUL FUNCTIONS

  // This is rendering, so it maybe doesn't have to be decoupled from the board and highlightState (which it needs to render)...?
  function generateSquares() {
    console.log("Generate Squares was called!");
    const noOfSquares = Array.from(Array(64).keys());
    return noOfSquares.map(c => {
      let row = Math.floor(c / 8);
      let column = c % 8;
      let isWhite = ((row % 2 == 0 && column % 2 == 0) || (row % 2 != 0 && column % 2 != 0));
      return <Square isWhite={isWhite} isHighlighted={highlightState[row][column]} position={[row, column]} piece={boardState[row][column]} key={[row, column]}></Square>;
    })
  }

  // Check if a piece is promoting
  useEffect(() => {
    if (lastMoved != null) {
      setIsPiecePromoting(isPromoting(boardState));
    }
  }, [lastMoved])

  // Show possible moves to the user based on clicked piece
  useEffect(() => {
    if (selectedPiece != null) {
      let copyHighlightState = JSON.parse(JSON.stringify(highlightState));
      for (let move of calculateMoves(selectedPiece, boardState, lastMoved)) {
        copyHighlightState[move[0]][move[1]] = true;
      }
      setHighlightState(copyHighlightState);
    }
  }, [selectedPiece])


  // Check for a check only after the user finishes promoting
  useEffect(() => {
    if (lastMoved != null && isPiecePromoting == false) {
      // console.log(`The ${getOppositeColor()} King is in Check!: `, isKingInCheck(getOppositeColor(), boardState));
      setKingInCheck(isKingInCheck(getOppositeColor(boardState, lastMoved), boardState, lastMoved));
    }
  }, [lastMoved, isPiecePromoting])


  // Check if the game is over
  useEffect(() => {
    if (lastMoved != null) {
      if (kingInCheck) {
        setCheckmate(isCheckmate(boardState, lastMoved, kingInCheck));
      }
    }
  }, [lastMoved, kingInCheck])


  // Play only checkmate or check sound
  useEffect(() => {
    if (checkmate) {
      playCheckmateSound();
    } else if (kingInCheck) {
      playCheckSound();
    }
  }, [checkmate, kingInCheck])


  // Rendering
  useEffect(() => {
    setDisplay(generateSquares());
  }, [boardState, highlightState])

  return (
    <AppContext.Provider value={{
      calculateMoves: calculateMoves,
      boardState: boardState, 
      setBoardState: setBoardState,
      selectedPiece: selectedPiece,
      setSelectedPiece: setSelectedPiece,
      highlightState: highlightState,
      setHighlightState: setHighlightState,
      isEnemyPiece: isEnemyPiece,
      isEmptySquare: isEmptySquare,
      lastMoved: lastMoved,
      setLastMoved: setLastMoved,
      isPiecePromoting: isPiecePromoting,
      setIsPiecePromoting: setIsPiecePromoting,
      kingInCheck: kingInCheck,
      setKingInCheck: setKingInCheck,
      isKingInCheck: isKingInCheck,
      moveToSquare: moveToSquare,
      getOppositeColor: getOppositeColor,
      checkmate: checkmate,
      playIllegalMoveSound: playIllegalMoveSound,
      playCaptureSound: playCaptureSound,
      playMoveSound: playMoveSound
    }}>
      <div className="App">
        {boardState && isPiecePromoting ? <div className="BoardGrey" style={{display: 'block'}}></div> : null}
        <div className="Board">
          {display}
        </div>
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
