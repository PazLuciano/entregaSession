const authMdw = (req, res, next) => {
    // console.log("REVISANDO LA SESION**", req.session);
    
    if (req.session?.user) {
      return next();
    }
  
    return res.redirect("/api/v1/views/login");
  };
  
  module.exports = authMdw;