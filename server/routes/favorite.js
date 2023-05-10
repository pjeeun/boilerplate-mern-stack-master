const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId }) // server/models의 Favorite.js의 movieId 스키마와 Client의 Favorite.js의 let 변수 movieId와 같은 정보를 찾아달라.
    .exec((err, info) => {
        if(err) return res.status(400).send(arr) // error 나면 관련 정보 client에 보내줌
        // 그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

router.post('/favorited', (req, res) => {
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom }) // server/models의 Favorite.js의 movieId 스키마와 Client의 Favorite.js의 let 변수 movieId와 같은 정보를 찾아달라.
    .exec((err, info) => {
        if (err) return res.status(400).send(arr) // error 나면 관련 정보 client에 보내줌
        
        let result = false
        if(info.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, favorited: result })
    })
})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err, favorites) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success: true, favorites})
    })
})

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})
router.post('/getFavoredMovie', (req, res) => {
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

module.exports = router;