const express = require('express');
const router = express.Router();
const  defaultSweetControllers = require('../controllers/defaultSweetControllers') 

router.post('/postdefaultsweet', defaultSweetControllers.post);
router.get('/getdefaultsweet', defaultSweetControllers.get);
router.get('/:id', defaultSweetControllers.getSweetById );
router.put('/:id', defaultSweetControllers.updateSweetById);
router.delete('/:id', defaultSweetControllers.deleteSweetById);



module.exports= router;


