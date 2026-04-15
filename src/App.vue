<script setup>
import { RouterView } from 'vue-router';
import useUsers from './composables/useUsers'
import { computed } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter()
const users = useUsers()



const checklog = computed(() => {
    // console.log(users.isAdmin.value);

    return users.isAdmin.value
})

</script>

<template>
    <div class="flex">
        <header>
            <RouterLink :to="{ name: 'welcome' }">
                <div class="logo center">
                    <img src="./assets/logo.webp" alt="">
                    <h2>
                        BuyPC
                    </h2>
                </div>
            </RouterLink>


            <div class="center">
                <input type="text" placeholder="Поиск товаров...">
            </div>



            <nav class="center">
                <div>
                    <RouterLink :to="{ name: 'catalog' }"><button>
                            Каталог
                        </button></RouterLink>
                    <RouterLink :to="{ name: 'admin' }"><button v-if="users.isAdmin.value?.role == 'admin'">
                            Админ панель
                        </button></RouterLink>
                    <RouterLink :to="{ name: 'auto' }" v-if="!checklog"><button>
                            Авторизация
                            {{ users.isAdmin?.value?.login }}
                        </button></RouterLink>
                    <RouterLink :to="{ name: 'profile' }" v-if="checklog"><button>
                            Профиль
                            {{ users.isAdmin?.value?.firstName }}
                        </button></RouterLink>
                    <RouterLink :to="{ name: 'registr' }" v-if="!checklog"><button>
                            Регистрация
                        </button></RouterLink>
                    <RouterLink :to="{ name: 'store' }" v-if="checklog" class="store-link">
                        <button class="storre">
                            <img src="./assets/store.png" alt="">
                            <span v-if="users.cartItemCount > 0" class="cart-badge">{{ users.cartItemCount }}</span>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'user' }" v-if="users.isAdmin.value?.role == 'admin'"><button>
                            Пользователи
                        </button></RouterLink>

                    <!-- <button v-if="!users.isAdmin.value" @click="users.login(); router.push({ name: 'catalog' })">Стать
                админом</button> -->
                    <button class="logout" v-if="users.isAdmin.value"
                        @click="users.logout(); router.push({ name: 'catalog' })">Выйти с
                        аккаунта</button>
                </div>
            </nav>
        </header>
        <div class="main">
            <RouterView></RouterView>
        </div>
        <div v-if="users.notification.value.show" class="toast" :class="users.notification.value.type">
            {{ users.notification.value.message }}
        </div>
        <footer>
            <div class="info">
                <h2>Контакты</h2>
                <h5>8 800 555-35-35</h5>
                <h5>info@BuyPC.ru</h5>
                <h5>СПБ, ул.Руставели 33, кабинет 310</h5>
                <h5>ПН-ПТ 12:00 - 19:00; СБ 12:00 - 18:00</h5>
            </div>
            <div class="info">
                <h5>Комплектующие</h5>
                <ul>
                    <li><a href="">Видеокарты</a></li>
                    <li><a href="">Процессоры</a></li>
                    <li><a href="">Материнские платы</a></li>
                    <li><a href="">Оперативная память</a></li>
                    <li><a href="">Блоки питания</a></li>
                    <li><a href="">Охлаждение</a></li>
                    <li><a href="">Корпуса</a></li>
                    <li><a href="">Диски SSD</a></li>
                </ul>
            </div>
            <div class="info">
                <h5>Для покупателей</h5>
                <ul>
                    <li><a href="">О комапнии</a></li>
                    <li><a href="">Оплата и доставка</a></li>
                    <li><a href="">Сборка ПК</a></li>
                    <li><a href="">Отзывы</a></li>
                    <li><a href="">Контакты</a></li>
                </ul>
            </div>
        </footer>
    </div>

</template>

<style scoped>
.logo img {
  max-height: 90px;
}
.storre img {
  max-height: 20px;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  top: 0;
  position: sticky;
  width: 100%;
  min-height: 7%;
  margin: 0;
  z-index: 999;
}
input {
  border-radius: 10px;
  height: 28px;
  width: 600px;
  text-align: start;
  padding: 5px;
}
.main {
  flex-grow: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
button {
  margin: 10px;
}
footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 7%;
  margin: 0;
  text-align: left;
}
.flex {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.store-link {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 12px 24px;
  border-radius: 40px;
  font-weight: 600;
  z-index: 999;
  animation: fadeInUp 0.3s ease;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 10px;
  }
  .center input {
    width: 90%;
  }
  footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>