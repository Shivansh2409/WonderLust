const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {
    res.render('./users/signup.ejs');
}
module.exports.signup=async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser= new User({ username, email });
        const registerUser= await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err){ 
                return next(err);
            }
            req.flash('success', 'Welcome to the app');
            res.redirect('/listings');
        });
    }catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }

    
}
module.exports.renderLoginForm = (req, res) => {
    res.render('./users/login.ejs');
}
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success', 'Goodbye');
        res.redirect('/listings');
    }
    );
}