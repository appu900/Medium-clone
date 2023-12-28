const mongoose = require('mongoose');


let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];


const userSchema = new mongoose.Schema({

    personal_info:{
        fullname:{
            type:String,
            required:true,
            lowercase:true,
            minlength:[3,"fullname should be atleast 3 characters long"],
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:[true,'unique email id required'], 
        },
        password:String,
        username:{
            type:String,
            minlength:[3,"username should be atleast 3 characters long"],
            unique:true,
        },
        bio:{
            type:String,
            maxlength:[200,"bio should be less than 100 characters long"],
            default:""
        },
        profile_img:{
            type:String,
            default:()=>{
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
            }
        },
    },
    social_links:{
        facebook:{
            type:String,
            default:""
        },
        twitter:{
            type:String,
            default:""
        },
        instagram:{
            type:String,
            default:""
        },
        linkedin:{
            type:String,
            default:""
        },
        github:{
            type:String,
            default:""
        },
        website:{
            type:String,
            default:""
        },
        youtube:{
            type:String,
            default:""
        },
    },
    account_info:{
        total_posts: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
    },
    google_auth: {
        type: Boolean,
        default: false
    },
    blogs: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'blogs',
        default: [],
    },
  

}, { timestamps: { createdAt: 'joinedAt' } });


const User = mongoose.model('users', userSchema);
module.exports = User;