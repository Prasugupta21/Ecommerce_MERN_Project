require('dotenv').config();
const express=require('express');
const connectDB=require('./config/db');
const cors=require('cors');

const authRoute=require('./routes/auth');
const CategoryRoute=require('./routes/category');
const ProductRoute=require('./routes/product');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const PORT=process.env.PORT  ;

const path=require('path');
// const {fileURLToPath}=require('url');
// const __filename=fileURLToPath(require.meta.url)
// const __dirname=path.dirname(__filename)
connectDB();
const app=express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',CategoryRoute)
app.use('/api/v1/product',ProductRoute)

app.use('*',function(req,res){
     res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
app.listen(PORT,()=>{
    console.log(`server started on ${process.env.DEV_MODE} mode on port ${PORT}`)
})