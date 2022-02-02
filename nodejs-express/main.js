const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');

// parse application/x-www-form-urlendcoded
app.use(bodyParser.urlencoded({ extended: false }));

// compress all responses
app.use(compression());

app.get('/', (req, res) => {
  fs.readdir('./data', (error, filelist) => {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    res.send(html);
  });
});

app.get('/page/:pageId', (req, res) => {
  fs.readdir('./data', (error, filelist) => {
    var filteredId = path.parse(req.params.pageId).base;

    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
      var title = req.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1'],
      });

      var list = template.list(filelist);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      res.send(html);
    });
  });
});

app.get('/create', (req, res) => {
  fs.readdir('./data', (error, filelist) => {
    var title = 'create';
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      ''
    );
    res.send(html);
  });
});

app.post('/create_process', (req, res) => {
  /* var body = '';

  req.on('data', data => (body += data));

  req.on('end', () => {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;

    fs.writeFile(`data/${title}`, description, 'utf8', err => {
      // res.writeHead(302, { Location: `/page/${title}` });
      // res.end();
      res.redirect(`/page/${title}`);
    });
  }); 
  */

  var post = req.body;
  var title = post.title;
  var description = post.description;

  fs.writeFile(`data/${title}`, description, 'utf8', err =>
    res.redirect(`/page/${title}`)
  );
});

app.get('/update/:pageId', (req, res) => {
  fs.readdir('./data', (error, filelist) => {
    var filteredId = path.parse(req.params.pageId).base;

    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
      var title = req.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update/${title}">update</a>`
      );

      res.send(html);
    });
  });
});

app.post('/update_process', (req, res) => {
  var post = req.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;

  fs.rename(`data/${id}`, `data/${title}`, error => {
    fs.writeFile(`data/${title}`, description, 'utf8', err =>
      res.redirect(`/page/${title}`)
    );
  });
});

app.post('/delete_process', (req, res) => {
  var post = req.body;
  var id = post.id;
  var filteredId = path.parse(id).base;

  fs.unlink(`data/${filteredId}`, error => res.redirect('/'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

/* var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
      } else {
      }
    } else if(pathname === '/create'){
      
    } else if(pathname === '/create_process'){
      
    } else if(pathname === '/update'){
      
      });
    } else if(pathname === '/update_process'){
      
    } else if(pathname === '/delete_process'){
      
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000); */