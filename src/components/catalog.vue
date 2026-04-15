<script setup>
import useSubject from '../composables/useSubject';
import { useRouter } from 'vue-router';
import useUsers from '../composables/useUsers';
import Stars from './Stars.vue';

const users = useUsers();
const subjects = useSubject();
const router = useRouter();
</script>

<template>
  <div class="container">
    <div v-if="users.isAdmin.value?.role == 'admin'">
      <h1 style="color: red;">Вы зашли под админом!!!</h1>
    </div>

    <div class="cards-grid">
      <div v-for="item in subjects.SubjectList.value" :key="item.id" class="SubjectContainer">
        <div class="picture">
          <img :src="item?.picture" alt="">
        </div>
        <div>
          <div class="product-name">{{ item?.name }}</div>
          
          <!-- Блок рейтинга -->
          <div class="product-rating">
            <Stars :rating="subjects.averageRating(item)" />
            <span class="reviews-count">({{ item.reviews?.length || 0 }})</span>
          </div>
          
          <div class="product-price">{{ item?.number }} ₽</div>
          
          <button @click="router.push({ name: 'subject', params: { id: item.id } })">Перейти на товар</button>
          <button v-if="users.isAdmin.value" @click="users.addToCartWithNotification(item)">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}
.picture {
  height: 170px;
  overflow: hidden;
  background: transparent;
}
.picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.SubjectContainer:hover .picture img {
  transform: scale(1.05);
}
.SubjectContainer > div:last-child {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product-name {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3em;
}
.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
}
.reviews-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--button);
  margin: 8px 0 4px;
}
button {
  padding: 8px 12px;
  border: none;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 4px;
}
button:first-of-type {
  background: var(--info);
  color: white;
}
button:first-of-type:hover {
  background: var(--info-hover);
}
button:last-of-type {
  background: var(--button);
  color: var(--button-text);
}
button:last-of-type:hover {
  background: var(--button-hover);
}
</style>