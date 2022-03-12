module.exports = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>Web - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <a href="/auth/login">login</a>  
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list: function (filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
      list += `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
      i += 1;
    }
    list += '</ul>';
    return list;
  },
};