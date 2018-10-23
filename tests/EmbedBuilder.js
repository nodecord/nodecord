// require the builder
const MessageEmbed = require('../src/util/Message/MessageEmbed');

// create an embed with the title 'hello world' and the hex color '#ffffff'
const embed = new MessageEmbed()
.title(`hello world`)
.color('#ffffff')

// log the object
// call ".pack()" to finish the embed and pack it for use
console.log(embed.pack());