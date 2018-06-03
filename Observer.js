class Observer {
    constructor() {
        this._subscribers = [];
        this._once = [];
    }
    subscribe(callback) {
        this._subscribers.push(callback);
    }
    unsubscribe(callback) {
        this._subscribers = this._subscribers.filter(subscriber => subscriber !== callback);
        // let index = this._subscribers.indexOf(callback);
        // if(index !== -1)
        //     this._subscribers.splice(index, 1);
    }
    notify(data) {
        this._subscribers.forEach((subscriber) => subscriber(data));
        this._once.forEach((subscriber) => subscriber(data));
        this._once = [];
    }
    once(callback) {
        this._once.push(callback);
    }
    unsubscribeAll() {
        this._subscribers = [];
        this._once = [];
    }
    countSubscribers() {
        return this._subscribers.length;
    }
    isConsist(callback) {
        return this._subscribers.some((subscriber) => subscriber === callback);
    }
}

class User {
    constructor(name) {
        this._name = name || "noName";
    }
    receive(data){
        console.log(`${this._name} got notification from Observer -> ${data}`);
    }
}

class News {
    // constructor(news){
    //     this._news = news;
    // }
    generateNews() {
       let news = '';
        while (news.length < 44)
           news += String.fromCharCode(20 + Math.random() * 107); //random Unicode symbol from 20 to 127 (not including)
        return news;
    }
    // generateIntervals(){
    //     let publication = setInterval(function () {
    //         news.generateNews();
    //     }, 2000);
    //
    //     setTimeout(() => {
    //         clearInterval(publication)
    //     }, 5000);
    //
    //     return this._news;
    // }
}

const obs = new Observer();
const news = new News();

let user1 = new User("firstUser");
let user2 = new User("secondUser");
let user3 = new User("thirdUser");
let user4 = new User("someUser");

let user1Context = user1.receive.bind(user1);
let user2Context = user2.receive.bind(user2);
let user3Context = user3.receive.bind(user3);
let user4Context = user4.receive.bind(user4);

obs.subscribe(user1Context);
obs.subscribe(user2Context);
obs.subscribe(user3Context);
obs.notify(news.generateNews());
console.log();

obs.once(user4Context);
obs.notify(news.generateNews());
console.log();
obs.notify(news.generateNews());
console.log();

console.log(obs.countSubscribers());
console.log(obs.isConsist(user1Context));
console.log(obs.isConsist(user4Context));
console.log();

obs.unsubscribe(user1Context);
obs.notify(news.generateNews());
obs.unsubscribeAll();
obs.notify(news.generateNews());