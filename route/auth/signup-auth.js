const express=require('express')
const router=express.Router();
const public=require("../../controller/auth/publicThings.js");
const protected=require("../../controller/auth/protectedThings.js");
const auth=require('../../middleware/auth');



router.get('/publicThings',public.get);
router.get('/protectedThings',auth(),protected.get);
module.exports=router;