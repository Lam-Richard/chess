<script lang="ts">
	import { getStartingPieceBySquare } from '$lib/utils';
	import Square from './Square.svelte';
	const BOARD_SIZE = 8;




</script>

<div class="chessboard">
	{#each { length: BOARD_SIZE }, row}
		{#each { length: BOARD_SIZE }, col}
			<Square 
				{row} 
				{col} 
				piece={getStartingPieceBySquare(row, col)}></Square>
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
