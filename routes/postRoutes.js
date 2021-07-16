const express = require('express');
const router = express.Router();
const Post = require("../models/postmodel");
const multer = require('multer');
const Cluster = require('../models/Cluster');

const storage = multer.diskStorage({
    destination: (req,file ,callback) => {
        callback(null ,'./front-end/public/uploads/');
    } ,
    filename:(req, file, callback) => {
        callback(null , file.originalname);
    }
})

const upload = multer({storage:storage});
router.get('/',(req,res)=>{
    Post.find({},(err ,found)=>{
        if(!err){
            res.status(200).json(found);
        }
        else {
            res.status(404).json(`${err}`);
        }
    })
});

router.post('/upload',upload.single('articleImage'),(req,res)=>{
    

    console.log(req.body);
    
    const item = new Post({
        catagory:req.body.catagory,
        title:req.body.title,
        news:req.body.news,
        img:req.file.originalname
    });
    const data  = new Cluster({
        data : req.body.news
    });
    console.log(item);
    item.save();
    data.save();
})
// router.post("/",(req,res)=>{
//     let newData = [];
//     Post.find({},(err, found)=>{
//         if(!err){
//             found.forEach(element => {
//                 tempData ={
//                     news: element.news
//                 }
//                 newData.push(tempData)
//             });
//         }
//         else {
//             console.log(err);
//         }
//         cluster = new Cluster({
//             data : newData
//         });
//         cluster.save();
//     })
// })
 router.get("/pages/:id",(req,res)=>{
    console.log(req.params.id)
    Post.find({catagory: req.params.id}, (err, found)=>{
        if(!err){
            res.status(200).json(found);
        }
        else{
            res.status(404).json(`${err}`);
        }
    })
})
router.get("/search/:id",async (req,res)=>{
    const finder = req.params.id;
    console.log(finder);
    var regex = new RegExp(finder);
    
    await Post.find({
        news: regex
    },(err, found)=>{
        if(!err){
            console.log(found);
            res.status(200).json(found);
        }
        else {
            res.status(404).json(`${err}`);
        }
    })
})
module.exports=router