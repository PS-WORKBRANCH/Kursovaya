<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()


</script>

<template>
    <main>
        <div class="cover">
            <div class="blur">
                <h1>Добро пожаловать в наш магазин BuyPC</h1>
            </div>
        </div>
        <h1>Комплектующие для ПК</h1>
        <div class="center">
            <div class="container">
                <div class="card bg_card">
                    <h5>Видеокарты</h5><img
                        src="https://dlcdnwebimgs.asus.com/files/media/BEC60034-AC12-40B0-92F5-8A89C51BAFF0/v1/img/ASUS-ROG-Strix-Radeon-RX-560.jpg"
                        alt="Видеокарты">
                </div>
                <div class="card bg_card">
                    <h5>Процессоры</h5><img
                        src="https://avatars.mds.yandex.net/i?id=94da8e2a8b222f48a257bb17765b2de4_l-10414794-images-thumbs&n=13"
                        alt="Процессоры">
                </div>
                <div class="card bg_card">
                    <h5>Материнские платы</h5><img
                        src="https://avatars.mds.yandex.net/i?id=a8917ba7f15709d2ac2dcde714cd9eac_l-5236676-images-thumbs&n=13"
                        alt="Материнские платы">
                </div>
                <div class="card bg_card">
                    <h5>Оперативная память</h5><img src="https://i.playground.ru/e/FU-ys1g1druc62oECKnsGg.jpeg"
                        alt="Оперативная память">
                </div>
                <div class="card bg_card">
                    <h5>Блоки питания</h5><img
                        src="https://ixbt.online/live/images/original/02/96/78/2019/02/07/6ed50dceb1.jpg"
                        alt="Блоки питания">
                </div>
                <div class="card bg_card">
                    <h5>Охлаждение</h5><img
                        src="https://i.pinimg.com/originals/9c/7e/a0/9c7ea056dbec7b0b114bb985e78bc819.jpg"
                        alt="Охлаждение">
                </div>
                <div class="card bg_card">
                    <h5>Корпуса</h5><img src="https://i.ytimg.com/vi/Bt5da04MRE8/maxresdefault.jpg" alt="Корпуса">
                </div>
                <div class="card bg_card">
                    <h5>Диски SSD</h5><img src="https://i.ebayimg.com/images/g/oD8AAOSwEeFi8WH4/s-l1600.jpg"
                        alt="Диски SSD">
                </div>

            </div>
        </div>
        <br>
        <div class="container">
            <div class="podbor ">
                <div class="black">
                    <h1>Быстрый подбор ПК</h1><br>
                    <!-- <h5>Выберите комплектующие из каталога и мы сами посчитаем сколько будет стоить ваш ПК</h5> -->
                    <button @click="router.push({ name: 'catalog' })">
                        <h3 style="color: black;">В каталог</h3>
                    </button>
                </div>

            </div>
        </div>
    </main>


</template>

<style scoped>
ul {
    list-style-type: none;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
}

main {
    margin: 0 auto;
    max-width: 2000px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
}

.cover {
    min-height: 450px;
    border-radius: 10px;
    max-width: 2000px;
    background-image: url(https://hyperpc.ru/images/product/dynamic/evo/black/gallery/lian-li-dynanic-evo-black-upd-live-photo-01.jpg);
    background-size: cover;
    background-position: center;
}

.blur {
    border-radius: 10px;
    min-height: 450px;
    background-color: rgba(3, 7, 10, 0.521);
    padding: 150px;
}

.blur h1 {
    margin-top: 200px;
}

.container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1024px;
}

.card {
    border: 1px solid black;
    border-radius: 5px;
    margin: 0 auto;
    width: 250px;
    max-height: 450px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 10px;
}



.card img {
    width: 212px;
}

.podbor {
    background-size: cover;
    background-image: url(https://hyperpc.ru/images/product/gaming-pc/play/play-9/dc-cg530/main/black/water/hyperpc-play-9-black-water-full.jpg);
    min-width: 100%;
    min-height: 400px;
    margin: 20px auto;
    padding: 20px;
    text-align: end;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
}



/* ========== АДАПТАЦИЯ ДЛЯ ПЛАНШЕТОВ И МОБИЛЬНЫХ ========== */
@media (max-width: 1024px) {
    .blur {
        padding: 80px 20px;
    }

    .blur h1 {
        font-size: 2rem;
        margin-top: 100px;
    }

    .container {
        max-width: 90%;
        gap: 15px;
    }

    .card {
        width: 220px;
    }

    .podbor {
        background-position: -110%;
        min-width: auto;
        width: 90%;
        height: auto;
        padding: 30px 20px;
        text-align: center;
        background-size: cover;
        border-radius: 20px;
    }

    .podbor h1 {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .cover {
        min-height: 300px;
    }

    .blur {
        padding: 50px 15px;
    }

    .blur h1 {
        font-size: 1.5rem;
        margin-top: 50px;
    }

    .container {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .card {
        width: 90%;
        max-width: 280px;
    }

    .podbor {
        width: 95%;
        padding: 20px;
    }

    .podbor h1 {
        font-size: 1.5rem;
    }

    .podbor h5 {
        font-size: 0.9rem;
    }

    .podbor button {
        margin-top: 15px;
    }
}

@media (max-width: 480px) {
    .blur h1 {
        font-size: 1.2rem;
        margin-top: 30px;
    }

    .card h5 {
        font-size: 0.9rem;
    }

    .card img {
        width: 100%;
        max-width: 180px;
    }

    .podbor h1 {
        font-size: 1.2rem;
    }

    .podbor h5 {
        font-size: 0.8rem;
    }
}
</style>
