const {Router} = require("express")
const studentsData = require("../data/studentsData")
const studentModel = require("../model/studentsModel")
const StudentManager = require("../managers/studentsManager")

class StudentsRoute{

    path = '/students';
    router = Router();
    studentManager = new StudentManager();


    constructor(){

        this.initStudentsRoutes()
    }

    initStudentsRoutes() {

      
      this.router.get(`${this.path}/insertion `, async (req, res) => {
        try{
            const students = await studentModel.insetMany(studentsData)
            //TODO: agregar validaciones
            
            return res.json({
                message: "students insert successfully",
                studentsInserted: students,
            });


        }catch(err){

            console.log(
                "~ file: students.routes.js:25 ~  StudentsRoutes ~ this.router.get ~ error: ",
                err
            );

        }
      });
      
      //RETORNAR TODOS LOS ESTUDIANTES
      this.router.get(`${this.path}`, async (req, res) => {
        try {
            const students = await this.studentManager.getAllStudent()

            return res
                .status(200)
                .json({ok: true, message: 'getAllStudents', students})
        } catch (error) {
            console.log("~ file: studentRoutes.js:49 ~ StudentRoutes ~ this.router.get:", error)
        }
        
        });
        
      //RETORNAR UN ESTUDIANTE POR ID
        this.router.get(`${this.path}/:sid`, async (req, res) => {
            try {
                const studentId = req.params.sid
                const student = await this.studentManager.getStudentById(studentId)
                
                if(!student){
                    return res.status(404).json({
                        ok: true,
                        message: `the student dosen't exist`
                    })
                }

                return res
                    .status(200)
                    .json({ok: true, message: 'getStudentById', student})

            } catch (error) {
                console.log("~ file: studentRoutes.js:49 ~ StudentRoutes ~ this.router.get:", error)

                return res.status(500).json({
                    ok: false,
                    message:`something went WRONG!!!`,
                    error: error.message,
                })
            }
      });

      this.router.post (`${this.path}`, async (req, res) => {
        try {
            //TODO hacer validaciones del body
            const studentBody = req.body;

            //TODO revisando si el estudiante ya fue creado anteriormente
            const newStudent = await this.studentManager.createStudent(studentBody);
            if (!newStudent){
                return res.json({
                    message: `the student with dni ${studentBody.dni} is alredy register`,
                });
            }

            return res.json({
                message: `student created successfully`,
                student: newStudent,
            });

        } catch (error) {

            console.log("🚀 ~ file: students.routes.js:79 ~ StudentsRoutes ~ this.router.post ~ error:",
            error);
            return res.status(500).json({ ok: false, message: error.message });
        }
      })

      
    }
}

module.exports = StudentsRoute;