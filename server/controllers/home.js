
// Home Controllers
const index = (req, res, next) => {
    // Check if the user is logged
    if(res.locals.user){
        res.redirect('/dashboard')
    }
    else{
        res.render('index/welcome', {});
    }    
}
const contact = (req, res, next) => {
    res.render('index/contact', { title: 'Contact', content:'Contact the administrator' });
}
const credits = (req, res, next) => {
    res.render('index/contact', { title: 'Credits', content:'Site builded by Drako-YonceCe' });
}
const dashboard = (req, res, next) => {
    res.render('index/dashboard', { title: 'Sylard Dashboard', content:'Audio Collections from diferent Authors' });
}
const documentation = (req, res, next) => {
    res.render('index/documentation', { title: 'Sylard Documentation', content:'You can find the instructions to use Sylard in this place.' });
}
const usermanual = (req, res, next) => {
    res.render('index/register', { title: 'User Manual', content:'Terms and conditions are presenting bellow....'});
}
const terms = (req, res, next) => {
    res.render('index/register', { title: 'Terms', content:'Terms and conditions are presenting bellow....'});
}

// Exporting Controllers
export default {
    index,
    contact,
    credits,
    dashboard,
    documentation,
    usermanual,
    terms
}