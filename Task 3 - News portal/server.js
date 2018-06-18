const http = require('http');
const url = require('url');
const fs = require('fs');
const User = require('./user');
const News = require('./news');
const EventEmitter = require('./eventEmitter');
const Service = require('./service');

http.createServer(router).listen(8080);

let service = new Service();

function router(request, response) {
    let path = url.parse(request.url).pathname;
    let array = path.split('/');
    if (array.length < 6) {
        if (array[1] == 'user') {
            if (array[3] == 'subscription') {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(service.getSubscriptions(array[2]));
            }
            else if (array[3] == 'export') {
                let path = service.exportUser(array[2]);
                response.writeHead(200, {"Content-Type": "application/json"});
                const stream = fs.createReadStream(`${path}`).pipe(response);
            }
            else if (array.length === 3) {
                response.writeHead(200, {"Content-Type": "application/json"});
                let user = service.getUserById(array[2]);
                response.write(JSON.stringify(user));
            }
            else {
                response.statusCode = 404;
                response.write("URL is incorrect.");
            }
        }
        else if (array[1] == 'news') {
            if (array[3] == 'subscribe') {
                response.statusCode = 200;
                service.subscribe(array[4], array[2]);
            }
            else if (array[3] == 'unsubscribe') {
                response.statusCode = 200;
                service.unsubscribe(array[4], array[2]);
            }
            else if (array.length == 3) {
                response.writeHead(200, {"Content-Type": "application/json"});
                let news = service.getNewsById(array[2]);
                response.write(JSON.stringify(news));
            }
            else {
                response.statusCode = 404;
                response.write("URL is incorrect.");
            }
        }
        else {
            response.statusCode = 404;
            response.write("URL is incorrect.");
        }
    }
    else {
        response.statusCode = 404;
        response.write("URL is incorrect.");
    }
}