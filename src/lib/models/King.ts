import { PieceType, type PieceColor } from "$lib/enums";
import type { Move } from "./Move";
import { Piece } from "./Piece";

export class King extends Piece {
    public readonly pieceType: PieceType;
    constructor(pieceColor: PieceColor) {
        super(pieceColor);
        this.pieceType = PieceType.King;
    }

    getAvailableMoves(): Move[] {
        throw new Error("Method not implemented.");
    }
}