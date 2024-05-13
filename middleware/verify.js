const jwt = require("jsonwebtoken");


exports.verifyToken = (role) => (req,res,next) =>{

    const token = req.headers["auth"] || null

    if (!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, "SECRETKEY", (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        console.log(decoded.role)
        console.log(role)
        if (decoded.role != role){
            return res.status(401).json({ message: "Unauthorized" });
        }
        else {
        next();
        }
      });

}