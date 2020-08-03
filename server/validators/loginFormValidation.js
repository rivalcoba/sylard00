// NOTA: ESTA AUN NO SE HA USADO
// Importing validation framework
import * as Yup from 'yup';

// Creating validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export default (req, res, next) =>
  LoginSchema.validate(req.body)
    .then(() => next())
    .catch((error) =>{
      req.flash('error_msg',`El formulario no ha sido llenado correctamente: ${error.message}`)
      res.redirect('/index/login')
      // res.status(422).json({
      //   [error.path]: error.message,
      // })
    });
