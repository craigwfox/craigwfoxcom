<script setup>
import { ref, onMounted } from "vue"
const props = defineProps({
  title: String,
  link: String,
  showPage: Boolean,
})
</script>

<template>
  <a v-if="props.showPage" :href="props.link">
    <h3>{{ props.title }}</h3>
  </a>
  <h3 v-else>{{ props.title }}</h3>
</template>
