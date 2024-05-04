import { message } from "antd";
import Post from "../models/post.models.js";
import User from "../models/user.model.js";

const createPost = async (req, res) => {
    try {
        const {userId} = req.user;
        const {title, content, tags, author} = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({error: 'User not found'})
        }

        if(!title || !content || !tags){
            return res.status(404).json({error: 'All fields required'})
        }

        const newPost = new Post({
            title,
            content,
            tags,
            author: userId
        });

        await newPost.save();
        
        await User.findByIdAndUpdate(userId, {$push: {posts: newPost._id}})

        // user.posts.push(newPost._id);
        // await user.save();

        res.status(201).json(newPost);

    } catch (error) {
        console.error('Error in createPost: ', error);
        res.status(500).json('Internal server error')
    }
    
};

const deletePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const {userId} = req.user;
    
        const user = await User.findById(userId);
        const post = await Post.findById(postId);
    
        if(!post){
            return res.status(404).json({error: 'Post not found'})
        };

        if(post.author.toString() !== userId){
            return res.status(403).json({error: "You don't have permission to perform this action"});
        }

        await Post.findByIdAndDelete(postId);

        if (user) {
            // Remove the post's ID from the user's posts array
            user.posts = user.posts.filter(postId => postId.toString() !== postId.toString());

            // Save the updated user document
            await user.save();
        }

        // await User.findByIdAndUpdate(userId, {$pull: {posts: postId}}, {new: true})

        res.status(200).json({message: 'Post delete successfully'})

    } catch (error) {
        console.error('Error in deletePost: ', error);
        res.status(500).json({message: error.message})
    }
    

}

export {
    createPost,
    deletePost
}