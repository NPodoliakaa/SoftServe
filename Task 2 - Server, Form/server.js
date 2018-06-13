const http = require('http');
const fs = require('fs');

const server = http.createServer(requestHandler);

function requestHandler (request, response) {
    const { headers, method, url } = request;
    switch (method) {
        case 'GET':
            let stream = fs.createReadStream ('./index.html');
            stream.pipe(response);
            break;
        case 'POST':
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                body = body.toString();
                body = JSON.stringify(body);
                fs.writeFile("./data.txt", body, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    response.write("The file was saved!");
                    response.end();
                });
            });
            break;
        default:
            response.statusCode = 404;
            response.end();
            break;
    }
}

server.listen(8080);