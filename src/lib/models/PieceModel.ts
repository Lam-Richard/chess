import { PieceType, PieceColor } from "$lib/enums";
import type { BoardModel } from "./BoardModel";
import type { Move } from "./Move";

export class PiecePosition {
    constructor(public readonly row: number, public readonly col: number) { }
}

export abstract class PieceModel {

    public abstract readonly type: PieceType;

    constructor(
        public readonly position: PiecePosition,
        public readonly color: PieceColor,
        public readonly board: BoardModel,
    ) {
    }
    
    abstract getAvailableMoves(): Move[]
}
