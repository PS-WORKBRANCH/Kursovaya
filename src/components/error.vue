<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>
<template>
    <div v-if="route.params.Errors === '403'">
        <h1>403 error</h1>
    </div>
    <div v-else>
        <h1>404 error</h1>
    </div>
</template>