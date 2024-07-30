const express = require('express');
const router = express.Router();
const  mainSweetControllers = require('../controllers/mainSweetControllers') 

router.post('/postmainsweet', mainSweetControllers.post);
router.get('/getmainsweet', mainSweetControllers.get);
router.get('/getStatusCounts', mainSweetControllers.getStatusCounts);

router.get('/:id', mainSweetControllers.getSweetById);
router.put('/:id', mainSweetControllers.updateSweetById);
router.delete('/:id', mainSweetControllers.deleteSweetById);




module.exports= router;

