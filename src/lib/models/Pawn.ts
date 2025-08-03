import { PieceColor, PieceType } from "$lib/enums";
import type { BoardModel } from "./BoardModel";
import type { Move } from "./Move";
import { PieceModel, PiecePosition } from "./PieceModel";

export class Pawn extends PieceModel {
    public readonly type: PieceType;

    constructor(
        piecePosition: PiecePosition, 
        pieceColor: PieceColor, 
        board: BoardModel
    ) {
        super(piecePosition, pieceColor, board);
        this.type = PieceType.Pawn;
    }

    getAvailableMoves(): Move[] {
        let moves: Move[] = [];

        if (this.color === PieceColor.Black) {

        } else {

        }
        return moves;
    }
}
