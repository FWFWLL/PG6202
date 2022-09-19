<template>
	<canvas></canvas>
</template>

<script lang="ts">
import {defineComponent} from "vue";

// import {GettingStarted} from "@/exercises/1-Getting-Started";
// import {MeshesAndCurves} from "@/exercises/2-Meshes-and-Curves";
import {Textures} from "@/exercises/3-Textures";

export default defineComponent({
	name: "BabylonCanvas",
	mounted() {
		const canvas = document.querySelector("canvas")!;
		// new GettingStarted(canvas);
		// new MeshesAndCurves(canvas);
		new Textures(canvas);
	},
});

</script>

<style scoped>
canvas {
	width: 100%;
	height: 100%;
	touch-action: none;
}
</style>
