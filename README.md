# brother-site

Сайт-візитка **FokusHaus Hausmeisterservice** (німецькою мовою): https://fokushaus.info
Чистий HTML + CSS + JavaScript: без фреймворків, без збирачів, без зовнішніх підключень (DSGVO).

Правила роботи: `CLAUDE.md`. Покроковий план і журнал змін: `PLAN.md`.

## Структура

| Шлях | Що там | На сервер? |
|---|---|---|
| `index.html` | головна сторінка (розділи `#home`, `#services`, `#contact`) | так |
| `impressum.html`, `datenschutz.html` | обов'язкові юридичні сторінки (тексти з e-recht24) | так |
| `css/style.css` | усі стилі | так |
| `js/main.js` | бургер-меню | так |
| `img/*.webp`, `*.svg`, `*.png` | фото послуг, банер, логотип, іконки | так (лише файли) |
| `img/<підпапки>/` | оригінальні фото (у `.gitignore`, не публікуються) | **ні** |
| `.htaccess` | налаштування Apache: `www` → `https://fokushaus.info` | так |
| `fonts/` | (пізніше) локальні шрифти `.woff2` | поки ні |
| `CLAUDE.md`, `PLAN.md`, `README.md`, `.gitignore`, `.claude/` | службові файли проєкту | **ні** |

## Як запустити локально

**VS Code + Live Server**
1. Відкрити папку проєкту у VS Code.
2. Праворуч унизу натиснути **Go Live**.
3. Сайт відкриється в браузері й оновлюватиметься після кожного збереження файлу.

(Альтернатива, якщо встановлено Python: `python -m http.server 8000` і відкрити http://localhost:8000)

## Де живе сайт

| Що | Де | Хто має доступ |
|---|---|---|
| Хостинг | **Hetzner Webhosting S**, сервер `www21.your-server.de` (konsoleH: https://konsoleh.hetzner.com) | Олексій |
| Домен і DNS | **Squarespace** (`fokushaus.info`) | брат (код входу приходить на `service@fokushaus.info`) |
| Пошта | **Google Workspace** (`service@fokushaus.info`) | брат |
| Код | GitHub, цей репозиторій (GitHub Pages вимкнено) | Олексій |

DNS-записи в Squarespace (Custom records):

| Name | Type | Data | Навіщо |
|---|---|---|---|
| `@` | A | `213.133.104.21` | сайт (IPv4 Hetzner) |
| `@` | AAAA | `2a01:4f8:d0a:2162::2` | сайт (IPv6 Hetzner) |
| `www` | CNAME | `fokushaus.info` | `www` веде туди ж |
| `@` | MX | `smtp.google.com` | пошта — **не чіпати** |
| `@` | TXT | `v=spf1 include:_spf.google.com ~all` | пошта (SPF) — **не чіпати** |
| `google._domainkey` | TXT | `v=DKIM1; …` | пошта (DKIM) — **не чіпати** |

HTTPS: сертифікат Let's Encrypt у konsoleH → `fokushaus.info` → Services → **SSL Manager**.
Hetzner продовжує його **автоматично**, але лише поки A-запис домену вказує на сервер Hetzner.
Там же увімкнено **HTTPS redirect** (http → https).

## Як оновити сайт

1. Змінити потрібні файли й перевірити результат локально (Live Server).
2. Зберегти зміни в git і відправити на GitHub (це резервна копія та історія змін):
   ```bash
   git add .
   git commit -m "fix: короткий опис змін"
   git push
   ```
3. Завантажити **змінені файли** на сервер через **WinSCP**:
   - збережена сесія `fokushaus`: протокол **SFTP**, порт `22`; хост, користувач і пароль —
     у konsoleH → Services → **Login data** (репозиторій публічний, тож логін і пароль тут не пишемо; пароль нікому не пересилати);
   - ліва панель — `C:\brother-site`, права — `/public_html/`;
   - перетягнути змінені файли в ту саму папку на сервері (`css/style.css` → `/public_html/css/` тощо),
     на питання про заміну — «Так».
4. Відкрити https://fokushaus.info і оновити сторінку з **Ctrl+F5** (без кешу браузера).

Підказки:
- Файли з крапкою на початку (`.htaccess`) WinSCP може ховати: **Ctrl+Alt+H** показує/ховає їх.
- Нове фото: спершу стиснути у WebP (див. `PLAN.md`, Етап 7), на сервер — лише файл у `img/`, не підпапку з оригіналами.
- Після змін на сайті, що стосуються даних відвідувачів (форма, WhatsApp-кнопка, карта, аналітика, інший хостер),
  треба **перегенерувати Datenschutzerklärung** (e-recht24) і замінити текст у `datenschutz.html`.

## Якщо щось зламалось

| Симптом | Що робити |
|---|---|
| Бачу стару версію | Ctrl+F5 або приватне вікно; перевірити, що файл справді завантажено у WinSCP |
| Помилка **500** після зміни `.htaccess` | видалити `.htaccess` на сервері (сайт запрацює), потім шукати помилку в ньому |
| Немає замочка / помилка сертифіката | konsoleH → SSL Manager: чи є сертифікат і чи A-запис у Squarespace = `213.133.104.21` |
| Не приходить пошта брата | перевірити, що MX/TXT у Squarespace не змінені (таблиця вище) |
