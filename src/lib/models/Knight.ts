import { PieceType, type PieceColor } from "$lib/enums";
import type { Move } from "./Move";
import { Piece, PiecePosition } from "./Piece";

export class Knight extends Piece {
    public readonly pieceType: PieceType;
    constructor(piecePosition: PiecePosition, pieceColor: PieceColor) {
        super(piecePosition, pieceColor);
        this.pieceType = PieceType.Knight;
    }

    getAvailableMoves(): Move[] {
        throw new Error("Method not implemented.");
    }
}
