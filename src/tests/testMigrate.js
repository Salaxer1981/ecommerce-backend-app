const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models');
require('../models/Purchase')
require('../models/Cart')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Test",
            lastName: "User",
            email: "test@gmail.com",
            password: "test123",
            phone: "123456789"
        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();