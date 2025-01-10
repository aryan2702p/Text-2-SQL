import jwt from "jsonwebtoken";

 export default authMiddleware = async (req, res, next) => {

    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden" });
            }
            req.user = user;
            next();
        });

    }catch(error){
        console.log("error in authmiddleware",error);
        res.status(500).json({ error: error.message });
    }

}