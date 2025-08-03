import { PieceType, PieceColor } from "$lib/enums";
import type { Move } from "./Move";

export abstract class Piece {
    public readonly pieceColor: PieceColor;
    public abstract readonly pieceType: PieceType;


    constructor(pieceColor: PieceColor) {
        this.pieceColor = pieceColor;
    }

    abstract getAvailableMoves(): Move[]
}
