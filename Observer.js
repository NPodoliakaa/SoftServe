"use strict";

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
        this._once.length = 0;
    }
    once(callback) {
        this._once.push(callback);
    }
    unsubscribeAll() {
        this._subscribers.length = 0;
        this._once.length = 0;
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
        this.receive = this.receive.bind(this);
    }
    receive(data){
        console.log(`${this._name} got news -> ${data}`);
    }
}

class News {
    constructor(object){
        this._object = object;
    }
    generateNews(category) {
        let news = '';
        while (news.length < 44) {
            news += String.fromCharCode(20 + Math.random() * 107); //random Unicode symbol from 20 to 127 (not including)
        }
        if (this._object instanceof Observer){
            this._object.notify(news);
        } else
        if (this._object instanceof EventEmitter){
            this._object.emit(news, category);
        }
    }
}

class EventEmitter {
    constructor(categories) {
        this._subscribers = {};
        if (categories){
            categories.forEach((category) => this._subscribers[category] = [] );
        }
    }
    subscribe(category, callback) {
        if (Object.keys(this._subscribers) &&
            Object.keys(this._subscribers).every((group) => group !== category)){
           this._subscribers[category] = [];
       }
       this._subscribers[category].push(callback);
    }
    unsubscribe(category, callback) {
        this._subscribers[category] = this._subscribers[category].filter(subscriber => subscriber !== callback);
        if (this._subscribers[category].length === 0){
            delete this._subscribers[category];
        }
    }
    emit(data, category) {
       if ( Object.keys(this._subscribers).some((group) => group === category)){
           let group = this._subscribers[category];
           group.forEach((subscriber) => subscriber(data));
       }
    }
}

const obs = new Observer();
const news = new News(obs);

let user1 = new User("firstUser");
let user2 = new User("secondUser");
let user3 = new User("thirdUser");
let user4 = new User("someUser");

obs.subscribe(user1.receive);
obs.subscribe(user2.receive);
obs.subscribe(user3.receive);
news.generateNews();
console.log();

obs.once(user4.receive);
news.generateNews();
console.log();
news.generateNews();
console.log();

console.log(obs.countSubscribers());
console.log(obs.isConsist(user1.receive));
console.log(obs.isConsist(user4.receive));
console.log();

obs.unsubscribe(user1.receive);
news.generateNews();
obs.unsubscribeAll();
news.generateNews();


const emitter = new EventEmitter();
const journalist1 = new News(emitter);
const journalist2 = new News(emitter);
const journalist3 = new News(emitter);

emitter.subscribe("sport", user1.receive);
emitter.subscribe("sport", user2.receive);
emitter.subscribe("sport", user3.receive);
emitter.subscribe("it", user3.receive);
emitter.subscribe("it", user4.receive);
emitter.subscribe("music", user2.receive);
emitter.subscribe("music", user3.receive);

console.log("\nSport: ");
journalist1.generateNews("sport");
console.log("It: ");
journalist2.generateNews("it");
console.log("Music: ");
journalist3.generateNews("music");

emitter.unsubscribe("sport", user1.receive);
emitter.unsubscribe("sport", user2.receive);
emitter.unsubscribe("sport", user3.receive);

console.log("\nSport: ");
journalist1.generateNews("sport");
console.log("It: ");
journalist2.generateNews("it");
console.log("Music: ");
journalist3.generateNews("music");