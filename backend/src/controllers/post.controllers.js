import { Post } from "../models/post.model.js";

// Create a post

const createPost = async (req, res) => {

    try {

        const {name, description, age} = req.body;
        
        if(!name || !description || !age){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const post = await Post.create({name, description, age});
        res.status(201).json({
            message: "Post has been created successfully",
            post
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", 
            error: error.message,
            stack: error.stack
        });
        
    }
}

// Read all posts
const getPosts = async (req, res) => {

    try {

        const posts = await Post.find();
        res.status(201).json(posts);
        
    } catch (error) {

        res.status(500).json({
            message: "Internal Server error", 
            error: error.message,
            stack: error.stack
        });
        
    }
}

// Update post
const updatePost = async (req, res) => {

    try {

        // Basic validation
        // {name: x, description: y, age: z} -> [name, description, age]

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post updated successfully",
            post
        });
        
    } catch (error) {

        res.status(500).json({
            message: "Internal Server error", 
            error: error.message,
            stack: error.stack
        });
        
    }
}


// Delete post
const deletePost = async (req, res) => {

    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post successfully deleted"
        });
        
    } catch (error) {

        res.status(500).json({
            message: "Internal Server error", 
            error: error.message,
            stack: error.stack
        });
        
    }
}

export{
    createPost,
    getPosts,
    updatePost,
    deletePost
};