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
    schedule: {
        startDate: { type: Date },
        weeklySlots: [{
            day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
            startTime: { type: String },
            endTime: { type: String }
        }]
    },
    weeks: [{
        title: { type: String, required: true },
        announcement: { type: String },
        classLinks: [{
            title: { type: String },
            url: { type: String },
            date: { type: Date }
        }],
        resources: [{
            title: { type: String },
            resourceType: { type: String },
            url: { type: String }
        }]
    }],
    quizzes: [{
        title: { type: String, required: true },
        questions: [{
            question: { type: String, required: true },
            options: [{ type: String }],
            correctAnswer: { type: Number, required: true }
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