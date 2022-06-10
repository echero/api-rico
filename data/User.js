const User = require('../models/user')

const Users = [
    new User (1,'Ezequiel','Cheron',34,true,[1]),
    new User (2,'Javier','Cheron',33,true,[1,3]),
    new User (3,'Matias','Ramirez',64,true,[1,2]),
    new User (4,'Adam','coca',24,true,[2]),
    new User (5, 'noname', 'nosurname', 100, false, [])
]

module.exports = Users