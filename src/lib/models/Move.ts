import { MoveType } from "$lib/enums";
import type { PiecePosition } from "./PieceModel";

export abstract class Move {
    public abstract readonly moveType: MoveType;
    constructor(
        public readonly oldPosition: PiecePosition,
        public readonly newPosition: PiecePosition,
    ) { }
}

export class BasicMove extends Move {
    public readonly moveType: MoveType;
    constructor(
        public readonly oldPosition: PiecePosition,
        public readonly newPosition: PiecePosition,
    ) {
        super(oldPosition, newPosition)
        this.moveType = MoveType.Basic
     }
}

export class Capture extends Move {
    public readonly moveType: MoveType;
    constructor(
        public readonly oldPosition: PiecePosition,
        public readonly newPosition: PiecePosition,
    ) {
        super(oldPosition, newPosition)
        this.moveType = MoveType.Capture
     }
}

