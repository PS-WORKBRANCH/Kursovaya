<template>
  <div class="stars">
    <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= rating }">★</span>
    <span v-if="rating === 0" class="no-rating">Нет оценок</span>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.star {
  font-size: 1.2rem;
  color: #555;
}
.star.filled {
  color: #ffc107;
}
.no-rating {
  font-size: 0.8rem;
  color: #aaa;
  margin-left: 8px;
}
</style>