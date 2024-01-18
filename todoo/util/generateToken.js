const jwt = require("jsonwebtoken");
module.exports =  async(userId) =>{
    const secretKey = process.env.SECRET_KEY
    // Create a token with the user's ID
    const token = await jwt.sign( userId , secretKey, { expiresIn: '1h' });
  
    return token;
}
