import { PieceColor, PieceType, SquareColor } from "./enums";
import { PiecePosition, type PieceModel } from "$lib/models/PieceModel";
import { Bishop } from "./models/Bishop";
import { King } from "./models/King";
import { Knight } from "./models/Knight";
import { Pawn } from "./models/Pawn";
import { Queen } from "./models/Queen";
import { Rook } from "./models/Rook";
import type { BoardModel } from "./models/BoardModel";

export function getSquareColor(row: number, col: number): SquareColor {
    if (row % 2 === col % 2) {
        return SquareColor.Light;
    } else {
        return SquareColor.Dark;
    }
}

export function getStartingPieceColor(row: number) : PieceColor | undefined {
    if (row < 2) {
        return PieceColor.Black
    } else if (row > 5) {
        return PieceColor.White
    } else {
        return undefined
    }
}

export function getStartingPieceType(row: number, col: number) : PieceType | undefined {
    if (row === 1 || row === 6) {
        return PieceType.Pawn
    }

    if (row !== 0 && row !== 7) {
        return undefined
    }

    if (col === 0 || col === 7) {
        return PieceType.Rook
    } else if (col === 1 || col === 6) {
        return PieceType.Knight
    } else if (col === 2 || col === 5) {
        return PieceType.Bishop
    } else if (col === 3) {
        return PieceType.Queen
    } else if (col === 4) {
        return PieceType.King
    } else {
        return undefined
    }
}

export function getStartingPieceBySquare(
    row: number,
    col: number,
    board: BoardModel,
) : PieceModel | undefined {
    let startingPieceColor = getStartingPieceColor(row)

    if (!startingPieceColor) {
        return undefined
    }

    let startingPieceType = getStartingPieceType(row, col)
    let startingPiecePosition = new PiecePosition(row, col)

    switch (startingPieceType) {
        case PieceType.Rook:
            return new Rook(startingPiecePosition, startingPieceColor, board);
        case PieceType.Knight:
            return new Knight(startingPiecePosition, startingPieceColor, board);
        case PieceType.Bishop:
            return new Bishop(startingPiecePosition, startingPieceColor, board);
        case PieceType.Queen:
            return new Queen(startingPiecePosition, startingPieceColor, board);
        case PieceType.King:
            return new King(startingPiecePosition, startingPieceColor, board);
        case PieceType.Pawn:
            return new Pawn(startingPiecePosition, startingPieceColor, board);
        default:
            return undefined;
    }
}