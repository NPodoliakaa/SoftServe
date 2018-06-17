class EventEmitter {
    constructor(categories) {
        this._subscribers = {};
        if (categories) {
            categories.forEach((category) => this._subscribers[category] = []);
        }
    }

    subscribe(category, callback) {
        if (!(category in this._subscribers)) {
            this._subscribers[category] = [];
        }
        this._subscribers[category].push(callback);
    }

    unsubscribe(category, callback) {
        if (category in this._subscribers) {
            this._subscribers[category] = this._subscribers[category].filter(subscriber => subscriber !== callback);
            if (this._subscribers[category].length === 0) {
                delete this._subscribers[category];
            }
        }
    }

    emit(data, category) {
        if (category in this._subscribers) {
            let group = this._subscribers[category];
            group.forEach((subscriber) => subscriber(data));
        }
    }
}

module.exports = EventEmitter;