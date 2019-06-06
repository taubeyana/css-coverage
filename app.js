const express = require('express');
const app = express();

const expressHbs = require('express-handlebars');

const coverage = require('./coverage/home.json');

app.set('view engine', 'hbs')
app.engine('hbs', expressHbs());

app.get('/', (req,res) => {
    const coverageCssOnly = coverage.filter(el => el.url.indexOf('.js') > -1);
    const cssRules = [];
    coverageCssOnly.forEach(el => {
        let text = '';
        const cssRule = {}
        el.ranges.forEach(range => {
            text += el.text.slice(range.start, range.end) + '\n \n';
            cssRule['header'] = el.url;
            cssRule['text'] = text;
        })
        text = '';
        cssRules.push(cssRule)
    })
    const func =  () => console.log('ok')
    res.render('cleaner', {
        cssRules,
        func: func
    })
})

app.listen(9090)