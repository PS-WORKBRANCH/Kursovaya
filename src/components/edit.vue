<script setup>
import { computed, reactive, ref } from 'vue';
import useSubject from '../composables/useSubject';
import { useRoute } from 'vue-router';
const subjects = useSubject()


const route = useRoute()
const chel = computed(() => subjects.findSubject(Number(route.params.id)));



const text = ref('')
const text_num = ref('')

const newSubjectData = reactive({
    name: '',
    number: '',
    characher: ''
});

function edit() {



    if (chel.value) {
        if (newSubjectData.name && newSubjectData.characher && newSubjectData.number > 0) {

            subjects.editSubject(chel.value.id, {
                name: newSubjectData.name,
                number: newSubjectData.number,
                characher: newSubjectData.characher
            });
            text.value = 'Успешно'
            text_num.value = ''
        } else if (newSubjectData.name === '' || newSubjectData.characher === '' || newSubjectData.number === '') {
            text.value = 'Ошибка в полях ввода';
        }
        else {
            text.value = '';

            if (newSubjectData.number <= 0) {
                text_num.value = 'Цена должна быть больше 0!!!';
                text.value = ''
            } else {
                text_num.value = '';

            }
        }

    }
}

</script>
<template>
    <div class="container">

        <div class="SubjectContainer ">
            <div class="card">
                <div class="edit-form">
                    <h3>Редактировать товар</h3>
                    <h4>Обязательно запонить все поля ввода</h4>

                    <input type="text" placeholder="Новое название" v-model="newSubjectData.name" />
                    <input type="number" placeholder="Новая цена" v-model="newSubjectData.number" />
                    <h4 v-if="text_num">{{ text_num }}</h4>

                    <input type="text" placeholder="Новое описание" v-model="newSubjectData.characher" />
                    <button @click="edit">Сохранить изменения</button>
                    <h4>{{ text }}</h4>
                </div>
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

/* Стили для формы */
.SubjectContainer input,
.SubjectContainer button {
    width: 100%;
    max-width: 400px;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 12px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
}

.SubjectContainer input:focus {
    outline: none;
    border-color: #42b883;
    box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

.SubjectContainer button {
    background-color: #42b883;
    color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
}

.SubjectContainer button:hover {
    background-color: #33a06f;
}

.SubjectContainer button:active {
    transform: scale(0.98);
}

/* Сетка для карточек */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: 20px;
}

.SubjectContainer {
    background: #1e1d1f;

    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    border: none;
    width: 100%;
    /* Занимает всю ширину ячейки */
    height: auto;
}

.SubjectContainer:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
}

.picture {
    height: 170px;
    overflow: hidden;
    background: #f8f8f8;
}

.picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}
</style>
