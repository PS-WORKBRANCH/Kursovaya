// useSubject.js – обновлённая версия с отзывами
import { ref } from "vue";

const SubjectList = ref([]);
const NewSubjectId = ref(5);

// Начальные данные с отзывами
const defaultSubjectList = [
    { 
        id: 1, 
        name: 'Видеокарта GIGABYTE GeForce RTX 5060 WINDFORCE OC 8G (GV-N5060WF2OC-8GD), Retail', 
        number: 35000, 
        picture: new URL('../assets/rtx5060.webp', import.meta.url).href, 
        characher: 'Тип памяти: GDDR7 || Объем видеопамяти 8192 МБ || Разрядность шины памяти: 128 бит || Тип подключения: PCI Express 4.0',
        reviews: [
            { author: 'Павел', rating: 5, text: 'Отличная видеокарта, всё работает быстро!', date: '2024-01-15' }
        ]
    },
    { 
        id: 2, 
        name: 'Видеокарта Sapphire RX9060XT PURE OC 16GB GDDR6 128bit DP 2xHDMI 2FAN RTL', 
        number: 45000, 
        picture: new URL('../assets/rx9060xt.webp', import.meta.url).href, 
        characher: 'Тип памяти: GDDR6 || Объем видеопамяти 16384 МБ || Разрядность шины памяти: 128 бит || Тип подключения: PCI Express 5.0',
        reviews: [
            { author: 'Андрей', rating: 4, text: 'Отличная видеокарта, всё работает быстро!', date: '2025-12-05' }
        ]
    },
    { 
        id: 3, 
        name: 'Процессор AMD Ryzen 5 5600X OEM, 6 ядер/6 потоков, 3700MHz, AM4', 
        number: 12741, 
        picture: new URL('../assets/5600x.webp', import.meta.url).href, 
        characher: 'Вид поставки: OEM || Сокет: AM4 || Тип памяти: DDR4 || Количество ядер: 6 || Кол-во потоков: 12',
        reviews: [
            { author: 'Guest', rating: 3, text: 'Долгая доставка, но процессор работает!!', date: '2023-02-12' }
        ]
    },
    { 
        id: 4, 
        name: 'Оперативная память 32Gb DDR5 6000MHz Kingston Fury Beast (KF560C36BBE-32) черный', 
        number: 44340, 
        picture: new URL('../assets/ddr5.webp', import.meta.url).href, 
        characher: 'Кол-во модулей в комплекте: 1шт. || Объём одного молудя: 32ГБ || Частота памяти: 6000МГц || Тип памяти: DDR5',
        reviews: [
            { author: 'Иван', rating: 5, text: 'Хорошо что я её купил до повышения цен!!!', date: '2022-02-12' }
        ]
    }
];

function loadSubjectList() {
    const saved = localStorage.getItem('subjectList');
    if (saved) {
        SubjectList.value = JSON.parse(saved);
        // Обновляем NewSubjectId
        let maxId = 0;
        for (let i = 0; i < SubjectList.value.length; i++) {
            if (SubjectList.value[i].id > maxId) maxId = SubjectList.value[i].id;
        }
        NewSubjectId.value = maxId + 1;
    } else {
        SubjectList.value = defaultSubjectList;
    }
}

function saveSubjectList() {
    localStorage.setItem('subjectList', JSON.stringify(SubjectList.value));
}

function SubjectFunction(subname, subnumber, subcharacher) {
    SubjectList.value.push({
        name: subname,
        number: subnumber,
        picture: new URL('../assets/load.gif', import.meta.url).href,
        characher: subcharacher,
        reviews: [],
        id: NewSubjectId.value
    });
    NewSubjectId.value++;
    saveSubjectList();
}

function SubjectDel(SubjectID) {
    const SubjectIndex = SubjectList.value.findIndex((Subject) => Subject.id === SubjectID);
    if (SubjectIndex !== -1) {
        SubjectList.value.splice(SubjectIndex, 1);
        saveSubjectList();
    }
}

function findSubject(SubjectID) {
    return SubjectList.value.find((Subject) => Subject.id === SubjectID);
}

function editSubject(SubjectID, newSubjectData) {
    const Subject = findSubject(SubjectID);
    if (Subject) {
        Subject.name = newSubjectData.name;
        Subject.number = newSubjectData.number;
        Subject.characher = newSubjectData.characher;
        saveSubjectList();
    }
}

// Новая функция: добавление отзыва
function addReview(productId, reviewData) {
    const product = findSubject(productId);
    if (product) {
        if (!product.reviews) product.reviews = [];
        product.reviews.push({
            author: reviewData.author,
            rating: reviewData.rating,
            text: reviewData.text,
            date: new Date().toLocaleDateString()
        });
        saveSubjectList();
        return true;
    }
    return false;
}

// Функция для вычисления среднего рейтинга
function averageRating(product) {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / product.reviews.length;
}

loadSubjectList();

export default function useSubject() {
    return { SubjectList, SubjectFunction, SubjectDel, findSubject, editSubject, addReview, averageRating };
}