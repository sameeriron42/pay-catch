
# PAY💵 CATCH🪝

Trigger your micro-controllers or smart-devices whenever a payment is made to you. 
It aims to automate payment sector in a typical byer-seller scenario, so no 
manual labour is required to verify payments. This can be used in scenarios like:
-	Vending machines
-	ATM’s
-	Automated transport ticketing
-	Pay and use charging sockets
-	Billing systems for commercial spaces
-	Any kind of automated system requiring payments to avail service

## Payment through QR code💸

#### Making payment through any merchant app of your choice.
![](https://github.com/sameeriron42/pay-catch/blob/main/demo1.png)
#### Payment reflected in Node-MCU.
![](https://github.com/sameeriron42/pay-catch/blob/main/demo2.png)

## Behind the scenes⚙️
![](https://github.com/sameeriron42/pay-catch/blob/main/system-architechture.gif)
## Run Locally👩🏻‍💻

Clone the project

```bash
  git clone https://github.com/sameeriron42/pay-catch
```

Go to the project directory

```bash
  cd pay-catch/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Open up new terminal in the same directory and start your ngrok tunnel
```bash
  ngrok http 5000
```
- Use the forwarding link by ngrok to post webhooks from razorpay. 
- Setup a webhook scenario for any predefined event in [razorpay dashboard](https://dashboard.razorpay.com/app/webhooks).
- Change webhook secret as required in [index.js](https://github.com/sameeriron42/pay-catch/blob/main/server/index.js) file
- Setup a new device in [Blynk Cloud](https://blynk.cloud/dashboard/) and copy the auth token.
- Paste the auth token in DOT env file and call it in [index.js](https://github.com/sameeriron42/pay-catch/blob/main/server/index.js).
```
BLYNK_AUTH_TOKEN = "xxxxxxxxxxx"
```
**index.js**
```
const url = address + process.env.BLYNK_AUTH_TOKEN + '&' + pinId + '=' + amount;
```
- Create a virtual pin V3 in Datastreams section of Blynk Dashboard with float datatype(default value 0).
- Make sure `nodeMCU.ino` code uses the V3 pin to display amount.
- Configure your auth token, template ID, device name and wifi credentials(ssid and pass) at the top of `nodeMCU.ino` file.
- Compile and upload the `nodeMCU.ino` code to your MCU using Arduino IDE
## API Reference🎯
NodeJS server to handle webhooks and make **GET** request to Blynk Cloud.
#### Request: Get  to check server status

```https
  GET /api/pay_trigger
```
#### Response: 
| Text | Code     |
| :-------- | :------- | 
| `Congrats 🔥🔥`      | `200` |

#### Post payment details

```https
  POST /api/payment
```
JSON payload must include
 |Parameter | Type     | Description                       |
 |:-----------| :------- | :-------------------------------- |
 | X-Razorpay-Signature| `HEADER` | Signature to verify payload source. | 
 |entity|`string`| Indicates the type of the entity.|
 |id| `string` | A unique identifier of the entity.|
 |amount | `integer` | Transaction Amount received in paise.|


## Docs & Acknowledgements😇
- [Awesome use-case by gvcsystems ](https://youtu.be/yKL0EdrIp24)

- [Razorpay Webhook API]( https://razorpay.com/docs/api/partners/webhooks)
-	NodeJS server to Handle razorpay webhooks tutorial

[![]( http://img.youtube.com/vi/QtsvGEB7n0s/0.jpg)](https://www.youtube.com/watch?v=QtsvGEB7n0s)

-	[Blynk Rest API](https://docs.blynk.io/en/blynk.cloud/https-api-overview)

-	[Blynk Rest API usage tutorial]( https://www.youtube.com/watch?v=BtndiAyGSzk)

-	Getting started with Blynk for NodeMCU tutorial

[![](http://img.youtube.com/vi/AvSCAxbqvvE/0.jpg)](https://www.youtube.com/watch?v=AvSCAxbqvvE)


## Tech Stack

Razor Pay, Blynk Cloud, Arduino IDE

**Server:** Node, Express

### Usecase?
How about triggering your home appliance only after payment of couple of bucks.
I'm not responsible if you become homeless😉.
