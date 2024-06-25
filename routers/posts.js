const express = require("express");
const router = express.Router();

const multer = require('multer')
const uploader = multer({ dest: "public" });

const {
    store,
    index, show,
    update,
    destroy
} = require('../controllers/posts.js');

const validator = require('../middlewares/validator.js');
const { bodyData } = require('../validations/posts.js');
const authenticateWithToken = require('../middlewares/auth.js');

//Rotte Pubbliche

router.get('/', index);

router.get('/:slug', show);

//Rotte Private
router.use(authenticateWithToken);

router.post('/', uploader.single("image"), validator(bodyData), store);

router.put('/:slug', update);

router.delete('/:slug', destroy);

module.exports = router;