import axios from "axios";

class StudentService{
    getStudents(){
        return axios.get(`http://localhost:8080/students`);
    }

    saveStudent(student){
        return axios.post(`http://localhost:8080/students/new-student`, student);
    }

    deleteStudents(){
        return axios.delete(`http://localhost:8080/students/delete-all`);
    }

    getStudentByRut(rut){
        return axios.get(`http://localhost:8080/students/${rut}`);
    }

    generateFees(rut, number_of_fees){
        return axios.post(`http://localhost:8080/students/set-max-number-of-fees/${rut}/${number_of_fees}`);
    }
}

export default new StudentService();