const { User } = require('../models')
const sequelize = require('../config/connection')

const userData = [
    {
        username: 'User1',
        email: 'email1@email.com',
        password: 'veryweakpassword'

    },
    {
        username: 'User2',
        email: 'email2@email.com',
        password: 'veryweakpassword'

    },
    {
        username: 'User3',
        email: 'email3@email.com',
        password: 'veryweakpassword'

    },
    {
        username: 'User4',
        email: 'email4@email.com',
        password: 'veryweakpassword'

    },
    {
        username: 'User5',
        email: 'email5@email.com',
        password: 'veryweakpassword'

    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers