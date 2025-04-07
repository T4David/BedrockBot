const { createClient } = require('bedrock-protocol')
const fs = require('fs')

const tokens = JSON.parse(fs.readFileSync('./cache/cache.json', 'utf8'))

const options = {
  host: 'server.exemplu.com',
  port: 19132,
  username: 'BotFermaIron',
  version: '1.21.60',
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
