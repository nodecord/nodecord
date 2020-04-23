<div align="center">
    <p>
        <img src="https://i.imgur.com/BcLSzhy.png" width="276" />
    </p>
    <p>
        <a href="https://discord.gg/6kG3y3E"><img src="https://discordapp.com/api/guilds/503134449060544513/embed.png?style=shield" /></a>
    </p>
</div>

## Nodecord
A lightweight node.js wrapper for the Discord API

> Hello there! You're looking at the `dev` branch of Nodecord, which at the moment is the home of an entire rewrite. Expect everything here to be unstable and absolutely unintended for production use - you have been warned!

### Install
Node.js v12 or later is required
```
npm install nodecord

yarn add nodecord
```

### Example
```js
const Nodecord = require('nodecord');
const bot = new Nodecord('your token');

bot.on('ready', () => {
    console.log(`Connected to Discord`);
});

bot.on('message', (message) => {
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});
```

### Contributing
We love and encourage contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

### Licence
(c) 2018 - 2020 Nodecord, created by ThatTonybo. Licenced under the GNU GPL v3.0 License, see the [LICENSE](./LICENSE) file for more information.
