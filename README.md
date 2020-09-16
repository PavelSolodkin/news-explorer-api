# news-explorer-api
 Search Articles 

## О проекте:
Бэкенд-часть проекта News-Explorer

Проект доступен по ссылкам:

Публичный IP: 178.154.254.149

Адрес:  http://api.psolodkindiplom.tk http://www.api.psolodkindiplom.tk https://api.psolodkindiplom.tk https://www.api.psolodkindiplom.tk 

## Технологии:
API.REST, express.js, MongoDB, Postman, Git, Node.js;

### Запросы с сервера:

POST /signup создаст пользователя по введённым данным name, email, password. В поле email должен быть корректный адрес, а пароль содержать необходимые символы, иначе сервер вернёт ошибку.

POST /signin выполняет авторизацию пользователя, выдаёт токен на 7 дней.

GET /users/me возвращает информацию о пользователе (email и имя)

GET /articles возвращает все сохранённые пользователем статьи

POST /articles создаёт статью с переданными в теле keyword, title, text, date, source, link и image

DELETE /articles/articleId удаляет сохранённую статью  по _id

Сервер может возвращать ошибки с соответствующими кодами, если пытаться перейти по несуществующему адресу, сохранить статью или создать пользователя с невалидными данными или допустить ошибку при вводе ID.

## Развертывание:
1. Клонировать репозиторий командой git clone
2. Установить пакеты npm i
3. Запустить необходимую сборку:
- npm run build - создает сборку Production
- npm run dev - создает сборку Development, запускает сервер, и открывает проект в браузере с hot обновлением



