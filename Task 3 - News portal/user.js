class User {
    constructor(name, id) {
        this._name = name
        this._id = id;
        this._articles = [];
        this._subscriptions = [];
        this.getNews = this.getNews.bind(this);
    }

    getNews(data) {
        this._articles.push(data);
    }
}

module.exports = User;