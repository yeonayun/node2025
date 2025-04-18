const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/add', (req, res)=>{
  res.render('addTravel');
})

// 전체 게시글 목록 보여주는 페이지
router.get('/:id', (req, res) => {
  const travelId = req.params.id;
  const _query = 'SELECT id, name FROM travellist WHERE id = ?';
  db.query(_query, [travelId],(err, results) => {
    if(err){
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travel = results;
    res.render('travelDetail', {travel});
  });
});

// 게시글의 내용을 읽기
router.get('/', (req, res) => {
  const _query = 'SELECT * FROM travellist';
  db.query(_query, (err, results) => {
    if(err){
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travelList = results;
    res.render('travel', {travelList});
  });
});

// 여행지 추가를 보여주는 페이지
router.post('/', (req, res) => {
  const {name} = req.body;
  const _query = 'INSERT INTO travellist (name) VALUES (?)';
  db.query(_query, [name],(err, results) => {
    if(err){
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.redirect('/');
  });
})

// 게시글 수정
router.put('/:id', (req, res) => {
  const travelId = req.params.id;
  const {name} = req.body;
  const _query = 'UPDATE travelList SET name = ? WHERE id  = ?';
  db.query(_query, [name, travelId],(err, results) => {
    if(err){
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.render('updateSuccess');
  });
});

// 게시글 수정 페이지
router.get('/:id/edit', (req, res) => {
  const travelId = req.params.id;
  const _query = 'SELECT * FROM travellist WHERE id = ?';
  db.query(_query, [travelId],(err, results) => {
    if(err){
      console.error('데이터베이스 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const travel = results[0];
    res.render('editTravel', {travel});
  });
});

router.get('/add', (req, res) => {
  res.render('addTravel')
});

// 게시글 삭제
router.delete('/:id', (req, res) => {
  const travelId = req.params.id;
  const _query = 'DELETE FROM travelList WHERE id = ?';
  db.query(_query, [travelId], (err, results) => {
    if(err) {
        console.error('DB 쿼리 실패', err);
      res.status(500).send('Internal Server Error');
    }
    res.render('deleteSuccess');
  });
});

module.exports = router;