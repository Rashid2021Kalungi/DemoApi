import jwt from 'jsonwebtoken'
const auth= async (req,res,next)=>{

    try {
        const token =
          req.cookies?.accessToken ||
          (req.headers?.authorization?.startsWith("Bearer") &&
            req.headers.authorization.split(" ")[1]);
        if (!token) {
          return res.status(401).json({
            message: "You're not logged in",
            error: true,
            success: false,
          });
        }
        console.log("Token:", token);
        console.log("Secret:", process.env.SECRET_KEY_ACCESS_TOKEN);

        const decode = jwt.verify(
          token,
          process.env.SECRET_KEY_ACCESS_TOKEN
        );
        if(!decode  || !decode.id){
            return res.status(401).json({
                message: "unauthorised access",
                error: true,
                success: false
            })
        }
        req.userId=decode.id
        next()
    } catch (error) {
        return res.status(500).json({
          message: error.message || error,
          error: true,
          success: false,
        });
    }

}
export default auth