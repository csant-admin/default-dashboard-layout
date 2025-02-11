<template>
    <h1>Home Page</h1>
</template>
<script setup>
    import { ref } from 'vue'
    const api = useLaravelAPI()
    console.log('This is the API SET By: Charlie Santander : ', api)
    definePageMeta({
		layout: "root-layout",
	});
</script>
<style scoped>

</style>