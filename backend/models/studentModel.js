const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({

    ID: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true,
    },

    studentClass: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Student", studentSchema);