import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    blogTitle:{
        type:String
    },
    imageurl:[
        {
            url:String,
            location:{
                type:String,
                default:"left",
                enum:['left' , 'right' , 'center']
            }
        }
    ],
    content:{
        type:String
    }
} , {
    timestamps:true
});

const Blog = new mongoose.model("blog" , blogSchema);
export {Blog};