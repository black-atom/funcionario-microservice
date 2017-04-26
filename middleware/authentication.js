exports.authVerification = (req, res, next) => {
    const token = req.get('x-access-token') || req.get('token');
    console.log(token);
    if(token){
        next();
    } else {
        res.status(403).json({message: 'Coloca o Token seu merda!'})
    }
}