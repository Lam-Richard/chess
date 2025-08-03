<script lang="ts">    
    let { piece } = $props();
    console.log(`Piece: ${piece}`);
    console.log(`Piece Color: ${piece}`);
    console.log(`Piece Type: ${piece}`);

    let src = `images/chess-pieces/${piece.color}${piece.type}.jpg`
    let alt = `A ${piece.color} ${piece.type}.`
</script>

<img class="piece" {src} {alt}/>

<style>
</style>