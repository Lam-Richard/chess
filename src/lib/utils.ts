import { SquareColor } from "./enums";

export function getSquareColor(row: number, col: number): SquareColor {
    if (row % 2 === col % 2) {
        return SquareColor.Light;
    } else {
        return SquareColor.Dark;
    }
}