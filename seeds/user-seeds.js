const { User } = require('../models')
const sequelize = require('../config/connection')

const userData = [
    {
        username: "alex",
        email: "alex@email.com",
        password: "alex123",
        isVerified: true,
        verificationCode: ""
    },
    {
        username: "bob",
        email: "bob@email.com",
        password: "bob123",
        isVerified: true,
        verificationCode: ""
    },
    {
        username: "carl",
        email: "carl@email.com",
        password: "carl123",
        isVerified: true,
        verificationCode: ""
    },
    {
        username: "doug",
        email: "doug@email.com",
        password: "doug123",
        isVerified: true,
        verificationCode: ""
    },
    {
        username: "earl",
        email: 'earl@email.com',
        password: 'earl123',
        isVerified: true,
        verificationCode: ""
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers