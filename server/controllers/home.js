
export default {
    index: (req, res, next) => {
        res.render('index/welcome', { title: 'Welcome to Sylard' });
    },
    dashboard:(req, res, next) => {
        res.render('index/dashboard', { title: 'Dashboard' });
    }
}