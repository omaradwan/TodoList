const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authtoken = req.headers["Authorization"] || req.headers["authorization"];

    if (!authtoken) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
   const token = authtoken.split(' ')[1];
  //  console.log("tetetetet");
  //  console.log(token);
    try{
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch(err){
        res.status(404).json("error decoted token");
    }
  };
 
  

module.exports = verifyToken