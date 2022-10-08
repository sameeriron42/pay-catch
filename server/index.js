const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto')

const app = express();
const port = 5000;

const secret = '$oyboi123';
const secret2 = 'wasd4321';
app.use(cors())
app.use(bodyParser.json())

app.get('/api/pay_trigger',(req, res) =>
{
    res.status(200).send('Congrats 🔥🔥')
});

app.post('/api/payment', (req,res) =>
{
    //console.log(req.body)
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');
    if(digest === req.headers['x-razorpay-signature'])
    {
        res.send('You are verified')
        const amount = req.body.payload.payment.entity.amount;
        console.log('received amound is '+ amount);
    }    

    else
    {
        console.log('invalid access !!!');
        console.log(digest);
        console.log(req.headers['x-razorpay-signature']);
    } 
    res.status(200);
});

app.listen(port,() =>{
    console.log('Listening on port ' + port);
});