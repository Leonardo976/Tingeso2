package com.example.studentservice.controllers;

import com.example.studentservice.entities.StudentEntity;
import com.example.studentservice.models.FeeModel;
import com.example.studentservice.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/students")
public class StudentController {
    @Autowired
    StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentEntity>> getStudents(){
        List<StudentEntity> students = studentService.getStudents();
        if(students.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{rut}")
    public ResponseEntity<StudentEntity> findByRut(@PathVariable("rut") String rut){
        StudentEntity student = studentService.findByRut(rut);
        if(student == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    @PostMapping("/new-student")
    public void saveStudent(@RequestBody StudentEntity student){
        studentService.saveStudentFirstTime(student);
    }

    @DeleteMapping("/delete-all")
    public void deleteStudents(){
        studentService.deleteStudents();
    }

    @GetMapping("/fees/{rut}")
    public ResponseEntity<List<FeeModel>> getFees(@PathVariable("rut") String rut){
        StudentEntity student = studentService.findByRut(rut);
        if(student == null){
            return ResponseEntity.notFound().build();
        }
        List<FeeModel> fees = studentService.getFees(rut);
        if(fees.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(fees);
    }

    @PostMapping("/set-max-number-of-fees/{rut}/{number_of_fees}")
    public ResponseEntity<Boolean> setMaxNumberOfFees(@PathVariable("rut") String rut, @PathVariable("number_of_fees") String number_of_fees){
        Integer number_fees = Integer.parseInt(number_of_fees);
        studentService.setPaymentMethod(rut, number_fees);

        if(studentService.getStudents().isEmpty()){
            return ResponseEntity.ok(false);
        }

        return ResponseEntity.ok(true);
    }

    @GetMapping("/calculate-discount-senior-year/{rut}")
    public ResponseEntity<Double> calculateDiscountBySeniorYear(@PathVariable("rut") String rut){
        StudentEntity student = studentService.findByRut(rut);
        if(student == null){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(studentService.calculateDiscountBySeniorYear(rut));
    }

    @GetMapping("/calculate-discount-school-type/{rut}")
    public ResponseEntity<Double> calculateDiscountBySchoolType(@PathVariable("rut") String rut){
        StudentEntity student = studentService.findByRut(rut);
        if(student == null){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(studentService.calculateDiscountBySchoolType(rut));
    }

    @PutMapping("/set-final-price/{rut}/{final_price}")
    public void setFinalPriceByAverage_InterestDiscount(@PathVariable("rut") String rut,
                                                        @PathVariable("final_price") Double final_price){
        studentService.setFinalPriceByDiscounts(rut, final_price);
    }

}
