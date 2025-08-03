import { PieceType, type PieceColor } from "$lib/enums";
import type { Move } from "./Move";
import { Piece, PiecePosition } from "./Piece";

export class Queen extends Piece {
    public readonly pieceType: PieceType
    constructor(piecePosition: PiecePosition, pieceColor: PieceColor) {
        super(piecePosition, pieceColor);
        this.pieceType = PieceType.Queen
    }

    getAvailableMoves(): Move[] {
        throw new Error("Method not implemented.");
    }
}
