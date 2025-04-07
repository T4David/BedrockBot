# Minecraft Bedrock Bot

Acest proiect conține un bot pentru Minecraft Bedrock Edition care se conectează la un server Minecraft și interacționează cu lumea jocului. Botul este construit folosind biblioteca `bedrock-protocol` în Node.js și permite autentificarea utilizând un **Microsoft Account (MSA)**.

## Descriere

Botul se conectează la un server Minecraft Bedrock și, în funcție de configurația aleasă, poate interacționa cu entitățile și obiectele din lume. Proiectul este configurabil pentru a se conecta la orice server de Minecraft Bedrock, cu posibilitatea de a gestiona token-uri de autentificare Microsoft.

### Caracteristici

- Autentificare Microsoft pentru bot (MSA)
- Conectare la server Minecraft Bedrock
- Filtrarea entităților și a evenimentelor pe baza distanței
- Logging pentru monitorizarea activității botului

## Instalare

### 1. Clonarea proiectului

Clonează repository-ul folosind Git:
```bash
git clone https://github.com/T4David/MBedrockBot.git
cd BedrockBot
```

### 2. Instalarea dependențelor
Instalează dependențele necesare folosind npm:
```bash
npm install
```

### 3. Configurarea token-urilor
Pentru a utiliza botul, trebuie să ai un Microsoft token valid. Token-ul trebuie să fie salvat într-un fișier ```cache.json``` care va fi folosit pentru autentificare. Acest fișier ar trebui să aibă următoarea structură:

```json
{
  "access_token": "YOUR_ACCESS_TOKEN",
  "refresh_token": "YOUR_REFRESH_TOKEN",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

Puteți obține token-ul prin autentificarea folosind aplicațiile ```Microsoft``` și un proces de autorizare ```OAuth 2.0```.

### 4. Configurarea serverului
În ```index.js```, setează valorile corecte pentru serverul la care vrei să te conectezi:

```js
const options = {
  host: 'davidtd.go.ro',
  port: 19132,
  version: '1.21.60',
  username: 'BotAutentificat'
}
```
Un exemplu de cod ar fi:
```js
const { createClient } = require('bedrock-protocol')
const fs = require('fs')

const tokens = JSON.parse(fs.readFileSync('./cache/cache.json', 'utf8'))

const options = {
  host: 'server.exemplu.com',
  port: 19132,
  version: '1.21.60',
  username: 'Bot',
  authentication: {
    type: 'msa',
    token: tokens
  }
}

const client = createClient(options)

client.on('join', () => {
  console.log(`[+] Bot conectat cu succes la ${options.host}:${options.port} ca ${options.username}`)
})

client.on('disconnect', (reason) => {
  console.log(`[!] Bot deconectat: ${JSON.stringify(reason)}`)
})

client.on('error', (err) => {
  console.error(`[!] Eroare: ${err.message}`)
})
```

### 5. Rularea botului
După ce ai configurat totul, poți rula botul:

```bash
node index.js
```
Botul se va conecta la serverul Minecraft și va începe să interacționeze cu acesta.
