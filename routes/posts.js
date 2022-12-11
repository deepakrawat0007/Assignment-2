const router = require('express').Router();
const Post = require('../models/post')
const bodyparser = require('body-parser')

router.use(bodyparser.json());


// parse application/x-www-form-urlencoded
router.use(bodyparser.urlencoded({ extended: false }))

router.get("/posts/get" , async (req,res)=>{
try{
    const posts = await Post.find({user:req.user})
    res.status(200).json({
        Posts :posts
    })

}catch(e){
    res.status(400).json({
        message : e.message
    })
}
})

router.post("/posts" , async (req,res)=>{
    const {title , body , image} = req.body
    try{
      const post = await Post.create({
        title: title,
        body: body,
        image: image,
        user: req.user
      })
      res.status(200).json({
        message: "New Post Created",
        "Post":post
      })

    }catch(e){
        res.status(400).json({
            message : e.message
        })
    }
})

router.put("/posts/:id" , async (req,res)=>{
    const _id = req.params.id

    try{
      const updateData = await Post.findByIdAndUpdate(_id,req.body,{ new:true,
        useFindAndModity:false})
      res.status(200).json({
        message: "Post Updated",
        "Post": updateData
      })

    }catch(e){
        res.status(400).json({
            message : e.message
        })
    }
})

router.delete("/posts/:id" , async (req,res)=>{
    const _id = req.params.id

    try{
      const dletedata = await Post.findByIdAndDelete(_id)
      res.status(200).json({
        message: "Post Deleted"

      })

    }catch(e){
        res.status(400).json({
            message : e.message
        })
    }
})




module.exports = router;