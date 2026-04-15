<script setup>
import { reactive } from 'vue';
import useUsers from '../composables/useUsers';
import { useRouter } from 'vue-router';

const users = useUsers()
const router = useRouter()

const form = reactive({
  email: '',
  login: '',
  lastName: '',
  firstName: '',
  middleName: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  email: '',
  login: '',
  lastName: '',
  firstName: '',
  middleName: '',
  phone: '',
  password: '',
  confirmPassword: ''
});


function checkRegister() {
  errors.email = '';
  errors.login = '';
  errors.lastName = '';
  errors.firstName = '';
  errors.middleName = '';
  errors.phone = '';
  errors.password = '';
  errors.confirmPassword = '';

  let hasErrors = false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!form.email.trim()) {
    errors.email = 'Введите email';
    hasErrors = true;
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Введите корректный email';
    hasErrors = true;
  }

  // const foundlogin = users.findLogin(form.login)

  const loginRegex = /^[a-zA-Z0-9_-]{3,}$/;
  if (!form.login.trim()) {
    errors.login = 'Введите логин';
    hasErrors = true;
  } else if (!loginRegex.test(form.login)) {
    errors.login = 'Логин должен быть от 3 символов (буквы, цифры, _ и -)';
    hasErrors = true;
    // } else if (foundlogin) {
    //   console.log(!foundlogin);
    //   console.log(foundlogin);
    //   console.log(form.login);

    //   errors.login = 'Этот логин уже занят';
    //   hasErrors = true;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!form.password.trim()) {
    errors.password = 'Введите пароль';
    hasErrors = true;
  } else if (!passwordRegex.test(form.password)) {
    errors.password = 'Пароль: 8+ символов, заглавная буква и цифра';
    hasErrors = true;
  }

  if (form.password != form.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
    hasErrors = true;
  }

  if (form.phone.trim()) {
    const phoneRegex = /^(\+7|7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    if (!phoneRegex.test(form.phone)) {
      errors.phone = 'Формат: +7 (XXX) XXX-XX-XX';
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    users.UsersFunction(
      form.login,
      form.email,
      form.lastName,
      form.firstName,
      form.middleName,
      form.phone,
      form.password)


    form.email = '';
    form.login = '';
    form.lastName = '';
    form.firstName = '';
    form.middleName = '';
    form.phone = '';
    form.password = '';
    form.confirmPassword = '';


    router.push({ name: 'auto' })
  }
}
</script>

<template>
  <div class="registr-page">
    <div class="registr-card">
      <h2 class="registr-title">Регистрация</h2>
      <div class="form-info">
        <p>* - обязательные поля</p>
      </div>
      <div class="form-container">
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input type="email" v-model="form.email" placeholder="example@mail.ru" class="form-input"
            :class="{ error: errors.email }">
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Логин *</label>
          <input type="text" v-model="form.login" placeholder="Введите логин" class="form-input"
            :class="{ error: errors.login }">
          <div v-if="errors.login" class="error-message">{{ errors.login }}</div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Пароль *</label>
          <input type="password" v-model="form.password" placeholder="Минимум 8 символов, заглавная буква и цифра"
            class="form-input" :class="{ error: errors.password }">
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Повторите пароль *</label>
          <input type="password" v-model="form.confirmPassword" placeholder="Повторите пароль" class="form-input"
            :class="{ error: errors.confirmPassword }">
          <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Телефон</label>
          <input type="tel" v-model="form.phone" placeholder="+7 (999) 123-45-67" class="form-input"
            :class="{ error: errors.phone }">
          <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Фамилия</label>
          <input type="text" v-model="form.lastName" placeholder="Иванов" class="form-input"
            :class="{ error: errors.lastName }">
          <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Имя</label>
          <input type="text" v-model="form.firstName" placeholder="Иван" class="form-input"
            :class="{ error: errors.firstName }">
          <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Отчество</label>
          <input type="text" v-model="form.middleName" placeholder="Иванович" class="form-input"
            :class="{ error: errors.middleName }">
          <div v-if="errors.middleName" class="error-message">{{ errors.middleName }}</div>
        </div>





        <button class="submit-btn" @click="checkRegister()">
          Зарегистрироваться
        </button>


      </div>
    </div>
  </div>
</template>


<style scoped>
.registr-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
}

.registr-card {
  width: 100%;
  max-width: 600px;
  min-width: 400px;
  padding: 2.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  margin-bottom: 0.5rem;
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

.form-info {
  margin: 1rem 0;
  padding: 0.75rem;
  text-align: center;
}

.submit-btn {
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .registr-card {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}
</style>