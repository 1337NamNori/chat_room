const mongoose = require('mongoose');

const mongoURL = `mongodb+srv://namnori:chatroom123@cluster0.gwx0l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function connect() {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect Successfully');
    } catch (error) {
        console.log('Connect Failed!!!');
        console.log(error);
    }
}

module.exports = { connect };
