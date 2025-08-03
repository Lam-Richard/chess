<script lang="ts">    
    let { pieceColor, pieceType } = $props();

    let src = `images/chess-pieces/${pieceColor}${pieceType}.jpg`
    let alt = `A ${pieceColor} ${pieceType}.`
</script>

<img class="piece" {src} {alt}/>

<style>
</style>