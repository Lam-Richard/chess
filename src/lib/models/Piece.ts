import { PieceType, PieceColor } from "$lib/enums";
import type { Move } from "./Move";

export class PiecePosition {
    public readonly row: number;
    public readonly col: number;

    constructor(row: number, col: number) {
        this.row = row; 
        this.col = col;
    }
}

export abstract class Piece {
    public readonly pieceColor: PieceColor;
    public readonly piecePosition: PiecePosition;
    public abstract readonly pieceType: PieceType;


    constructor(piecePosition: PiecePosition, pieceColor: PieceColor) {
        this.pieceColor = pieceColor;
        this.piecePosition = piecePosition;
    }

    abstract getAvailableMoves(): Move[]
}
