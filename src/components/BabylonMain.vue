<template>
	<canvas></canvas>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {GettingStarted} from "../Exercises/1-Getting-Started/1-Getting-Started";
import {MeshesAndCurves} from "../Exercises/2-Meshes-and-Curves/2-Meshes-And-Curves";
import {Textures} from "../Exercises/3-Textures/3-Textures";

export default defineComponent({
	name: "BabylonMain",
	mounted() {
		const canvas = document.querySelector("canvas")!;
		new GettingStarted(canvas);
		// new MeshesAndCurves(canvas);
		// new Textures(canvas);
	}
});
</script>

<style scoped>
canvas {
	box-sizing: border-box;
	width: 100vw;
	height: 100vh;
}
</style>
