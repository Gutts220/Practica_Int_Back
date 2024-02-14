const mongoose = require('mongoose');

const collectionName = 'Students'

const studentScheme = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    dni:{
        type: Number,
        required: true,
        unique: true,
    },
    course:{
        type: String,
        required: true,
    },
    grade:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum: ["F","M"]    
    }



})

const studentModel = mongoose.model(collectionName, studentScheme)

module.exports= studentModel