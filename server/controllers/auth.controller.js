const { authService,emailService } = require("../services");
const httpStatus = require('http-status')

const authController = {
  async register(req, res, next) {
    try {


      //res.status(200).send({ok:'yes'})
      const {email,password}=req.body;
      const user = await authService.createUser(email,password);
      const token = await authService.genAuthToken(user);

      // send register email 
      emailService.registerEmail(email,user);
      console.log("email sent????");
      

      res.cookie('x-access-token',token).status(httpStatus.CREATED).send({
        user,
        token
      })

    } catch (err) {
      next(err);
    }
  },
  async signin(req, res, next) {
    try {
      const {email,password} = req.body;
      const user = await authService.signInWithEmailAndPassword(email, password);
      const token = await authService.genAuthToken(user);
      res.cookie('x-access-token',token).send({
        user,
        token
      })
      
    } catch (err) {
      next(err)
    }

  },
  async isauth(req,res,next) {
    res.json(req.user)
  }
};

module.exports = authController;
