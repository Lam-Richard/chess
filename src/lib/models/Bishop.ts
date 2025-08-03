import { PieceType, type PieceColor } from "$lib/enums";
import type { BoardModel } from "./BoardModel";
import type { Move } from "./Move";
import { PieceModel, PiecePosition } from "./PieceModel";

export class Bishop extends PieceModel {
    public readonly type: PieceType;
    
    constructor(
        piecePosition: PiecePosition, 
        pieceColor: PieceColor, 
        board: BoardModel
    ) {
        super(piecePosition, pieceColor, board);
        this.type = PieceType.Bishop;
    }

    getAvailableMoves(): Move[] {
        throw new Error("Method not implemented.");
    }
}
