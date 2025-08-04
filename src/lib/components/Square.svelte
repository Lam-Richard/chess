<script lang="ts">
	import Piece from "./Piece.svelte";

	let { square } = $props();
</script>

<div>
	<div
		class="
        square-base
        square-{square.color} 
        {square.id}"
	>
		{#if square.piece}
			<Piece piece={square.piece}></Piece>
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
