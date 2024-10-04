const roleVerification = (req, res, next) => {
    if(!req.user.czyAdmin){
        return res.status(403).json({message: 'Brak uprawnien'});
    }
    next();
}

module.exports = roleVerification