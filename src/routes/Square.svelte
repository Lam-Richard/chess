<script lang="ts">
	import { getSquareColor } from "$lib/utils";
	import Piece from "./Piece.svelte";

	let { row, col, piece } = $props();
	const squareColor = getSquareColor(row, col);
</script>

<div>
	<div
		class="
        square-base
        square-{squareColor} 
        r{row}-c{col}"
	>
		{#if piece}
			<Piece pieceColor={piece.pieceColor} pieceType={piece.pieceType}></Piece>
		{/if}
	</div>
</div>

<style>
	.square-base {
		display: flex;
		aspect-ratio: 1 / 1;

		width: 2rem;
	}

	.square-dark {
		background-color: forestgreen;
	}

	.square-light {
		background-color: white;
	}
</style>
