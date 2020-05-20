const path = require('path')
const express = require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')

const app = express()

//Define paths for express
const directoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//handlebar setup and views location setting
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(directoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Mohit Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Mohit Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptxt:'This is the help page.',
        title:'Help',
        name:'Mohit Kumar'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide a location!"
        })
    }
    
    forecast(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            data,
            address:req.query.address
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mohit Kumar',
        errmsg:'Help page not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mohit Kumar',
        errmsg:'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log('Server is running!')
})