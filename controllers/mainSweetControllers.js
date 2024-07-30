const mongoose = require('mongoose'); // Import mongoose
const mainSweet = require('../models/mainSweet');

// Create a new Sweet
exports.post = async (req, res) => {
  try {
    const newSweet = new mainSweet(req.body);
    await newSweet.save();
    res.status(201).json(newSweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Sweets
exports.get = async (req, res) => {
  try {
    const allSweet = await mainSweet.find();
    res.status(200).json(allSweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Sweet by ID
exports.getSweetById = async (req, res) => {
  try {
    const id = req.params.id; // Assuming you're passing the ID in the URL

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Sweet ID' });
    }

    const oneSweet = await mainSweet.findById(id);
    if (!oneSweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.status(200).json(oneSweet);
  } catch (error) {
    console.error('Error fetching sweet by ID:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

// Update a Sweet by ID
exports.updateSweetById = async (req, res) => {
  try {
    const updatedSweet = await mainSweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.status(200).json(updatedSweet);
  } catch (error) {
    console.error('Error updating sweet:', error);
    res.status(500).json({
      message: 'Failed to update sweet',
      error: error.message
    });
  }
};

// Delete a Sweet by ID
exports.deleteSweetById = async (req, res) => {
  try {
    const deletedSweet = await mainSweet.findByIdAndDelete(req.params.id);
    if (!deletedSweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get counts of orders based on status
exports.getStatusCounts = async (req, res) => {
    try {
      const validStatuses = ['Pending', 'Completed', 'In Progress', 'Delivered'];
  
      const counts = await mainSweet.aggregate([
        // Filter out documents with null status and those not in the list of valid statuses
        { $match: { status: { $in: validStatuses, $ne: null } } },
  
        // Group by status and count orders
        { $group: { _id: "$status", count: { $sum: 1 } } },
  
        // Rename _id to status and format the output
        { $project: { status: "$_id", count: 1, _id: 0 } }
      ]);
  
      // Get the total order count
      const totalOrders = await mainSweet.countDocuments();
  
      // Handle the case where no orders exist
      const statusCounts = counts.reduce((acc, item) => {
        acc[item.status] = item.count;
        return acc;
      }, {
        'Pending': 0,
        'Completed': 0,
        'In Progress': 0,
        'Delivered': 0
      });
  
      res.status(200).json({
        totalOrders,
        statusCounts
      });
    } catch (error) {
      console.error("Error fetching status counts:", error); // Log the error
      res.status(500).json({ error: "Internal Server Error" });
    }
  };