import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";
const router=express.Router();
import {authMiddleware} from "../middleware/auth.js"

router.post('/add',middleware,async(req,res)=>{
try{
    const{title,description}=req.body;
   
    const newNote=new Note({
        title,
        description,
        userId:req.user.id,
    });
    await newNote.save()
    return res.status(200).json({success:true,message:"Note Created Successfully ",note:newNote,})
     }catch(error){
        console.error(error)
         return res.status(500).json({success:false,message:"Error in Adding New note "})

   
}

})
router.get('/',middleware,async(req,res)=>{
  try{
    const notes=await Note.find({userId:req.user.id})
    return res.status(200).json({success:true,notes})
  }catch{
    console.error(error);
    return res.status(500).json({success:false,message:'cannot retrieve notes'});
  }
})

router.put("/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const updateNote=await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true,updateNote})
    }catch{
    console.error(error);
    return res.status(500).json({success:false,message:'cannot update notes'});
  }
})
router.delete("/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const updateNote=await Note.findByIdAndDelete(id)
        return res.status(200).json({success:true,updateNote})
    }catch{
    console.error(error);
    return res.status(500).json({success:false,message:'cannot delete notes'});
  }
})
router.put("/pin/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.pinned = !note.pinned;
    await note.save();
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



export default router;