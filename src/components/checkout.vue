<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useUsers from '../composables/useUsers';

const users = useUsers();
const router = useRouter();

const showModal = ref(false);
const orderSuccess = ref(false);

const form = reactive({
    address: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    comment: ''
});

const errors = reactive({
    address: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    general: ''
});

function validateForm() {
    let hasErrors = false;
    
    if (!form.address.trim()) {
        errors.address = 'Введите адрес доставки';
        hasErrors = true;
    } else if (form.address.trim().length < 10) {
        errors.address = 'Укажите полный адрес (улица, дом, квартира)';
        hasErrors = true;
    } else {
        errors.address = '';
    }
    
    if (!form.paymentMethod) {
        errors.paymentMethod = 'Выберите способ оплаты';
        hasErrors = true;
    } else {
        errors.paymentMethod = '';
    }
    
    if (form.paymentMethod === 'card') {
        const cardNumberClean = form.cardNumber.replace(/\s/g, '');
        if (!cardNumberClean) {
            errors.cardNumber = 'Введите номер карты';
            hasErrors = true;
        } else if (!/^\d{16}$/.test(cardNumberClean)) {
            errors.cardNumber = 'Номер карты должен содержать 16 цифр';
            hasErrors = true;
        } else {
            errors.cardNumber = '';
        }
        
        if (!form.cardExpiry) {
            errors.cardExpiry = 'Введите срок действия';
            hasErrors = true;
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry)) {
            errors.cardExpiry = 'Формат: ММ/ГГ';
            hasErrors = true;
        } else {
            errors.cardExpiry = '';
        }
        
        if (!form.cardCvv) {
            errors.cardCvv = 'Введите CVV код';
            hasErrors = true;
        } else if (!/^\d{3}$/.test(form.cardCvv)) {
            errors.cardCvv = 'CVV должен состоять из 3 цифр';
            hasErrors = true;
        } else {
            errors.cardCvv = '';
        }
    }
    
    return !hasErrors;
}

function placeOrder() {
    if (!validateForm()) return;
    
    const orderData = {
        address: form.address,
        paymentMethod: form.paymentMethod,
        comment: form.comment
    };
    
    const success = users.placeOrder(orderData);
    console.log('placeOrder result:', success);
    
    if (success) {
        orderSuccess.value = true;
        showModal.value = true;
        // Очищаем форму
        form.address = '';
        form.paymentMethod = 'card';
        form.cardNumber = '';
        form.cardExpiry = '';
        form.cardCvv = '';
        form.comment = '';
    } else {
        errors.general = 'Ошибка оформления заказа. Попробуйте снова.';
    }
}

function closeModal() {
    showModal.value = false;
    router.push({ name: 'profile' });
}
</script>

<template>
  <div class="checkout-container">
    <div class="checkout-card">
      <h2 class="checkout-title">Оформление заказа</h2>
      
      <!-- Адрес доставки -->
      <div class="form-group">
        <label class="form-label">Адрес доставки *</label>
        <input type="text" v-model="form.address" placeholder="Улица, дом, квартира, город" class="form-input" :class="{ error: errors.address }">
        <div v-if="errors.address" class="error-message">{{ errors.address }}</div>
      </div>
      
      <!-- Способ оплаты -->
      <div class="form-group">
        <label class="form-label">Способ оплаты *</label>
        <select v-model="form.paymentMethod" class="form-input" :class="{ error: errors.paymentMethod }">
          <option value="card">Банковская карта</option>
          <option value="cash">Наличные при получении</option>
          <option value="online">Онлайн-перевод</option>
        </select>
        <div v-if="errors.paymentMethod" class="error-message">{{ errors.paymentMethod }}</div>
      </div>
      
      <!-- Детали карты (если выбран способ card) -->
      <div v-if="form.paymentMethod === 'card'" class="card-details">
        <div class="form-group">
          <label class="form-label">Номер карты *</label>
          <input type="text" v-model="form.cardNumber" placeholder="1234 5678 9012 3456" class="form-input" :class="{ error: errors.cardNumber }">
          <div v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</div>
        </div>
        
        <div class="row">
          <div class="form-group half">
            <label class="form-label">Срок (ММ/ГГ) *</label>
            <input type="text" v-model="form.cardExpiry" placeholder="12/25" class="form-input" :class="{ error: errors.cardExpiry }">
            <div v-if="errors.cardExpiry" class="error-message">{{ errors.cardExpiry }}</div>
          </div>
          <div class="form-group half">
            <label class="form-label">CVV *</label>
            <input type="password" v-model="form.cardCvv" placeholder="123" class="form-input" :class="{ error: errors.cardCvv }">
            <div v-if="errors.cardCvv" class="error-message">{{ errors.cardCvv }}</div>
          </div>
        </div>
      </div>
      
      <!-- Комментарий -->
      <div class="form-group">
        <label class="form-label">Комментарий к заказу</label>
        <textarea v-model="form.comment" rows="3" placeholder="Пожелания по доставке, удобное время..." class="form-input"></textarea>
      </div>
      
      <div v-if="errors.general" class="form-message error">{{ errors.general }}</div>
      
      <button class="submit-btn" @click="placeOrder">Подтвердить заказ</button>
      <button class="back-btn" @click="router.back()">Вернуться в корзину</button>
    </div>

    <!-- Модальное окно -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Заказ успешно оформлен!</h3>
        <p>Ваш заказ принят. Вы можете отслеживать его в разделе "Профиль".</p>
        <button @click="closeModal" class="modal-btn">Перейти в профиль</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Стили (оставляем как были ранее, либо можно добавить минимальные, т.к. глобальные стили уже есть) */
.checkout-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.checkout-card {
  background: var(--bg-card);
  border-radius: 28px;
  padding: 2rem;
}
.checkout-title {
  text-align: center;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-input {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-primary);
}
.form-input.error {
  border-color: var(--danger);
}
.error-message {
  color: var(--danger);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}
.row {
  display: flex;
  gap: 1rem;
}
.half {
  flex: 1;
}
.submit-btn, .back-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 40px;
  font-weight: 700;
  cursor: pointer;
}
.submit-btn {
  background: var(--accent);
  color: white;
  border: none;
}
.back-btn {
  background: var(--info);
  color: white;
  border: none;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: var(--bg-card);
  border-radius: 28px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  border-top: 4px solid var(--accent);
}
.modal-btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  margin-top: 1rem;
  cursor: pointer;
}
</style>