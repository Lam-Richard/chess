import type { SquareColor } from "$lib/enums";
import { getSquareColor } from "$lib/utils";
import type { BoardModel } from "./BoardModel";
import type { PieceModel } from "./PieceModel";

export class SquareModel {
    public readonly id: string;
    public readonly color: SquareColor;

    constructor(
        public readonly row: number,
        public readonly col: number,
        public readonly board: BoardModel,
        public readonly piece?: PieceModel,
    ) {

        this.id = `r${row}-c${col}`;
        this.color = getSquareColor(row, col);
    }
}