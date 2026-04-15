<script setup>
import { ref, reactive, computed } from 'vue';
import useUsers from '../composables/useUsers';
import { useRouter } from 'vue-router';

const users = useUsers()
const router = useRouter()
const isAdmin = computed(() => users.isAdmin.value)

const login = ref('');
const password = ref('');

const errors = reactive({
  login: '',
  password: '',
  general: ''
});

function checkLogin() {
  errors.login = '';
  errors.password = '';
  errors.general = '';

  if (!login.value.trim()) {
    errors.login = 'Введите логин';
  } else {
    errors.login = '';

  }

  if (!password.value.trim()) {
    errors.password = 'Введите пароль';
  } else {
    errors.password = '';
  }

  const foundUser = users.findUser(login, password)
  // console.log(foundUser);

  if (foundUser) {
    errors.general = 'Успешный вход';
    localStorage.setItem('admin', users.check.value)

    setTimeout(() => {
      router.push({ name: 'catalog' })
      login.value = '';
      password.value = '';
    }, 500);
  } else {
    errors.general = 'Неверный логин или пароль';
  }
}


</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Вход в систему</h2>

      <div class="form-group">
        <label class="form-label">Логин</label>
        <input type="text" v-model="login" placeholder="Введите логин" class="form-input" ">
        <div v-if="errors.login" class="error-message">{{ errors.login }}
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Пароль</label>
      <input type="password" v-model="password" placeholder="Введите пароль" class="form-input" ">
        <div v-if="errors.password" class="error-message">{{ errors.password }}
    </div>
  </div>

  <div v-if="errors.general" class="form-message">
    {{ errors.general }}
  </div>

  <button class=" submit-btn" @click="checkLogin()">
    Войти
  </button>
  </div>
  </div>
</template>


<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 390px);
}
.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
}
.error-message {
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
.form-message {
  padding: 0.75rem;
  text-align: center;
  margin-bottom: 1rem;
}
.submit-btn {
  width: 100%;
  margin-bottom: 1.5rem;
}
</style>