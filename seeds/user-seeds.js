const { User } = require('../models')
const sequelize = require('../config/connection')

const userData = [
    {
        username: "alex",
        email: "alex@email.com",
        password: "alex123"
    },
    {
        username: "bob",
        email: "bob@email.com",
        password: "bob123"
    },
    {
        username: "carl",
        email: "carl@email.com",
        password: "carl123"
    },
    {
        username: "doug",
        email: "doug@email.com",
        password: "doug123"
    },
    {
        username: "earl",
        email: 'earl@email.com',
        password: 'earl123'
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers