const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 
const { Console } = require('console');

const port = process.env.PORT || 4100;


mongoose.connect('mongodb+srv://arstest:8P36mCtNCXY8To00@arscluster.vb80kfu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String, 
  message: String,
  subject:String
  
});

const FormData = mongoose.model('FormData', formDataSchema);


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '/')));

app.post('/', function (req, res) {

  let formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    message: req.body.message,
	subject:req.body.subject
    
  });

  formData.save()
    .then(() => {
        res.render('successPage', { message: "Thank you for contacting us. We will be in touch shortly." });
    })
    .catch((error) => {
		
        res.redirect('/contact.html');
		
    });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
