import express  from "express";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from "../mongodb/models/post.js";


dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}) 



router.route('/').get(async(req,res) => {
    res.send("Hello");

})


// router.route('/').get(async(req,res)=>{
//     try {
//         const posts = await Post.find({})

//         res.status(200).json({success:true, data: posts})
//     }
//     catch(e){
//         res.status(500).json({success:false, data: e})
//     }


// })

router.route('/').post(async(req,res)=>{


    try {
        console.log(req.body);

        const {name, prompt, photo} = req.body;

        console.log(req.body);
        
        

        const form = JSON.stringify(req.body);
        console.log("form : "+form);
        console.log("\n\n");

        const photoUrl = await cloudinary.uploader.upload(photo);
        // const newPost = await Post.create({
        //     name, 
        //     prompt, 
        //     photo:photoUrl
        // })

        // res.status(500);
        // res.status(201).json({success:true, data:newPost})
    }
    catch (e){
        res.status(500).json({success: false, message: 'Unable to create a post, please try again'});
        console.log("issue with cloudinary upload");
        console.log(e); 
    }




})

export default router;