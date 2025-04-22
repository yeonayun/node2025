const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const travelRouters = require('./routes/travel');

const app = express();
const port = 2001;

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extends: true}));
              
app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속해있는 디렉토리의 절대경로
// path.join : 운영체제에 맞추어 경로지정자(\, /)를 설정해준다
app.set('views', path.join(__dirname, 'views'));

app.use('/travel', travelRouters);

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});