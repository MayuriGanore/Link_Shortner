const express=require('express')
const ShortUrl=require('./models/shortUrl')
const mongoose=require('mongoose')
const app=express()

mongoose.connect('mongodb://localhost:27017/TASK4',{
    useNewUrlParser: true,
    connectTimeoutMS: 30000,
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.get('/',async(req,res)=>{
    const shortUrls=await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls})
})
app.post('/shortUrls',async(req,res)=>{
    await shortUrl.create({full:req.body.fullUrl})

    res.redirect('/')
})
app.get('/:shortUrl',async(req,res)=>{
    const shortUrl=await ShortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl==null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})
app.listen(process.env.PORT||5000);