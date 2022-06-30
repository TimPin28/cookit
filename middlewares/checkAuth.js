exports.isPrivate = (req, res, next) => {
    // Must be authenticated to go to the next function
    if (req.session.userid) {
        return next()
    } else {
        res.redirect('/login');
    }
};

exports.isPublic = (req, res, next) => {
    // If authenticated, go to home page
    if (req.session.userid) {
        res.redirect('/');
    } else {
        console.log('not authed');
        return next();
    }
};