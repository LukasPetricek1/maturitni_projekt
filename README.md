# Fadigram - sociální aplikace
## Pro Lokální spuštění je nutné mít přástup ke službám AWS S3 Cloud  a SendGrid

<span style="color:red">FA</span>cebook
<span style="color:red">DI</span>scord
insta<span style="color:red">GRAM</span>

**Fadigram** je  sociální platforma, která kombinuje:  
- 📘 **Komunitu a spojení** z Facebooku  
- 🎙️ **Komunikační nástroje** z Discordu  
- 📸 **Sdílení momentů** z Instagramu  


## Naklonujte si tento repozitář:
   ```sh
   git clone https://github.com/LukasPetricek1/maturitni_projekt
   cd maturitni_projekt
   ```
   
# Databáze
* MySQL
* Běží na PORTU 3306
* Konfigurace `./backend/mysql/connection.js`
* Základací skript `./backend/mysql/create_social_app.sql` <br>
#### Je potřeba nadefinovat proménně pro databázi viz. [Konfigurace](#Konfigurace)

# Struktura FRONTENDU

```sh
   cd /frontend
   ```

- **React**: Hlavní knihovna pro tvorbu uživatelského rozhraní.
- **Redux Toolkit**: Pro správu stavu aplikace.
- **React Router DOM**: Navigace mezi stránkami.
- **TailwindCSS**: Stylování UI pomocí utility-first CSS frameworku.
- **TypeScript**: Přidání statického typování a dalších výhod.

---


## Instalace

Závislosti se nainstalují pomocí **npm** nebo **yarn**:

```bash
npm install
# nebo
yarn install
```

## Skripty

V souboru **package.json** jsou definovány následující skripty:

| Skript       | Popis                                |
|--------------|--------------------------------------|
| `npm run dev`      | Spustí vývojový server s Vite.       |
| `npm run build`    | Zkompiluje projekt pro produkci.    |
| `npm run preview`  | Zobrazí zkompilovanou aplikaci.     |
| `npm run lint`     | Spustí ESLint pro kontrolu kódu.    |

### Spuštění aplikace v režimu vývoje

```bash
npm run dev
```

Aplikace poběží na **http://localhost:5173**.

---

Aplikace předpokládá, že databáze je přístupná na localhost:3306 s uživatelem root s heslem root. Případné změny musíte provést v souboru ./src/db.php.

## Závislosti

### Produkční závislosti

| Knihovna                 | Verze   | Popis                            |
|--------------------------|---------|---------------------------------|
| `react`                  | ^18.3.1 | Hlavní UI knihovna.             |
| `react-dom`              | ^18.3.1 | Renderer pro React.             |
| `react-router-dom`       | ^6.28.0 | Routing pro React.              |
| `@reduxjs/toolkit`       | ^2.3.0  | Moderní nástroje pro Redux.     |
| `react-redux`            | ^9.1.2  | Propojení Reduxu s Reactem.     |
| `tailwindcss`            | ^3.4.15 | CSS framework.    |
| `react-icons`            | ^5.3.0  | Ikony pro React komponenty.     |
| `dompurify`              | ^3.2.3  | Sanitizace HTML.                |

### Vývojové závislosti

| Knihovna                 | Verze   | Popis                            |
|--------------------------|---------|---------------------------------|
| `vite`                   | ^5.4.10 | Rychlý bundler a dev server.    |
| `typescript`             | ~5.6.2  | Statické typování.              |
| `eslint`                 | ^9.13.0 | Linter pro kód.                 |
| `@vitejs/plugin-react`   | ^4.3.3  | Plugin pro React s Vite.        |
| `autoprefixer`           | ^10.4.20| Automatické prefixování CSS.    |

---

## Stylování
Projekt používá **TailwindCSS**:

- Konfigurace TailwindCSS se nachází v souboru `tailwind.config.js`.

**Příklad použití TailwindCSS:**

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Lorem Ipsum
</div>
```

---

## ESLint

Tento projekt používá **ESLint** pro kontrolu kvality kódu.

Spuštění ESLint:

```bash
npm run lint
```

Pokud nalezne chyby, ESLint ti je vypíše do konzole.

---

## Vývoj

Změny se projeví okamžitě.

```bash
npm run dev
```

---

## Build a produkce

Pro vytvoření produkční verze aplikace se musí spustit:

```bash
npm run build
```

Výsledné soubory budou v adresáři **/dist**. Pro kontrolu lze spustit:

```bash
npm run preview
```

# Struktura BACKENDU

```sh
   cd /backend
   ```

## Instalace

1. Nainstalujte závislosti:
   ```sh
   npm install
   ```
2. Vytvořte `.env` soubor ve složce **backend** a nastavte požadované proměnné prostředí (viz sekce **Konfigurace**).

## Konfigurace

```env
--- Databáze ---  
DB_HOST=${db-host}
DB_USER=${db-user}
DB_PASSWORD=${db-password}
DB_NAME=${db-name}

--- JsonWebToken secret ---
JWT_SECRET=${secret}

### AWS nastavení

* Přihlaste se do AWS Console.
* Otevřete službu Amazon S3.
* Klikněte na Create bucket.
* Zadejte název bucketu (např. fadigram).
* Vyberte region (nejspíše se vybere automaticky).
* Klikněte na Create bucket.
* Vytvořte IAM uživatele s přístupem k S3
* Otevřete AWS IAM konzoli.
* Přejděte do sekce Users → Create user.
* Zadejte jméno uživatele.
* Vygenerujte si Access Key
* Uložte Access key a Secret Access key

--- AWS S3 Cloud ---
AWS_BUCKET_REGION=${region}
AWS_ACCESS_KEY_ID=${access-key}
AWS_SECRET_ACCESS_KEY=${secret-key}
AWS_BUCKET_NAME=${bucket-name}

--- SendGrid Mail ---
SENDGRID_KEY=${sendgrid-key}

--- Obecné ---
PORT=${PORT}
FRONTEND_URL=http://localhost:5173
BACKEND_URL=${PORT}
```
3. Spusťte aplikaci:
   ```sh
   npm start
   ```

## Použité technologie

- **Node.js** – běhové prostředí pro JavaScript
- **Express.js** – backendový framework pro tvorbu API
- **MySQL** – relační databáze pro ukládání dat
- **Socket.io** – real-time komunikace
- **AWS S3** – cloudové úložiště pro soubory
- **Multer** – middleware pro nahrávání souborů
- **JWT (jsonwebtoken)** – autentizace uživatelů
- **Bcrypt.js** – hashování hesel
- **Dotenv** – správa environmentálních proměnných
- **EJS** – Embedded Javascript (template plugin pro Express.js)

## API Endpoints

### Autentizace

- `POST /register` – registrace uživatele
- `POST /login` – přihlášení uživatele
- `POST /logout` – odhlášení uživatele

### Soubory

- `POST /upload` – nahrání souboru na AWS S3 cloud

### Real-time komunikace

- **Socket.io** = Obousměrná **full-duplex** (data přenášená oběma směry současně ) komunikace. Využívá Web Sockets.

## Spuštění v režimu vývoje

Pro vývojový režim s automatickým restartem serveru použijte:
```sh
npm run start
```



## Licence

Tento projekt je pod licencí **GNU General Public License v3.0**. Více informací je v souboru **LICENSE**.

--- 
