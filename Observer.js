class Observer {
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    unsubscribe(fn) {
        this.subscribers = this.subscribers.filter((subscriber) => subscriber !== fn);
    }

    notify(data) {
        this.subscribers.forEach((obj) => {
            obj.receive(data);
        });
    }
}

class User {
    constructor(name) {
        this.name = name || "noName";
    }

    receive(data) {
        console.log(`${this.name} got notification from Observer -> ${data}`);
    }
}

class News {
    generateNews() {
        let news = '';
        while (news.length < 30)
            news += String.fromCharCode(20 + Math.random() * 107); //random Unicode symbol from 20 to 127 (not including)
        obs.notify(news);
        return news;
    }

    generateIntervals(){
        let publication = setInterval(function () {
            news.generateNews();
        }, 2000);

        setTimeout(() => {
            clearInterval(publication)
        }, 5000);
    }
}

const obs = new Observer();
const news = new News();

let user1 = new User("firstUser");
let user2 = new User("secondUser");
let user3 = new User("thirdUser");

obs.subscribe(user1);
obs.subscribe(user2);
obs.subscribe(user3);

news.generateIntervals();

//obs.unsubscribe(user1);
news.generateIntervals();