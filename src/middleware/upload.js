
const multer = require('multer');

const upload = multer({
    limits: { fileSize: 2097152 },
    fileFilter(req, file, CB) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)/)) {
            return CB(new Error('please upload an image'))
        }
        CB(undefined, true);
    }
})

module.exports = upload