import {
    saveUser,
    getUserInfo,
    checkUserExists
} from './firebaseService.js';
import {
    openMain
} from './app.js';
import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"; // Импорт необходимых функций




// Получение элементов
const inputTel = document.getElementById('InputTel');
const btnAvtor = document.getElementById('StartAvtoriz');

// Оформление номера телефона
inputTel.addEventListener('input', function() {
    const value = this.value.replace(/\D/g, ''); // Убираем все нечисловые символы
    const formattedValue = formatPhoneNumber(value);
    this.value = formattedValue;
});

export function formatPhoneNumber(value) {
    if (value.length === 0) return '+7 ';
    if (value.length <= 1) return '+7 ';
    if (value.length <= 4) return '+7 (' + value.slice(1);
    if (value.length <= 7) {
        return '+7 (' + value.slice(1, 4) + ') ' + value.slice(4);
    }
    if (value.length <= 9) {
        return '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
    }
    return '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
}

function validatePhoneNumber(phoneNumber) {
    return phoneNumber.length === 11 && phoneNumber.startsWith('7'); // Проверяет, что номер состоит из 11 цифр и начинается с '7'
}

// Обработчик события клика
btnAvtor.addEventListener('click', submitForm);

function submitForm(e) {
    e.preventDefault();
    const phoneNumber = inputTel.value.replace(/\D/g, '');

    if (validatePhoneNumber(phoneNumber)) {
        const tel = inputTel.value;

        // Проверка существования номера телефона в Firebase
        checkUserExists(tel).then(exists => {
            if (exists) {

                // Если номер существует, получаем актуальную информацию о пользователе
                return getUserInfo(tel).then(userInfo => {
                    // Сохраняем актуальные данные в localStorage
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    openMain(userInfo);
                });
            } else {
                // Если номера нет, сохраняем номер телефона

                return saveUser(tel).then(() => {
                    return getUserInfo(tel).then(userInfo => {
                        // Сохраняем данные
                        localStorage.setItem('userInfo', JSON.stringify(userInfo));
                        openMain(userInfo);
                    });
                });
            }
        }).catch(error => {
            console.error("Ошибка: ", error);
        });
    } else {
        alert('Некорректный номер телефона.');
    }
}



// Проверка на наличие данных в localStorage при загрузке страницы
window.onload = function() {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        openMain(userInfo); // Загружаем данные
    }
}

