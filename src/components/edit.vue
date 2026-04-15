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
.SubjectContainer input,
.SubjectContainer button {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  box-sizing: border-box;
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
.picture {
  height: 170px;
  overflow: hidden;
}
.picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
