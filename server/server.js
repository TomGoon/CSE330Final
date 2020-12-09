let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./db');
let multer = require('multer');
let methodOverride = require('method-override');
let path = require('path');
let stripe = require('stripe')('sk_test_ruvH7g7ipmIZfQQ3aqrQdo9g00fg0A8LRK');


// PORT
const port = 3456;

// Database connection
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database sucessfully connected!')
},
    error => {
    console.log('Could not connect to database : ' + error)
    }
)

// MIDDLEWARE
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.static('.'));

// Create router and use for Users
const users = require("./routes/users");
const { resolve } = require('path');
app.use("/users",users);

// // Create router and use for soundbytes
const soundbytes = require("./routes/soundbytes");
app.use("/soundbytes",soundbytes);

// Stripe integration adapted from https://stripe.com/docs/checkout/integration-builder
const YOUR_DOMAIN = 'http://ec2-3-17-165-170.us-east-2.compute.amazonaws.com:3000/dashboard';

app.post('/create-session', async (req, res) => {
	console.log(req.body);
	const session = await stripe.checkout.sessions.create({
	payment_method_types: ['card'],
	line_items: [
		{
		price_data: {
			currency: 'usd',
			product_data: {
			name: req.body.name,
			images: ['http://ec2-3-17-165-170.us-east-2.compute.amazonaws.com/creativeproject-464904-465923/client/src/components/assets/soundbyte_logo.png'],
			},
			unit_amount: req.body.price,
		},
		quantity: 1,
		},
	],
	mode: 'payment',
	success_url: `http://ec2-3-17-165-170.us-east-2.compute.amazonaws.com:3000/checkout?success=true&filename=${req.body.filename}&listingname=${req.body.name}`,
	cancel_url: 'http://ec2-3-17-165-170.us-east-2.compute.amazonaws.com:3000/dashboard'
	});
	res.json({ id: session.id });
});

// Done with guidance from https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
// As suggested by TA Jason Ren to us to use
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../../soundbyte_uploads')
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
})

var upload = multer({storage: storage}).single('file');

app.post('/upload', function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file)    
  })
}); 

// Establish server connection
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})




  