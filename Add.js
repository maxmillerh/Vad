import {
    updateUserInfo,
    checkUserExists,
    getUserInfo,
} from './firebaseService.js';

import {
    formatPhoneNumber
} from './avtor.js';

let main = document.getElementById('main');
let avtorization = document.getElementById('avtorization');
let header = document.getElementById('header');
let settings = document.getElementById('settings');
let photo = document.getElementById('photo');
let nameElement = document.getElementById('name'); // Переименовано для избежания конфликта
let settingsBlok = document.getElementById('settingsBlok');
let clouseSettings = document.getElementById('clouseSettings');
let exit = document.getElementById("exit");
let btnChanel = document.getElementById("chanel-button");
let btnMassage = document.getElementById("massage-button");
let btnSearch = document.getElementById("buttonSearch");
let btnFriends = document.getElementById("buttonFriends");
let blokSearch = document.getElementById("blokSearch");
let blokFriends = document.getElementById("blokFriends");

let blokProfile = document.querySelector("#blokProfile");
const settingsProfile = document.getElementById("settingsProfile");
const redactorProfile = document.querySelector("#redactorProfile");
const redactInputName = document.querySelector("#redactInputName");
const redactInputSurname = document.querySelector("#redactInputSurname");
const redactBtnSave = document.querySelector("#redactBtnSave");
const SearchUserInput = document.querySelector("#SearchUserInput");
const SearchUserBtn = document.querySelector("#SerchUserBtn");
const resultSearch = document.querySelector("#resultSearch");
const optionsProfile = document.querySelector("#optionsProfile");
const profileAddfriendMassage = document.querySelector("#profileAddfriendMassage");
const openDialogButtons = document.querySelectorAll('.open-dialog');
const blokDialog = document.querySelector('#blokDialog');


// вход в аккаунт
export function openMain(userInfo) {
    avtorization.classList.add('d-none');
    header.classList.remove('d-none');
    main.classList.remove('d-none');
    photo.classList.remove('d-none');
    nameElement.classList.remove('d-none');
    settings.classList.remove('d-none');
    nameElement.innerHTML = userInfo.userName + ' ' + userInfo.userSurname;
    photo.src = userInfo.Photo || 'img/ava.jpeg';
}

// настройки
settings.addEventListener("click", settingsOpen);

function settingsOpen() {
    main.classList.add('d-none');
    photo.classList.add('d-none');
    nameElement.innerHTML = 'Настройки';
    settingsBlok.classList.remove('d-none');
    clouseSettings.classList.remove('d-none');
    settings.classList.add('d-none');
}

// кнопка вернуться назад
clouseSettings.addEventListener("click", functionCloseSettings);

function functionCloseSettings() {
    main.classList.remove('d-none');
    photo.classList.remove('d-none');
    nameElement.classList.remove('d-none');
    settings.classList.remove('d-none');
    blokFriends.classList.add('d-none');
    optionsProfile.classList.add('d-none');
    blokSearch.classList.add('d-none');
    settingsBlok.classList.add('d-none');
    clouseSettings.classList.add('d-none');
    redactorProfile.classList.add('d-none');
    settingsProfile.classList.add('d-none');
    blokProfile.classList.add('d-none');
    header.classList.remove('headerProfile');
    blokDialog.classList.add('d-none');

    // Получаем данные из localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        nameElement.innerHTML = userInfo.userName + ' ' + userInfo.userSurname; // Обновляем имя пользователя
    }
}

// выход из профиля
exit.addEventListener("click", functionExit);

function functionExit() {
    avtorization.classList.remove('d-none');
    nameElement.classList.add('d-none');
    settingsBlok.classList.add('d-none');
    clouseSettings.classList.add('d-none');
    header.classList.add('d-none');
    localStorage.removeItem('userInfo'); // Удаляем данные при выходе
}

// переключение между сообщениями и каналами
btnMassage.addEventListener("click", functionBtnMassage);

function functionBtnMassage() {
    btnChanel.classList.remove('activeMenu');
    btnMassage.classList.add('activeMenu')
}

btnChanel.addEventListener("click", functionBtnChanel);

function functionBtnChanel() {
    btnChanel.classList.add('activeMenu');
    btnMassage.classList.remove('activeMenu')
}

// поиск
btnSearch.addEventListener("click", functionBtnSearch);

function functionBtnSearch() {
    main.classList.add('d-none');
    photo.classList.add('d-none');
    settings.classList.add('d-none');
    nameElement.innerHTML = 'Поиск';
    blokSearch.classList.remove('d-none');
    clouseSettings.classList.remove('d-none');
}

// друзья
btnFriends.addEventListener("click", functionBtnFriends);

function functionBtnFriends() {
    main.classList.add('d-none');
    photo.classList.add('d-none');
    settings.classList.add('d-none');
    nameElement.innerHTML = 'Друзья';
    blokFriends.classList.remove('d-none');
    clouseSettings.classList.remove('d-none');
}

