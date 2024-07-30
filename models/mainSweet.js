const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    cname: { type: String, required: true },             // Customer Name (required)
    phone: { type: String, required: true },             // Phone Number (required)
    ddate: { type: String, required: true },             // Delivery Date (mm/dd/yyyy)
    dtime: { type: String, required: true },             // Delivery Time (e.g., '10:30 AM')
    odate: { type: String, required: true },             // Order Date (mm/dd/yyyy)
    dunit: { type: String, required: true },             // Delivery Unit (required)
    mplant: { type: String, required: true },            // Manufacturing Plant (required)
    boxtype: { type: String },                           // Box Type (optional)
    boxquantity: { type: Number, required: true },       // Total Box Quantity (required)
    sweetweight: { type: String },                       // Sweet Weight (optional)

    // Array of Sweets for the Main Menu
    sweet: [{ 
        sweetname: { type: String, required: true },     // Sweet Name (required)
        sweetgram: { type: Number, required: true },     // Sweet Grams (required)
        sweetquantity: { type: Number, required: true }  // Sweet Quantity (required)
    }],

    // Array for Sub-menus (optional)
    subForms: [{ 
        boxtype: { type: String },                       // Sub-menu Box Type
        boxquantity: { type: Number },                   // Sub-menu Box Quantity
        sweetweight: { type: String },                   // Sub-menu Sweet Weight
        sweet: [{ 
            sweetname: { type: String }, 
            sweetgram: { type: Number }, 
            sweetquantity: { type: Number } 
        }],                                              // Sweets in Sub-menu
        cuboxtype: { type: String },                     // Custom Box Type (if applicable)
        cusweetweight: { type: String }                  // Custom Sweet Weight (if applicable)
    }],

    // For "Custom Entry" Options (optional)
    cuboxtype: { type: String },                         // Custom Box Type (if applicable)
    cusweetweight: { type: String },                     // Custom Sweet Weight (if applicable)

    status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'In Progress', 'Delivered'],
        default: 'Pending'                               // Default status set to 'Pending'
    }
});

// Virtual property for the delivery date as a JavaScript Date object
sweetSchema.virtual('deliveryDateObj').get(function() {
    const [month, day, year] = this.ddate.split('/');

    return new Date(year, month - 1, day);
});

// Ensure virtual fields are serialized
sweetSchema.set('toJSON', { virtuals: true });
sweetSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Sweet', sweetSchema);
