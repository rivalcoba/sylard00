
export default {
    contact: (req, res, next) => {
        res.render('index/contact', { title: 'Contact', content:'Contact the administrator' });
    },
    credits: (req, res, next) => {
        res.render('index/contact', { title: 'Credits', content:'Site builded by Drako-YonceCe' });
    },
    dashboard:(req, res, next) => {
        res.render('index/dashboard', { title: 'Sylard Dashboard', content:'Audio Collections from diferent Authors' });
    },
    documentation:(req, res, next) => {
        res.render('index/documentation', { title: 'Sylard Documentation', content:'You can find the instructions to use Sylard in this place.' });
    },
    login:(req, res, next) => {
        res.render('index/documentation', { title: 'Login', content:'Enter your credentials to login.' });
    },
    register:(req, res, next) => {
        res.render('index/register', { title: 'Register', content:'Fill out the form to register....' });
    },
    terms:(req, res, next) => {
        res.render('index/register', { title: 'Terms', content:'Terms and conditions are presenting bellow....'});
    },
    usermanual:(req, res, next) => {
        res.render('index/register', { title: 'User Manual', content:'Terms and conditions are presenting bellow....'});
    },
    index: (req, res, next) => {
        res.render('index/welcome', { title: 'Welcome to Sylard', content:'SYLARD means: Synchronized language annotation result display' });
    }
}