// профиль
photo.addEventListener("click", functionOpenProfile);

function functionOpenProfile() {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

    main.classList.add('d-none');
    photo.classList.add('d-none');
    settings.classList.add('d-none');
    nameElement.classList.add('d-none');
    blokProfile.classList.remove('d-none');
    clouseSettings.classList.remove('d-none');
    header.classList.add('headerProfile');
    settingsProfile.classList.remove('d-none');

    // Подстановка локальных данных в профиль
    const profileName = blokProfile.querySelector('.profileName');
    profileName.innerHTML = userInfo.userName + ' ' + userInfo.userSurname; // Имя по умолчанию, если его нет
}


// редактор профиля
settingsProfile.addEventListener("click", openSettingsProfile);

function openSettingsProfile() {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

    redactorProfile.classList.remove('d-none');
    redactInputName.value = userInfo.userName || ''; // Установка имени
    redactInputSurname.value = userInfo.userSurname || ''; // Установка фамилии
    blokProfile.classList.add('d-none');
    clouseSettings.classList.remove('d-none');
    header.classList.remove('headerProfile');
    nameElement.classList.remove('d-none');
    nameElement.innerHTML = "Редактировать";
    settingsProfile.classList.add('d-none');
}

// сохранение изменений профиля
redactBtnSave.addEventListener("click", redactSaveUserInfo);

function redactSaveUserInfo(event) {
    event.preventDefault();
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
    const newUserName = redactInputName.value;
    const newUserSurname = redactInputSurname.value;

    updateUserInfo(userInfo.tel, newUserName, newUserSurname).then(() => {
        userInfo.userName = newUserName;
        userInfo.userSurname = newUserSurname;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        functionCloseSettings(); // Закрываем настройки
    }).catch(error => {
        console.error("Ошибка при обновлении профиля: ", error);
    });
}

SearchUserBtn.addEventListener("click", searchUserAll);

// Функция поиска пользователей
function searchUserAll() {
    const searchTel = SearchUserInput.value.trim(); // Получаем значение из поля ввода
    let searchTelFormatted = formatPhoneNumber(searchTel);
    if (searchTelFormatted) {
        console.log("Поиск пользователя по номеру:", searchTelFormatted); // Логирование номера для поиска

        checkUserExists(searchTelFormatted).then(exists => {
            if (exists) {
                getUserInfo(searchTelFormatted).then(userInfo => {
                    displaySearchResults(userInfo);
                }).catch(error => {
                    console.error("Ошибка при получении информации о пользователе: ", error);
                });
            } else {
                resultSearch.style.justifyContent = "center";
                resultSearch.innerHTML = "Нет результатов";
            }
        }).catch(error => {
            console.error("Ошибка при проверке существования пользователя: ", error);
        });
    } else {
        alert("Введите номер телефона для поиска.");
    }
}

// Функция для отображения результатов поиска
function displaySearchResults(userInfo) {
    resultSearch.style.justifyContent = "flex-start";
    const fullName = userInfo.userName + ' ' + userInfo.userSurname; // Объявляем переменную fullName
    resultSearch.innerHTML = `
            <div onclick="openProfileFriend('${fullName}')" class="dialogsMain" id="searchUserBlok">
                <div class="dialogsPhotoBlok">
                    <img class="dialogsPhotoImg" src="img/ava.jpeg" alt="" />
                </div>
                <div class="dialogsMainText">
                    <p class="dialogsMainTextH">
                        ${fullName}
                    </p>
                </div>
                <div class="searchStartMassage">
                </div>
            </div>
    `;
}

//функция открытия профиля найденного пользователя
function openProfileFriend(fullName) {
    main.classList.add('d-none');
    photo.classList.add('d-none');
    settings.classList.add('d-none');
    blokSearch.classList.add('d-none');
    nameElement.classList.add('d-none');
    blokProfile.classList.remove('d-none');
    clouseSettings.classList.remove('d-none');
    header.classList.add('headerProfile');
    settingsProfile.classList.add('d-none');
    optionsProfile.classList.remove('d-none');
    profileAddfriendMassage.classList.remove('d-none');

    // Подстановка данных в профиль
    const profileName = blokProfile.querySelector('.profileName');
    profileName.innerHTML = fullName;
}
window.openProfileFriend = openProfileFriend;

openDialogButtons.forEach(button => {
    button.addEventListener('click', function () {
        const tel = this.getAttribute('data-tel');
        openChatDialog(tel); // Открываем диалог для конкретного пользователя
    });
});

// Функция для открытия диалога
function openChatDialog(tel) {
    console.log("Открытие диалога для:", tel);
    blokProfile.classList.add('d-none');
    header.classList.remove('headerProfile');
    photo.classList.remove('d-none');
    blokDialog.classList.remove('d-none');
    
}
