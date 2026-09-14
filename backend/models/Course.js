const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: false 
    },
    modules: [{
        title: { type: String, required: true },
        items: [{
            title: { type: String, required: true },
            itemType: { type: String, enum: ['pdf', 'video', 'link'], required: true },
            url: { type: String, required: true }
        }]
    }],
    instructor: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);