// Express 모듈을 가져옵니다
const express = require('express');

// Express 앱을 생성합니다
const app = express();
const port = 2007;

app.use(express.json())

// 루트 경로에 대한 GET 요청 처리
app.get('/swag', (req, res) => {
  // 클라이언트로 보낼 메시지
  res.send('get swag');
});

app.post('/swag', (req, res) => {
  // 클라이언트로 보낼 메시지
  res.send(req.body);
});

// 서버가 3000번 포트에서 요청을 기다립니다
app.listen(2007, () => {
  console.log(`Server running at http://localhost:${port}}/`);
});



