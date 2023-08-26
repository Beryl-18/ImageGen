import express  from "express";
import * as dotenv from 'dotenv';

import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req,res) => {
    res.send("Hello from DallE route");
});

router.route('/').post(async(req,res)=> {
    try {
        
        const bodyP = {
            prompt: req.body.prompt,
            n : 1,
            size: "1024x1024",
            response_format: "b64_json"
        };

        const response = await fetch ('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify(bodyP)
        });

        const dataResponse = await response.json();

        const imageUrl = dataResponse.data[0].b64_json;


        res.status(200).json({photo : imageUrl});

    }
    catch(error){
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    } 
})

export default router;

