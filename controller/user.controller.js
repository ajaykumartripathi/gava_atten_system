const db = require("../models/db");
const users = db.user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');

// user register

exports.signUp = async(req,res)=>{
try{
    console.log(req.body)
    const {firstName, lastName, email, mobile_no, password,roleId,isActive} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
//    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

const userData ={
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile_no: mobile_no,
    password: hash,
    roleId: roleId != undefined?roleId:2,
    isActive: isActive != undefined?isActive:true
}
console.log(userData)
const getUser = await users.findOne(
    {
        where:{
            [Op.or]:[
                {
                    email:email
                },
                {
                    mobile_no:mobile_no
                }
            ]
        }

});
if(!getUser)
{
    console.log(userData)
const user = await users.create(userData,
{ fields: ["firstName", "lastName", "email", "mobile_no", "password", "roleId", "isActive"]});
res.status(201).send({
    status:'success',
    userInfo:user
   })
}
else{
    res.status(409).json({
        Message: "Mobile Number or email already exits",
        data: {
            mobile_no:mobile_no,
            email:email
        },
      });
}

}catch(error)
{
    res.status(503).send(error)
console.log("working")
}
}

exports.login = async(req,res)=>{

    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({
                'Message':'Email and Password are Required !'
            })
        } 
    
        const findUser = await users.findOne({where:{email:email}});
        if(!findUser) return res.sendStatus(401);
    
        const pwdMatch = await bcrypt.compare(password, findUser.password);
        if(!pwdMatch) return res.status(400).json({'Message':'password not matched'})

        // token generate
        const token= await jwt.sign({
            email:findUser.email,
            userId:findUser.id
          }, 'access',{expiresIn: '2m'})

        const refreshToken= await  jwt.sign({
            email:findUser.email,
            userId:findUser.id
          }, 'refresh',{expiresIn: '1h'})

          res.status(200).json({
            'status':'success',
            userInfo:findUser,
            token:token,
            refreshToken:refreshToken
          })
    }
    catch(error)
    {
        res.status(503).send(error)
    }
}

exports.refreshToken=(req, res,next) => {
    // console.log(req.body.refreshtoken)
    const refreshToken = req.body.refreshtoken;
  // if (!refreshToken || !refreshTokenSecret.includes(refreshToken)) {
  //     return res.status(401).json({ message: "Refresh token not found, login again" });
  // }
  
  // If the refresh token is valid, create a new accessToken & refresh token and return it.
  jwt.verify(refreshToken, "refresh", (err, user) => {
      if (!err) {
        console.log(user)
          const accessToken = jwt.sign({userId:user.userId, email: user.email }, "access", {
              expiresIn: "2m"
          });
          const refreshToken = jwt.sign({userId:user.userId, email: user.email }, "refresh", {
            expiresIn: "1h"
        });
          return res.status(201).json({ success: true, accessToken ,refreshToken});
      } else if (err.message === "jwt expired") {
        return res.status(401).json({
          success: false,
          message: "refreshtoken expired"
        });
      } else {
          return res.status(401).json({
              success: false,
              message: "Invalid refresh token"
          });
      }
  });
  };

  exports.getAllUser = async(req,res)=>{
   const allUsers = await users.findAll({});
   if(allUsers.length == 0)
   {
    res.status(404).send({
        Message:"User not available"
    })
   }
   else{
    res.status(200).send({
        status:'success',
        userInfo: allUsers
    })
   }
  }

  exports.getSingleUser = async(req,res)=>{
  try{
    const id = req.params.id
    console.log(id)
     const singleUser = await users.findOne({
         where:{
             id:id
         }
     })
     if(singleUser)
     {
         res.status(200).send({
             status:'success',
             userInfo: singleUser
         })
     }
     else{
         res.status(404).send({
             Message: 'User Not Available'
         })
     }
  }
  catch(error)
  {
    res.status(503).send(error)
  }
  }

  exports.singleDelete = async(req,res)=>{
      try{
          const id = req.params.id
const Alldelete = await users.destroy({
    where:{
        id:id
    }
})
console.log(Alldelete)
if(Alldelete)
{
    res.status(200).send({
        Message: 'delete Success'
    })
}
else
{
    res.status(404).send({
        Message: 'No user Available'
    })
}
      }
      catch(error)
      {
        res.status(503).send(error)
      }
  }

