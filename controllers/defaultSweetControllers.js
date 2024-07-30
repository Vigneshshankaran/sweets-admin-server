const Box = require('../models/defaultSweet');


//------Post------//
exports.post = async(req,res) =>{
 try{
    const newSweet = new Box(req.body)
        await newSweet.save()
        res.status(201).json(newSweet)
 }catch(error){
    res.status(500).json({message: error.message})

 }
}

//------Get-----//

exports.get = async(req, res) =>{
    try{
        const allSweet = await  Box.find()
        res.status(200).json(allSweet)
        }catch(error){
            res.status(500).json({message: error.message})         
    }
}

//----get by id -----//

exports.getSweetById  = async(req,res) =>{
    try{
        const id= req.params.id
const oneSweet = await Box.findById(id)
if (!oneSweet) {
    return res.status(404).json({ message: 'Sweet not found' });
  }
res.status(200).json(oneSweet)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


//----Update by id -----//

exports.updateSweetById = async (req, res) => {

  
    try {
        const updatedSweet = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSweet) {
          return res.status(404).json({ message: 'Sweet not found' });
        }
        res.status(200).json(updatedSweet);
    } catch (error) {
      // Log the error for debugging
      console.error('Error updating sweet:', error);
  
      // Return an error response
      res.status(500).json({
        message: 'Failed to update sweet',
        error: error.message
      });
    }
  };

  //----Delete by id -----//

  
  exports.deleteSweetById = async (req, res) => {
    try {
        const deleteSweet = await Box.findByIdAndDelete(req.params.id);
        if (!deleteSweet) {
            return res.status(404).json({ message: 'Sweet not found' });
        }
        res.status(200).json({ message: 'Sweet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
