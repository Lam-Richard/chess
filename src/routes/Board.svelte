<script lang="ts">
	import Square from './Square.svelte';

	interface Square {
		row: number;
		col: number;
		id: string;
	}

	const BOARD_SIZE = 8;

	let board: Square[][] = Array.from({ length: BOARD_SIZE }, (_, r) =>
		Array.from({ length: BOARD_SIZE }, (_, c) => ({
			row: r,
			col: c,
			id: `r${r}-c${c}`
		}))
	);
</script>

<div class="chessboard">
	{#each { length: BOARD_SIZE }, row}
		{#each { length: BOARD_SIZE }, col}
			<Square {row} {col} piece={null}></Square>
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
</style>
