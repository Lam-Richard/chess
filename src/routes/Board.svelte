<script lang="ts">
	enum SquareColor {
		Light = 'light',
		Dark = 'dark'
	}

	interface Square {
		row: number;
		col: number;
		color: SquareColor;
		id: string;
	};

	function getSquareColor(row: number, col: number): SquareColor {
		if (row % 2 === col % 2) {
			return SquareColor.Light;
		} else {
			return SquareColor.Dark;
		}
	}

	const BOARD_SIZE = 8;

	let board: Square[][] = Array.from({ length: BOARD_SIZE }, (_, r) =>
		Array.from({ length: BOARD_SIZE }, (_, c) => ({
			row: r,
			col: c,
			color: getSquareColor(r, c),
			id: `r${r}-c${c}`
		}))
	);
</script>

<div class="chessboard">
	{#each { length: BOARD_SIZE }, row}
		{#each { length: BOARD_SIZE }, col}
			<div class="square {board[row][col].color}Square"></div>
		{/each}
	{/each}
</div>

<style>
	.chessboard {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(8, 1fr);

		width: fit-content;

		border: 0.25rem solid black;
	}
	.square {
		display: flex;
		aspect-ratio: 1 / 1;

		width: 1ch;
		padding: 1rem;
	}

	.darkSquare {
		background-color: forestgreen;
	}

	.lightSquare {
		background-color: white;
	}
</style>
