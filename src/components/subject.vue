<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useSubject from '../composables/useSubject';
import useUsers from '../composables/useUsers';
import Stars from './Stars.vue';

const users = useUsers();
const subjects = useSubject();
const route = useRoute();
const router = useRouter();

const chel = computed(() => subjects.findSubject(Number(route.params.id)));

// Данные для нового отзыва
const newReview = ref({
    rating: 5,
    text: ''
});
const reviewMessage = ref('');

function submitReview() {
    if (!users.isAdmin.value) {
        reviewMessage.value = 'Только авторизованные пользователи могут оставлять отзывы';
        return;
    }
    if (!newReview.value.text.trim()) {
        reviewMessage.value = 'Введите текст отзыва';
        return;
    }
    const success = subjects.addReview(chel.value.id, {
        author: users.isAdmin.value.login,
        rating: newReview.value.rating,
        text: newReview.value.text
    });
    if (success) {
        reviewMessage.value = 'Отзыв добавлен!';
        newReview.value.text = '';
        newReview.value.rating = 5;
        // Обновляем реактивность (chel пересчитается)
        setTimeout(() => reviewMessage.value = '', 3000);
    } else {
        reviewMessage.value = 'Ошибка при добавлении отзыва';
    }
}

// Вычисляем средний рейтинг
const avgRating = computed(() => subjects.averageRating(chel.value));
</script>

<template>
    <div class="product-detail">
        <div class="card" v-if="chel">
            <!-- Верхняя часть без изменений -->
            <div class="product-top">
                <div class="card-image">
                    <img :src="chel.picture" :alt="chel.name" />
                </div>
                <div class="card-info">
                    <h2>{{ chel.name }}</h2>
                    <div class="rating-block">
                        <Stars :rating="avgRating" />
                        <span class="rating-count">({{ chel.reviews?.length || 0 }} отзывов)</span>
                    </div>
                </div>
                <div class="price-actions">
                    <div class="price">{{ chel.number }} ₽</div>
                    <button v-if="users.isAdmin.value" @click="users.addToCartWithNotification(chel)">Добавить в корзину</button>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Характеристики -->
            <div class="product-description">
                <h3>Характеристики</h3>
                <p>{{ chel.characher }}</p>
            </div>

            <!-- Блок отзывов -->
            <div class="reviews-section">
                <h3>Отзывы покупателей</h3>

                <!-- Форма добавления отзыва (только для авторизованных) -->
                <div v-if="users.isAdmin.value" class="add-review">
                    <h4>Оставить отзыв</h4>
                    <div class="rating-select">
                        <label>Оценка:</label>
                        <select v-model.number="newReview.rating">
                            <option :value="5">5 ★</option>
                            <option :value="4">4 ★</option>
                            <option :value="3">3 ★</option>
                            <option :value="2">2 ★</option>
                            <option :value="1">1 ★</option>
                        </select>
                    </div>
                    <textarea v-model="newReview.text" placeholder="Ваш отзыв..." rows="3"></textarea>
                    <button @click="submitReview">Отправить отзыв</button>
                    <p v-if="reviewMessage" class="review-message">{{ reviewMessage }}</p>
                </div>

                <!-- Список отзывов -->
                <div v-if="chel.reviews && chel.reviews.length > 0" class="reviews-list">
                    <div v-for="(rev, idx) in chel.reviews.slice().reverse()" :key="idx" class="review-item">
                        <div class="review-header">
                            <strong>{{ rev.author }}</strong>
                            <span class="review-date">{{ rev.date }}</span>
                            <Stars :rating="rev.rating" />
                        </div>
                        <p class="review-text">{{ rev.text }}</p>
                    </div>
                </div>
                <div v-else class="no-reviews">
                    Пока нет отзывов. Будьте первым!
                </div>
            </div>

            <RouterLink :to="{ name: 'edit' }" v-if="users.isAdmin.value?.role == 'admin'">
                <button>Редактировать</button>
            </RouterLink>
        </div>
        <div v-else class="not-found">
            <h1>404 Error</h1>
            <h3>Такой товар не найден</h3>
        </div>
        <RouterView />
    </div>
</template>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.card {
  padding: 24px;
}
.product-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}
.card-image {
  flex: 0 0 180px;
  height: 180px;
  border-radius: 20px;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-info {
  flex: 2;
  min-width: 200px;
}
.card-info h2 {
  margin: 0;
  font-size: 1.6rem;
}
.price-actions {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}
.price {
  font-size: 2rem;
  white-space: nowrap;
}
.divider {
  margin: 24px 0 20px;
}
.product-description h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
}
.product-description p {
  line-height: 1.6;
  padding: 16px;
  white-space: pre-wrap;
}
.rating-block {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}
.rating-count {
  font-size: 0.85rem;
}
.reviews-section {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.add-review {
  padding: 20px;
  margin-bottom: 24px;
}
.add-review h4 {
  margin-bottom: 12px;
}
.rating-select {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.rating-select select {
  width: auto;
  padding: 6px 12px;
}
.add-review textarea {
  width: 100%;
  margin-bottom: 12px;
}
.review-message {
  margin-top: 8px;
  font-size: 0.85rem;
}
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.review-item {
  padding: 16px;
}
.review-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.review-date {
  font-size: 0.75rem;
}
.no-reviews {
  text-align: center;
  padding: 30px;
}
@media (max-width: 700px) {
  .product-top {
    flex-direction: column;
    text-align: center;
  }
  .price-actions {
    align-items: center;
  }
  .card-info h2 {
    text-align: center;
  }
}
</style>