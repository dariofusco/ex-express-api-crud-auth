const express = require("express");
const router = express.Router();

const {
    store,
    index, show,
    update,
    destroy
} = require('../controllers/posts.js');

const validator = require('../middlewares/validator.js');
const { bodyData } = require('../validations/posts.js');

router.post('/', validator(bodyData), store);

router.get('/', index);

router.get('/:slug', show);

router.put('/:slug', validator(bodyData), update);

router.delete('/:slug', destroy);

module.exports = router;