const studentModel = require("../model/studentsModel")


class StudentManager{
    
    getAllStudent = async() =>{
        try {
            const students = await studentModel.find({})
            return students;
        } catch (error) {
            console.log("~ file: students.manager.js:9 ~ StudentManager:", error)
        }
    }

    getStudentById = async (id) =>{
        try {
            const student = await studentModel.find({_id:id})

            return student
        } catch (error) {
            console.log("~ file: students.manager.js:18 ~ StudentManager ~ getStudentById:", error)
        }
    }
}

module.exports = StudentManager