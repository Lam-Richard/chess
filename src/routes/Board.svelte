<script lang="ts">
	import { BoardModel } from '$lib/models/BoardModel';
	import Square from './Square.svelte';
	
	let board = new BoardModel();
</script>

<div class="chessboard">
	{#each board.squares as row }
		{#each row as square}
			<Square {square}></Square>
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
