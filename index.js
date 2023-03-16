const app=require('./server');
//configure
require('dotenv').config();
//server
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is on port ${port}`);
});