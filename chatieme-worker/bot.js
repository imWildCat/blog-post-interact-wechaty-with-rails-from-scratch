const { Wechaty } = require('wechaty');
const request = require('request');

function startBot() {
    const bot = Wechaty.instance({ profile: 'chatieme' });
    bot.on('scan', (url, code) => console.log(`Scan QrCode to login: ${code}\n${url}`))
        .on('login', user => console.log(`User ${user} logined`))
        .on('message', onMessage)
        .init();
}

function onMessage(message) {
    const room = message.room();
    const sender = message.from();
    const receiver = message.to();
    const content = message.content();

    if (!room || !receiver) {
        // onPersonalMessage(message);
        return;
    }

    const topic = room.topic();
    const from_name = sender.name();

    const data = { topic, from_name, content };
    console.log(data);

    request.post({
        url: 'http://localhost:3000/messages',
        form: data
    },
        function (err, httpResponse, body) {
           console.log(body);
        });
}

startBot();
