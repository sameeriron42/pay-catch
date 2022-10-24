require('dotenv').config()
const https = require('https')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto')

const app = express();
const port = 5000;

const secret = '123'
//Ideally to pull previous trasactions from database
let prevTrxId = ["pay_KQtKm3kTWcbSuX","pay_KQurBFeMsoNHlC","pay_KRBqnEUvK3Fier"]
const pinId = 'V3';
const address = 'https://blr1.blynk.cloud/external/api/update?token=';

app.use(cors())
/* using buffer to store the raw webhook request body
   so that razorpay signature header and 
   our generated signature matches
*/
app.use(bodyParser.json({
    verify: (req,res,buf) =>{
        req.rawBody = buf
    }
}));

app.get('/api/pay_trigger',(req, res) =>
{
    res.status(200).send('Congrats 🔥🔥')
});

app.post('/api/payment', (req,res) =>
{
    console.log('tis is body');
    console.log(req.body);
    
    const paymentId = req.body.payload.payment.entity.id; 
    //if a payment is aldready processed, to prevent duplicate transaction
    if(prevTrxId.includes(paymentId))
    {
        console.log('repeated request');
        res.sendStatus(200);
        return;
    }
    
    prevTrxId.push(paymentId);
    console.log(req.rawBody,typeof(req.rawBody));
    
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(req.rawBody);
    const digest = shasum.digest("hex");
  
    console.log(digest, req.headers["x-razorpay-signature"]);
  
    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit");
        console.log(JSON.stringify(req.body, null, 4));

        // prevTrxId.push(paymentId)
        const amount = req.body.payload.payment.entity.amount;
        const url = address + process.env.BLYNK_AUTH_TOKEN + '&' + pinId + '=' + amount;
        console.log('making request to :',url)

        let request = https.get(url, (res)=>{
            if (res.statusCode !==200){
                console.log('Something went wrong with request');
                console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                res.resume();
                return;
            }

            console.log('made request successfully ' + res.statusCode);
        });
        
        request.on('error', (err)=>{
            console.error(`Encountered an error trying to make a request: ${err.message}`);
        });
    } 
    else {
      // ignore it
        console.log('')
        console.log('invalid access !!!');
        console.log(digest);
        console.log(req.headers['x-razorpay-signature']);
       
    }
    res.sendStatus(200);
});

app.listen(port,() =>{
    console.log('Listening on port ' + port);
});