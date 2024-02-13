import { Router } from 'express';
import Member from '../models/members.js';
import cors from 'cors';
import bcrypt from 'bcrypt';


const router = new Router();
//------------------------------------------------------------------
/**
 * GET - return all members
 */

router.get('/', async (req, res) => {
    const members = await Member.find({});
    res.status(200).json(members);
});
//-------------------------------------------------------------------
/**
 * GET /:id 
 * return member by id
 */
router.get('/:id', async (req, res) => {
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({msg: "Member id not found" });
    else res.json(member);
});
// router.get("/:id", async(req, res)=>{
//     const member = await Member.findById(req.params.id);
//     if (!member) res.send("Not found").status(404);
//     else res.send(member).status(200);
//   });

//---------------------------------------------------------------------

/**
 * POST - create a new member 
 */
router.post('/', async (req, res) => {
    console.log(req. body);
    try{
    const member = await Member.create(req.body);
    res.status(201).json(member);
    } catch (error) {
        console.log(error);
    }
});

//----------------------------------------------------------------------

/**
 * PUT /:id
 * Update Members data 
 * PATCH method also can be used (slightly different)
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        //Stops request from updating the user's password
        if (body.password) {
            delete body.password;
            console.log ('Password removed from body');
        }

        const updatedMember = await Member.findByIdAndUpdate(id, body, { new: true });
        res.json(updatedMember);
    } catch (error) {
        console.log(error);
        res.json({ msg: 'Member not found' });
    }
});

//----------------------------------------------------------------------
/**
 * DELETE /:id
 * Delete data from DB found by :/id
 */
router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedMember = await Member.findByIdAndDelete(id);
        res.json({msg:"Member is deleted", deletedMember});
    } catch (error) {
        console.log(error);
    }
});


//--------------------------------------------------------------------------


/**
 * PUT /:id/update-password
 * @param: client needs to send body: 
 * {
 *  currentPassword: "my old password"
 *  newPassword: "my new password"
 * }
 * 
 * We can use NodeMailer here to send emails before updating the password
 */
router.put('/:id/update-password', async (req, res) => {
    try {
      const {id} = req.params;
      const {currentPassword, newPassword} = req.body;
  
      // find the member to update
      const member = await Member.findById(id);
      if (!member) return res.status(404).json({msg: "Member not found!"})
  
      // verify the old password with the password hash in db 
      const passwordMatched = await bcrypt.compare(currentPassword, member.password);
      if (!passwordMatched) {
        return res.status(401).json({msg: "Authentication Error"})
      }
  
      console.log('password matched!');
  
      // hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      
      // set the old password hash to the newPassword hash
      await Member.findByIdAndUpdate(id, {password: hashedPassword});
  
      res.json({msg: 'Member password updated', member});
      
    } catch (error) {
      console.log(error);
    }
  });
  
  
  /**
   * POST /login
   * @description authenticates an member with email and password
   */
  router.post('/login', async (req, res) => {
    const {email, password} = req.body;
  
    // find member with the provided email
    const member = await Member.findOne({email});
  
    if (!member) {
      return res.status(401).json({msg: "Invalid Credentials"});
    }
  
    // verify provided password with password hash from db
    const passwordMatched = await bcrypt.compare(password, member.password);
  
    if (!passwordMatched) {
      return res.status(401).json({msg: "Invalid Credentials password"})
    }
  
    // TODO: generate a jwt token and send it to the client
    res.json({msg: "member is logged in!", member});
  
  });


/////////////////////////// new router///////////////////



router.get('/LoginSignup', cors(), (req, res) =>{

})

router.post('/', async(req, res)=>{
  const [email, password] =req.body

  try{
    const check = await membersSchema.findOne({email:email})
    if(check){
      res.json('exist')
    }   else{
      res.json('not exist')
    } 
  }
  catch(e){
      res.json('Does not exist')

  }
})

router.post('/Signup', async(req, res)=>{
  const [email, password] =req.body
  
  const data={
    email: email,
    password: password
  }

  try{
    const check = await membersSchema.findOne({email:email})
    if(check){
      res.json('exist')
    }   else{
      res.json('not exist')
      await membersSchema.insertMany([data]) 
    } 
  }
  catch(e){
      res.json('Does not exist')

  }
})
export default router;