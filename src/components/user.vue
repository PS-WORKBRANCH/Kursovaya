<script setup>
import { useRouter } from 'vue-router';
import useUsers from '../composables/useUsers';

const users = useUsers()
const router = useRouter()
// console.log(users.userList.value);
// console.log(List);
// console.log(List.login);


</script>

<template>
  <div class="users-container">
    <div class="users-card">
      <div class="users-header">
        <h2 class="users-title">Пользователи</h2>
        <p class="users-subtitle">Всего пользователей: {{ users.userList.value.length }}</p>
      </div>

      <div class="users-content">
        <!-- v-if="users.userList.length > 0" -->
        <div class="table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Логин</th>
                <th>Email</th>
                <th>ФИО</th>
                <th>Телефон</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.userList.value" class="user-row">
                <td class="number">{{ user.id }}</td>
                <td>{{ user.login }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.lastName }} {{ user.firstName }} {{ user.middleName }}</td>
                <td>{{ user.phone || '-' }}</td>
                <!-- <td><button @click="Del(user.id)">Удалить пользователя</button></td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <div v-else class="empty-state">
          <p>Нет зарегистрированных пользователей</p>

        </div> -->
      </div>


    </div>
  </div>
</template>

<style scoped>
.users-container {
  min-height: calc(100vh - 80px);
}
.users-card {
  padding: 2rem;
}
.users-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
}
.table-container {
  overflow-x: auto;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.users-table th,
.users-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}
.number {
  font-weight: 600;
}
@media (max-width: 768px) {
  .users-card {
    padding: 1.5rem;
  }
  .users-table th,
  .users-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>