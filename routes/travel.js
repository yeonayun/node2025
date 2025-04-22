const express = require('express');
const router = express.Router();
const db = require('../db');

// 전체 게시글 목록 보여주는 페이지
router.get('/', async (req, res) => {
  try {
    const _query = 'SELECT * FROM travellist';
    // 비동기 처리
    const [results] = await db.query(_query);
    const travelList = results;
    res.render('travel', {travelList});
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/add', (req, res) => {
  res.render('addTravel')
});

// 여행지 추가
router.post('/', async (req, res) => {
  const {name} = req.body;
  try {
    const _query = 'INSERT INTO travellist (name) VALUES (?)';
    await db.query(_query, [name])
    res.redirect('/travel');
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
})

// 게시글의 내용을 읽기
router.get('/:id', async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = 'SELECT id, name FROM travellist WHERE id = ?';
    const [results] = await db.query(_query, [travelId]);
    const travel = results[0];
    console.log(results[0], travel);
    res.render('travelDetail', {travel});
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 수정 페이지
router.get('/:id/edit', async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    const [results] = await db.query(_query, [travelId]);
    const travel = results[0];
    res.render('editTravel', {travel});
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
  const travelId = req.params.id;
  const {name} = req.body;
  try {
    const _query = 'UPDATE travelList SET name = ? WHERE id  = ?';
    await db.query(_query, [name, travelId]);
    res.render('updateSuccess');
  } catch (err) {
    console.error('데이터베이스 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  const travelId = req.params.id;
  try {
    const _query = 'DELETE FROM travelList WHERE id = ?';
    await db.query(_query, [travelId]);
    res.render('deleteSuccess');
  } catch (err) {
    console.err('DB 쿼리 실패', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;