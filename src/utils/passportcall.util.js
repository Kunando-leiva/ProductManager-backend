import passport from "passport";

const  passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if(err) return next(err);
            if(!user)
             return res.status(401)
             .send({error:info.message ? info.message :"no autorizado (en passportCall)"});
        req.user = user;
        next();
    })(req, res, next)}
}

export default passportCall;
