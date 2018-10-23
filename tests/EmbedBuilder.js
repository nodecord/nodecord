// require the builder
const MessageEmbed = require('../src/util/Message/MessageEmbed');

// create an embed with a title, description and color
const embed = new MessageEmbed()
.title(`hello world`)
.description('this is an embed')
.color('#ffffff');

// log the object
// call ".pack()" to finish the embed and pack it for use
console.log(embed.pack());