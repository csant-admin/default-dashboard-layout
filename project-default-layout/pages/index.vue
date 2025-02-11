<template>
    <h1>Home Page</h1>
</template>
<script setup>
    import { ref } from 'vue'
    const api = useLaravelAPI()

    definePageMeta({
		layout: "root-layout",
	});
</script>
<style scoped>

</style>