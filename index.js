const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ShortUrl=require("./modal/ShortUrl");
const port=1100;

mongoose.connect('mongodb://localhost:27017/urlShortner',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false }))
app.get("/",async(req,res)=>{
    const shortUrls = await ShortUrl.find()
 res.render("index",{shortUrls: shortUrls});
})
app.post("/shortUrls", async(req,res)=>{
await ShortUrl.create({full:req.body.fullUrl});
res.redirect('/');
})
app.get('/:shortUrls', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrls })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++//increase clicks
    shortUrl.save()//save in the database
  
    res.redirect(shortUrl.full)
  })
app.listen(port,()=>{
 console.log("hello i am started");
})