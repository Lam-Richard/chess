<script lang="ts">
	import { getSquareColor } from '$lib/utils';

	let { row, col, piece } = $props();
	let squareColor = getSquareColor(row, col);
</script>

<div>
	<div
		class="
        square-base
        square-{squareColor} 
        r{row}-c{col}"
	>{piece}</div>
</div>

<style>
	.square-base {
		display: flex;
		aspect-ratio: 1 / 1;

		width: 1ch;
		padding: 1rem;
	}

	.square-dark {
		background-color: forestgreen;
	}

	.square-light {
		background-color: white;
	}
</style>
