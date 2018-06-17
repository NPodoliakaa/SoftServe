const EventEmitter = require('./eventEmitter');
let eventEmitter = new EventEmitter();

class News {
    constructor(title, id) {
        this._title = title;
        this._id = id;
        this._articles = [];
    }

    generateNews() {
        let message = '';
        while (message.length < 100) {
            message += String.fromCharCode(20 + Math.random() * 107); //random Unicode symbol from 20 to 127 (not including)
        }
        return message;
    }

    addArticle(title, id) {
        let article = {
            title: this._title,
            message: this.generateNews(),
            id: this._id
        }
        this._articles.push(article);
        eventEmitter.emit(article, title);
    }
}

module.exports = News;