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

    createStudent = async (bodyStudent) => {

        try {
           //TODO revisando si el studiante ya fue creado anteriomente
            const studentDetail = await studentModel.findOne({
                dni: bodyStudent.dni,
            })
            if (studentDetail && Object.keys(studentDetail).lenght !== 0){
                return null;
            }
            
            const newStudent = await studentModel.create(bodyStudent);

            return newStudent;

        } catch (error) {
            console.log("🚀 ~ file: student.manager.js:42 ~ StudentManager ~ createStudent= ~ error:",
            error)
            
        }




    }


}

module.exports = StudentManager