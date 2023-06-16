const multer = require('multer');
const path  = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(__dirname, '../public/images'))
    },

    filename: function(req, file, callback){
        const imageName = Date.now()+ '_' + Math.round(Math.random() * 100000) +'_image'+ path.extname(file.originalname);
        callback( null,  imageName  )
    }
})





function fileFilter(req, file, callback){
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        callback(null, true)
    }else{
        callback(null, false)
    }
}

const upload = multer({storage, fileFilter});

module.exports = {upload};