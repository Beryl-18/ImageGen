import mongoose from "mongoose";

const POST = new mongoose.Schema({
    name: {type: String, required: true },
    prompt: {type: String, required: true },
    photo: {type: String, required: true }
})

const PostSchema = mongoose.model ('Post', POST);

export default PostSchema