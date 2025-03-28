// Express 모듈을 가져옵니다
const express = require('express');
const swagRouter = require('./routes/swag');

// Express 앱을 생성합니다
const app = express();
const port = 2007;

app.use(express.json())
app.use('/swag', swagRouter)


// 서버가 3000번 포트에서 요청을 기다립니다
app.listen(2007, () => {
  console.log(`Server running at http://localhost:${port}}/`);
});



