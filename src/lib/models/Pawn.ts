import { PieceColor, PieceType } from "$lib/enums";
import type { Move } from "./Move";
import { Piece, PiecePosition } from "./Piece";

export class Pawn extends Piece {
    public readonly pieceType: PieceType;
    
    constructor(piecePosition: PiecePosition, pieceColor: PieceColor) {
        super(piecePosition, pieceColor);
        this.pieceType = PieceType.Pawn;
    }

    getAvailableMoves(): Move[] {
        if (this.pieceColor === PieceColor.Black) {
            
        } else {
            
        }
    }
}
