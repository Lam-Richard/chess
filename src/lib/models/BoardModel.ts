import { getStartingPieceBySquare } from "$lib/utils";
import { SquareModel } from "./SquareModel";

const BOARD_SIZE = 8;

export class BoardModel {
    public readonly squares: SquareModel[][]
    constructor() {
        this.squares = Array.from({ length: BOARD_SIZE }, (_, row) =>
            Array.from({ length: BOARD_SIZE }, (_, col) => (
                new SquareModel(
                    row,
                    col,
                    this,
                    getStartingPieceBySquare(row, col, this)
                )
            ))
        );
    }

    getSquare(row: number, col: number): SquareModel {
        if (row < 0 || row > 7) {
            throw new RangeError(`Expected row to be between in [0, 7] but was ${row}`);
        }

        if (col < 0 || col > 7) {
            throw new RangeError(`Expected col to be between in [0, 7] but was ${col}`);
        }

        return this.squares[row][col];
    }
}