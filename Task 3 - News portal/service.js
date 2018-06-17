const fs = require('fs');
const EventEmitter = require('./eventEmitter');
const User = require('./user');
const News = require('./news');

let eventEmitter = new EventEmitter();

let user1 = new User('Ololo', 1);
let user2 = new User('Lolo', 2);
let user3 = new User('Lol', 3);
let users = [user1, user2, user3];

let news1 = new News('Sport', 1);
let news2 = new News('IT', 2);
let news3 = new News('Nature', 3);
let news = [news1, news2, news3];

news1.addArticle("smth new for Sport", 1);
news1.addArticle("smth new for Sport again", 2);
news2.addArticle("smth new fo IT", 3);
news3.addArticle("smth new for Nature", 4);

class Service {

    getUserById(id) {
        //URL: /user/<id>
        let user = users.find((user) => user._id == id);
        if (user) {
            return user;
        }
    }

    getSubscriptions(id) {
        //URL: /user/<id>/subscription
        let user = this.getUserById(id);
        if (user) {
            console.log(user._subscriptions);
            return JSON.stringify(user._subscriptions);
        }
    }

    exportUser(id) {
        //URL: /user/<id>/export
        let user = this.getUserById(id);
        let message = JSON.stringify(user);
        // let date = new Date(Date.now()).toLocaleString();
        // date = date.split(" ")[1];
        // console.log(date);
        // let path = `user_${id}_${date}.json`;
        // console.log(path);
        // fs.writeFile(`./user_${id}_${date}.json`, message, 'utf8', (err) => {
        fs.writeFile(`./user_${id}_.json`, message, 'utf8', (err) => {
            if (err) {
                return err;
            }
        });

    }

    getNewsById(id) {
        //URL: news/<id>
        let channel = news.find((news) => news._id == id);
        if (channel) {
            return channel._articles;
        }
    }

    subscribe(userId, categoryId) {
        // URL: news/<news_id>/subscribe/<user_id>
        let user = this.getUserById(userId);
        eventEmitter.subscribe(categoryId, user.getNews);
        let category = news.find((news) => news._id == categoryId);
        user._subscriptions.push(category._title);

    }

    unsubscribe(userId, categoryId) {
        //URL: news/<news_id>/unsubscribe/<user_id>
        let user = this.getUserById(userId);
        eventEmitter.unsubscribe(categoryId, user.getNews);
        let category = news.find((news) => news._id == categoryId);
        user._subscriptions = user._subscriptions.filter((element) => element !== category._title);
    }

}

module.exports = Service;