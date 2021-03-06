var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

router.get('/', (req, res) => {
  console.log(req.session);

  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:400px; display:block; margin-top:10px;">
    `,
    `<a href="/topic/create">create</a>`,
    auth.statusUI(req, res)
  );
  res.send(html);
});

module.exports = router;
