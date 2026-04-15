<script setup>
import { reactive, ref } from 'vue';
import useSubject from '../composables/useSubject';
import { useRouter } from 'vue-router';

const subjects = useSubject();
const router = useRouter();

const SubjectData = reactive({
    name: '',
    number: '',
    characher: ''
});

// Объект для ошибок
const errors = reactive({
    name: '',
    number: '',
    characher: ''
});

const successMessage = ref('');

function add() {
    // Сброс ошибок и сообщения
    errors.name = '';
    errors.number = '';
    errors.characher = '';
    successMessage.value = '';

    let hasError = false;

    // Валидация названия
    if (!SubjectData.name.trim()) {
        errors.name = 'Введите название товара';
        hasError = true;
    } else if (SubjectData.name.length < 3) {
        errors.name = 'Название должно содержать минимум 3 символа';
        hasError = true;
    }

    // Валидация цены
    if (SubjectData.number === '' || SubjectData.number === null) {
        errors.number = 'Введите цену';
        hasError = true;
    } else if (isNaN(SubjectData.number) || SubjectData.number <= 0) {
        errors.number = 'Цена должна быть больше 0';
        hasError = true;
    }

    // Валидация описания
    if (!SubjectData.characher.trim()) {
        errors.characher = 'Введите описание товара';
        hasError = true;
    } else if (SubjectData.characher.length < 10) {
        errors.characher = 'Описание должно содержать минимум 10 символов';
        hasError = true;
    }

    if (hasError) return;

    // Если ошибок нет – добавляем товар
    subjects.SubjectFunction(SubjectData.name, SubjectData.number, SubjectData.characher);
    successMessage.value = 'Товар успешно добавлен!';

    // Очищаем форму
    SubjectData.name = '';
    SubjectData.number = '';
    SubjectData.characher = '';

    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
        successMessage.value = '';
    }, 3000);
}
</script>

<template>
    <div class="container">
        <h1>Создание товара</h1>
        <h4>Обязательно заполнить все поля ввода</h4>
        <hr>

        <!-- Поле Название -->
        <input type="text" placeholder="Название товара" v-model="SubjectData.name" :class="{ error: errors.name }">
        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>

        <!-- Поле Цена -->
        <input type="number" placeholder="Цена" v-model="SubjectData.number" :class="{ error: errors.number }">
        <div v-if="errors.number" class="error-message">{{ errors.number }}</div>

        <!-- Поле Описание -->
        <input type="text" placeholder="Описание товара" v-model="SubjectData.characher"
            :class="{ error: errors.characher }">
        <div v-if="errors.characher" class="error-message">{{ errors.characher }}</div>

        <button @click="add">Добавить товар</button>

        <!-- Сообщение об успехе -->
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <h1>Удаление товаров</h1>
        <div v-for="item in subjects.SubjectList.value" :key="item.id" class="SubjectContainer">
            <div class="card">
                {{ item?.name }}
                <button @click="subjects.SubjectDel(item.id)">Удалить товар</button>
                <button @click="router.push({ name: 'subject', params: { id: item.id } })">Перейти на товар</button>
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
.container > input,
.container > button {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  box-sizing: border-box;
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
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}
.SubjectContainer {
  width: 100%;
  height: auto;
}
.SubjectContainer > div:last-child {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.success-message {
  margin-top: 10px;
  text-align: center;
}
</style>