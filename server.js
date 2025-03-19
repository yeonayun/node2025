const express = require('express'); 
const app = express(); 
const port = 3000; 

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, Node.js with Express!');
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});