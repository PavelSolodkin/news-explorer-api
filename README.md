# news-explorer-api
 Search Articles 

## О проекте:
Бэкенд-часть проекта news-explorer-api

Проект доступен по ссылкам:

Публичный IP: 84.201.132.28

Адрес:  http://api.psolodkindiplom.tk http://www.api.psolodkindiplom.tk https://api.psolodkindiplom.tk https://www.api.psolodkindiplom.tk 

## Технологии:
API.REST, express.js, MongoDB, Postman, Git, Node.js;

### Чтобы развернуть проект у себя на ПК:
Необходимо установить Git, Node.js с NPM, Mongo и Postman

npm install # установит все зависимости из package.json

npm run dev # режим, который в реальном времени следит за файлами, обновляя сервер при изменениях.

npm run start # режим без отслеживания изменения файлов

### Запросы с сервера:

POST /signup создаст пользователя по введённым данным name, email, password. В поле email должен быть корректный адрес, а пароль содержать необходимые символы, иначе сервер вернёт ошибку.

POST /signin выполняет авторизацию пользователя, выдаёт токен на 7 дней.

GET /users/me возвращает информацию о пользователе (email и имя)

GET /articles возвращает все сохранённые пользователем статьи

POST /articles создаёт статью с переданными в теле keyword, title, text, date, source, link и image

DELETE /articles/articleId удаляет сохранённую статью  по _id

Сервер может возвращать ошибки с соответствующими кодами, если пытаться перейти по несуществующему адресу, сохранить статью или создать пользователя с невалидными данными или допустить ошибку при вводе ID.




