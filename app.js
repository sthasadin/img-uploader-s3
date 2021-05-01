const express = require('express');
const multer = require('multer');
const Cors = require('cors');
const path = require('path');
const{uploadFile} = require('./s3');

const app = express();

app.options('*', Cors());
app.use(Cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
    return cb(null, true);
  }
  return cb(
    new Error(`The image with extension ${ext} is not permitted.`),
    false
  );
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/api/imageupload', upload.single('image'), async function (req, res) {
  //console.log(file)
  const result = await uploadFile(req.file)
  console.log(result)
  res.json({local:req.file,amazon:result});
});
// app.get('/api/imageupload', function (req, res) {
//   res.json('Its working');
// });

app.use(express.static(__dirname+'/client/build'));

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT=process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
