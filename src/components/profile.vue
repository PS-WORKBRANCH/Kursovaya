<script setup>
import { onMounted } from 'vue';
import useUsers from '../composables/useUsers';
import { useRouter } from 'vue-router';

const users = useUsers();
const router = useRouter();

// onMounted(() => {
//   console.log(users.isAdmin.value);
//   console.log(users.userList.value);
// });
</script>

<template>
  <div v-if="users.isAdmin.value" class="profile-container">
    <div class="users-content">
      <div class="picture">
        <img src="../assets/ava.jpg" alt="">
      </div>
      <div class="info">
        <div class="flex">
          <h2>Логин</h2>
          {{ users.isAdmin.value.login }}
        </div>
        <div class="flex">
          <h2>Почта</h2>
          {{ users.isAdmin.value.email }}
        </div>
        <div class="flex">
          <h2>ФИО</h2>
          {{ users.isAdmin.value.lastName }} {{ users.isAdmin.value.firstName }} {{ users.isAdmin.value.middleName }}
        </div>
        <div class="flex">
          <h2>Телефон</h2>
          {{ users.isAdmin.value.phone || '-' }}
        </div>
      </div>
    </div>

    <!-- История заказов -->
    <div class="orders-section" v-if="users.isAdmin.value.orders && users.isAdmin.value.orders.length > 0">
      <h3>История заказов</h3>
      <div v-for="order in users.isAdmin.value.orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-number">Заказ №{{ order.id }}</div>
          <div class="order-date">{{ order.date }}</div>
        </div>

        <div class="order-items">
          <div class="order-items-title">Товары:</div>
          <div v-for="(item, idx) in order.items" :key="idx" class="order-item">
            <span class="order-item-name">{{ item.name }}</span>
            <span class="order-item-qty">{{ item.quantity }} шт.</span>
            <span class="order-item-price">{{ item.number * item.quantity }} ₽</span>
          </div>
        </div>

        <div class="order-delivery-info">
          <div class="order-delivery-address">
            <span class="label">Адрес доставки:</span> {{ order.delivery.address }}
          </div>
          <div class="order-payment-method">
            <span class="label">Оплата:</span>
            <span v-if="order.delivery.paymentMethod === 'card'">Банковская карта</span>
            <span v-else-if="order.delivery.paymentMethod === 'cash'">Наличные при получении</span>
            <span v-else>Онлайн-перевод</span>
          </div>
          <div v-if="order.delivery.comment" class="order-comment">
            <span class="label">Комментарий:</span> {{ order.delivery.comment }}
          </div>
        </div>

        <div class="order-total">
          Итого: {{ order.total }} ₽
        </div>
      </div>
    </div>
    <div v-else class="empty-orders">
      <p>У вас пока нет заказов</p>
    </div>
  </div>
</template>
<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.users-content {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
  min-height: 300px;
  padding: 2.5rem;
}
.picture img {
  width: 40px;
}
.orders-section {
  width: 100%;
  max-width: 600px;
  padding: 1.5rem;
}
.order-card {
  padding: 1rem;
  margin-bottom: 1rem;
}
.order-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.order-item {
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
}
.order-total {
  text-align: right;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .profile-container {
    width: 100%;
    padding: 0 16px;
    gap: 16px;
  }
  .users-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    max-width: 100%;
  }
  .picture img {
    width: 60px;
    margin-bottom: 12px;
  }
  .info {
    width: 100%;
  }
  .info .flex {
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
  .orders-section {
    padding: 1rem;
    max-width: 100%;
  }
  .order-card {
    padding: 0.8rem;
  }
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .order-item-name {
    font-size: 0.9rem;
  }
  .order-item-qty, .order-item-price {
    font-size: 0.85rem;
  }
  .order-delivery-info {
    padding: 8px;
  }
  .order-total {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .users-content {
    padding: 1rem;
  }
  .info .flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .info h2 {
    font-size: 1rem;
    min-width: 80px;
  }
  .order-number {
    font-size: 1rem;
  }
  .order-date {
    font-size: 0.7rem;
  }
  .order-total {
    font-size: 1rem;
  }
}
</style>