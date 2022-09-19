<template>
	<BabylonCanvas/>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import BabylonCanvas from "./components/BabylonCanvas.vue";

export default defineComponent({
	name: "App",
	components: {
		BabylonCanvas
	}
});
</script>

<style>

</style>
