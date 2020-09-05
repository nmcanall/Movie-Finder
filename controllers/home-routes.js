const router = require('express').Router();
const sequelize = require('../config/connection');
const {queryMovieAPI,formatDate} = require('../utils/helpers')
const { Movie, Favorite } = require('../models');

router.get('/', async (req,res) => {
    try{
        res.render('homepage',{loggedIn: req.session.loggedIn})
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/login', async (req,res) => {
    try{
        res.render('login')
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/search', async (req,res) => {
    try{
        const loggedIn = req.session.loggedIn
        if (!loggedIn) {
            res.redirect('/login')
            return
        }
        const results = await queryMovieAPI(req.query.query)
        for (result of results.results) {
            result.date = formatDate(result.release_date)
        }
        res.render('search', {search:true,results:results.results,loggedIn})
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/favorites', async (req,res) => {
    try {
        const loggedIn = req.session.loggedIn
        if (!loggedIn) {
            res.redirect('/login')
            return
        }
        const rawMovies = await Movie.findAll({
            include: [
                {
                    model: Favorite,
                    where: {user_id: req.session.user_id}
                }
            ]
        })
        const movies = rawMovies.map(movie => movie.get({plain:true}))
        res.render('favorites',{blockJumbotron:true,loggedIn,listPage:true,movies})
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})
router.get('/watch', async (req,res) => {
    try {
        const loggedIn = req.session.loggedIn
        if (!loggedIn) {
            res.redirect('/login')
            return
        }
        res.render('watchlater',{blockJumbotron:true,loggedIn,listPage:true,})
    }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})
module.exports = router