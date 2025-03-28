const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // 클라이언트로 보낼 메시지
    res.send('get swag');
  });
  
  router.post('/', (req, res) => {
    // 클라이언트로 보낼 메시지
    res.send(req.body);
  });
  
  router.post('/:person', (req, res) => {
    // 클라이언트로 보낼 메시지
    res.send(req.params.person);
  });

  module.exports = Router;