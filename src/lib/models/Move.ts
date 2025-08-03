import type { MoveType } from "$lib/enums";
import type { PiecePosition } from "./PieceModel";

export abstract class Move {
    public abstract readonly moveType: MoveType;
    constructor(
        public readonly oldPosition: PiecePosition,
        public readonly newPosition: PiecePosition,
    ) { }
}