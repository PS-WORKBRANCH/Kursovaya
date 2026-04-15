<script setup>
import { computed } from 'vue';
import useUsers from '../composables/useUsers';
import { useRouter } from 'vue-router';

const users = useUsers();
const router = useRouter();

const cartItems = computed(() => {
  if (!users.isAdmin.value || !users.isAdmin.value.tovars) return [];
  return Object.values(users.isAdmin.value.tovars);
});

function removeFromCart(productId) {
  if (!users.isAdmin.value) return;
  delete users.isAdmin.value.tovars[productId];
  saveCartToUser();
}

function updateQuantity(productId, delta) {
  if (!users.isAdmin.value) return;
  const item = users.isAdmin.value.tovars[productId];
  if (!item) return;
  const newQuantity = item.quantity + delta;
  if (newQuantity <= 0) {
    removeFromCart(productId);
  } else {
    item.quantity = newQuantity;
    saveCartToUser();
  }
}

function saveCartToUser() {
  // Обновляем запись пользователя в userList и сохраняем
  const index = users.userList.value.findIndex(u => u.id === users.isAdmin.value.id);
  if (index !== -1) users.userList.value[index] = users.isAdmin.value;
  localStorage.setItem('userList', JSON.stringify(users.userList.value));
  users.saveAuth(); // если нужна синхронизация isAdmin
}

function totalPrice() {
  return cartItems.value.reduce((sum, item) => sum + (item.number * item.quantity), 0);
}
</script>

<template>
  <div class="cart-container">
    <div class="cart-card">
      <h2 class="cart-title">Корзина</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">Корзина пуста</div>
      <div v-else>
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.picture" class="cart-item-img" />
            <div class="cart-item-info">
              <h4>{{ item.name }}</h4>
              <p class="cart-item-price">{{ item.number }} ₽</p>
              <div class="quantity-control">
                <button class="qty-btn" @click="updateQuantity(item.id, -1)">–</button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="updateQuantity(item.id, 1)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="removeFromCart(item.id)">Удалить</button>
          </div>
        </div>
        <div class="cart-total">
          <h3>Итого: {{ totalPrice() }} ₽</h3>
          <button class="checkout-btn" @click="router.push({ name: 'checkout' })">Оформить заказ</button>
        </div>
      </div>
      <button class="back-btn" @click="router.push({ name: 'catalog' })">Продолжить покупки</button>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.cart-card {
  background: var(--bg-card);
  border-radius: 28px;
  padding: 24px;
}
.cart-title {
  text-align: center;
  margin-bottom: 24px;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.cart-item {
  display: flex;
  gap: 20px;
  background: var(--bg-elevated);
  border-radius: 20px;
  padding: 16px;
  border-left: 4px solid var(--accent);
  transition: var(--transition);
}
.cart-item:hover {
  transform: translateX(4px);
}
.cart-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 16px;
}
.cart-item-info {
  flex: 1;
}
.cart-item-info h4 {
  margin: 0 0 8px;
  font-size: 1rem;
}
.cart-item-price {
  font-weight: 700;
  color: var(--button);
  margin: 4px 0;
}
.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}
.qty-btn {
  background: var(--button);
  border: none;
  color: var(--button-text);
  width: 32px;
  height: 32px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
}
.qty-btn:hover {
  background: var(--button-hover);
}
.qty-value {
  font-weight: 600;
  font-size: 1.1rem;
  min-width: 30px;
  text-align: center;
}
.remove-btn {
  background: var(--danger);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 40px;
  cursor: pointer;
  align-self: center;
}
.cart-total {
  margin-top: 24px;
  text-align: right;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}
.checkout-btn, .back-btn {
  margin-top: 12px;
  margin-left: 12px;
}
.empty-cart {
  text-align: center;
  padding: 40px;
}
</style>