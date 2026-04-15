<script setup>
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useSubject from '../composables/useSubject';

const subjects = useSubject();
const route = useRoute();
const router = useRouter();

const chel = computed(() => subjects.findSubject(Number(route.params.id)));


</script>

<template>
    <div class="product-detail">
        <div class="card">
            <div class="card-info">
                <h2>Характеристики:</h2>
                <h4>{{ chel.characher }}</h4>
                <p class="price"> {{ chel.number }}₽</p> 
            </div>
        </div>


    </div>
</template>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.card {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.card-image {
  flex: 0 0 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.price {
  font-size: 1.8rem;
  margin: 0;
}
</style>