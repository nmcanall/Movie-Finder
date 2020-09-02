const router = require('express').Router();
const sequelize = require('../config/connection');
const {  } = require('../models');

router.get('/', async (req,res) => {
    try{
        res.render('homepage')
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
module.exports = router