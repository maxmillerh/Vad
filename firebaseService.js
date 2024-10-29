import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";


// Ваши данные Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD4Wmtf6VFq7KJPggbfpU3Boid8N-tLZgM",
    authDomain: "vadd-f2c67.firebaseapp.com",
    projectId: "vadd-f2c67",
    storageBucket: "vadd-f2c67.appspot.com",
    messagingSenderId: "703213548596",
    appId: "1:703213548596:web:a0dd08f9a3b0247b4fc661",
    measurementId: "G-HB61LK2GJ1"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

// Функция для сохранения пользователя
export function saveUser(tel) {
    const userRef = ref(db, 'Users/' + tel);
    return set(userRef, {
        userInfo: {
            tel: tel,
            userName: "No",
            userSurname: "Name",
            Photo: false
        },
        dialogs: {
            chat: 1
        },
        chanels: {
            chanel: 1
        }
    });
}

// Функция для получения информации о пользователе
export function getUserInfo(tel) {
    const userRef = ref(db, 'Users/' + tel);
    return get(userRef).then(snapshot => {
        if (snapshot.exists()) {
            console.log("Информация о пользователе найдена:", snapshot.val());
            return snapshot.val().userInfo;
        } else {
            console.log("Пользователь не найден.");
            throw new Error("Данные не найдены.");
        }
    }).catch(error => {
        console.error("Ошибка при получении информации о пользователе: ", error);
        throw error; // Возврат ошибки для дальнейшей обработки
    });
}


// Функция для обновления информации о пользователе
export function updateUserInfo(tel, userName, userSurname) {
    const userRef = ref(db, 'Users/' + tel);
    return update(userRef, {
        'userInfo/userName': userName,
        'userInfo/userSurname': userSurname
    });
}



// Функция для проверки существования пользователя
export function checkUserExists(tel) {
    const userRef = ref(db, 'Users/' + tel);
    return get(userRef)
        .then(snapshot => {
            console.log(`Проверка существования пользователя по номеру: ${tel}, найдено: ${snapshot.exists()}`);
            return snapshot.exists();
        })
        .catch(error => {
            console.error("Ошибка при проверке существования пользователя: ", error);
            throw error; // Возврат ошибки для дальнейшей обработки
        });
}
