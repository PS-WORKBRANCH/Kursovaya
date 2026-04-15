import { computed, ref } from "vue";

const auth = ref(false)
const NewUserId = ref(3)
const isAdmin = ref()
const check = computed(() => isAdmin.value?.role)

const userList = ref([])
const notification = ref({ show: false, message: '', type: 'success' });

function saveUserList() {
    localStorage.setItem('userList', JSON.stringify(userList.value))
}

function loadUserList() {
    const saved = localStorage.getItem('userList')
    if (saved) {
        userList.value = JSON.parse(saved)
        let maxId = 0
        for (let i = 0; i < userList.value.length; i++) {
            if (userList.value[i].id > maxId) maxId = userList.value[i].id
        }
        NewUserId.value = maxId + 1
    } else {
        userList.value = [
            { id: 1, login: 'admin', password: 'admin', email: 'admin@admin.ru', role: 'admin', tovars: {}, orders: [] },
            { id: 2, login: 'testuser', password: 'test', email: 'test@test.ru', role: 'noob', tovars: {}, orders: [] }
        ]
    }
}

function saveAuth() {
    if (isAdmin.value) {
        localStorage.setItem('authUser', JSON.stringify(isAdmin.value))
    } else {
        localStorage.removeItem('authUser')
    }
}

function loadAuth() {
    const saved = localStorage.getItem('authUser')
    if (saved) {
        const user = JSON.parse(saved)
        const found = userList.value.find(u => u.id === user.id)
        if (found) isAdmin.value = found
        else localStorage.removeItem('authUser')
    }
}

function logout() {
    isAdmin.value = ''
    saveAuth()
}

function UsersFunction(userlogin, useremail, userlastName, userfirstName, usermiddleName, userphone, userpassword) {
    userList.value.push({
        login: userlogin,
        email: useremail,
        lastName: userlastName,
        firstName: userfirstName,
        middleName: usermiddleName,
        phone: userphone,
        password: userpassword,
        role: 'noob',
        tovars: {},
        orders: [],
        id: NewUserId.value
    })
    NewUserId.value++
    saveUserList()
}

function findUser(login, password) {
    isAdmin.value = userList.value.find((user) => user.login === login.value && user.password == password.value)
    saveAuth()
    return isAdmin.value
}

function findUserById(id) {
    return userList.value.find(user => user.id === id)
}

function editUser(userID, newUserData) {
    const user = findUserById(userID)
    if (user) {
        user.login = newUserData.login
        user.email = newUserData.email
        user.phone = newUserData.phone
        user.password = newUserData.password
        saveUserList()
        if (isAdmin.value && isAdmin.value.id === userID) saveAuth()
    }
}

function addToCart(product) {
    if (!isAdmin.value) return
    if (!isAdmin.value.tovars) isAdmin.value.tovars = {}
    if (isAdmin.value.tovars[product.id]) {
        isAdmin.value.tovars[product.id].quantity += 1
    } else {
        isAdmin.value.tovars[product.id] = { ...product, quantity: 1 }
    }
    const index = userList.value.findIndex(u => u.id === isAdmin.value.id)
    if (index !== -1) userList.value[index] = isAdmin.value
    saveUserList()
    saveAuth()
}

function calculateCartTotal() {
    if (!isAdmin.value || !isAdmin.value.tovars) return 0
    return Object.values(isAdmin.value.tovars).reduce((sum, item) => sum + (item.number * item.quantity), 0)
}

function placeOrder(orderData) {
    if (!isAdmin.value) return false;
    const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: { ...isAdmin.value.tovars },
        total: calculateCartTotal(),
        delivery: { ...orderData }
    };
    if (!isAdmin.value.orders) isAdmin.value.orders = [];
    isAdmin.value.orders.push(newOrder);
    isAdmin.value.tovars = {};
    const index = userList.value.findIndex(u => u.id === isAdmin.value.id);
    if (index !== -1) userList.value[index] = isAdmin.value;
    saveUserList();
    saveAuth();
    return true;
}

function clearCart() {
    if (!isAdmin.value) return
    isAdmin.value.tovars = {}
    const index = userList.value.findIndex(u => u.id === isAdmin.value.id)
    if (index !== -1) userList.value[index] = isAdmin.value
    saveUserList()
    saveAuth()
}

function showNotification(message, type = 'success') {
    notification.value = { show: true, message, type };
    setTimeout(() => {
        notification.value.show = false;
    }, 3000);
}

function addToCartWithNotification(product) {
    addToCart(product);
    showNotification('Товар добавлен в корзину');
}

const cartItemCount = computed(() => {
    if (!isAdmin.value || !isAdmin.value.tovars) return 0;
    return Object.values(isAdmin.value.tovars).reduce((sum, item) => sum + item.quantity, 0);
});

loadUserList()
loadAuth()

export default function useUsers() {
    return { isAdmin, logout, userList, UsersFunction, findUser, editUser, auth, check, findUserById, addToCart, calculateCartTotal, placeOrder, clearCart, cartItemCount, notification, addToCartWithNotification }
}