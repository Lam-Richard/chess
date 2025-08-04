import { PieceColor, PieceType } from "$lib/enums";
import type { BoardModel } from "./BoardModel";
import { BasicMove, type Move } from "./Move";
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

    private moveUpwards(unit: number): PiecePosition {
        let { row, col } = this.position;

        if (this.color === PieceColor.Black) {
            return new PiecePosition(row + unit, col)
        }

        return new PiecePosition(row - unit, col)
    }

    private moveLeftCapture(): PiecePosition {
        let { row, col } = this.position;

        if (this.color === PieceColor.Black) {
            return new PiecePosition(row + 1, col - 1)
        }

        return new PiecePosition(row - 1, col - 1)
    }

    private moveRightCapture(): PiecePosition {
        let { row, col } = this.position;

        if (this.color === PieceColor.Black) {
            return new PiecePosition(row + 1, col + 1)
        }

        return new PiecePosition(row - 1, col + 1)
    }
    
    hasPieceMoved(): boolean {
        if (this.color === PieceColor.Black) {
            return this.position.row !== 1
        }

        return this.position.row !== 6
    }

    getAvailableMoves(): Move[] {
        let moves: Move[] = [];

        let oldPosition = this.position;
        let { row, col } = oldPosition;

        // Moving Up Once
        let upOncePosition = this.moveUpwards(1);
        let upOnceIsEmpty = !this.board.getSquare(upOncePosition);
        if (upOnceIsEmpty) {
            moves.push(
                new BasicMove(
                    oldPosition,
                    upOncePosition
                )
            )
        }

        // Moving Up Twice
        let upTwicePosition = this.moveUpwards(2);
        let upTwiceIsEmpty = !this.board.getSquare(upTwicePosition);

        if (!this.hasPieceMoved() && upOnceIsEmpty && upTwiceIsEmpty) {
            moves.push(
                new BasicMove(
                    oldPosition,
                    upOncePosition
                )
            )
        }

        // Side Captures


        // En Passant

        return moves;
    }
}
