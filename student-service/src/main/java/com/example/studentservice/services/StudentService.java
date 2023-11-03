package com.example.studentservice.services;

import com.example.studentservice.entities.StudentEntity;
import com.example.studentservice.models.FeeModel;
import com.example.studentservice.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    RestTemplate restTemplate;

    public List<StudentEntity> getStudents(){
        return studentRepository.findAll();
    }

    public String getSchoolType(String rut){
        return studentRepository.findSchoolType(rut);
    }

    public Integer getSeniorYear(String rut){
        return studentRepository.findSeniorYear(rut);
    }

    public String getPaymentMethod(String rut){
        return studentRepository.findPaymentMethod(rut);
    }

    public StudentEntity findByRut(String rut){
        return studentRepository.findByRut(rut);
    }

    // 1.
    public void saveStudentFirstTime(StudentEntity student){
        if(student.getSchool_type().equals("Municipal")){
            student.setNumber_of_fees(10);
        }else if(student.getSchool_type().equals("Subvencionado")){
            student.setNumber_of_fees(7);
        }else{
            student.setNumber_of_fees(4);
        }
        student.setFinal_price(1500000.0);

        studentRepository.save(student);
    }

    public void saveStudent(StudentEntity student){
        studentRepository.save(student);
    }

    public void deleteStudents(){
        studentRepository.deleteAll();
    }

    public Double calculateDiscountBySeniorYear(String rut){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String senior_year = getSeniorYear(rut).toString();
        LocalDate dBefore = LocalDate.parse("31/12/" + senior_year, formatter);
        LocalDate dAfter = LocalDate.now();

        long diff = dBefore.until(dAfter, ChronoUnit.YEARS);
        double total_discount = 0.0;

        if(diff < 1){
            total_discount = 1500000 * 0.15;
        }else if(diff <= 2){
            total_discount = 1500000 * 0.08;
        }else if(diff <= 4){
            total_discount = 1500000 * 0.04;
        }

        return total_discount;
    }

    public Double calculateDiscountBySchoolType(String rut){
        double total_discount = 0.0;
        String school_type = getSchoolType(rut);

        if(school_type.equals("Municipal")){
            total_discount = 1500000 * 0.2;
        }else if(school_type.equals("Subvencionado")){
            total_discount = 1500000 * 0.1;
        }
        return total_discount;
    }

    public Double calculateFinalPriceByDiscounts(String rut){
        double total = 1500000.0;
        if(getPaymentMethod(rut).equals("Cuotas")){
            double discount_school_type = calculateDiscountBySchoolType(rut);
            double discount_senior_year = calculateDiscountBySeniorYear(rut);
            return total - discount_senior_year - discount_school_type;
        }else{
            return total;
        }
    }

    public List<FeeModel> getFees(String rut){
        return restTemplate.getForObject("http://fee-service/fees/by-student/"+rut, List.class);
    }

    public void setMaxNumberOfFees(String rut, Integer number_of_fees){
        StudentEntity student = findByRut(rut);
        String school_type = getSchoolType(rut);
        if(number_of_fees != 0){
            if(school_type.equals("Municipal")){
                student.setNumber_of_fees(Math.min(number_of_fees, 10));
            }else if(school_type.equals("Subvencionado")){
                student.setNumber_of_fees(Math.min(number_of_fees, 7));
            }else{
                student.setNumber_of_fees(Math.min(number_of_fees, 4));
            }
            System.out.println(student.getSchool_type() + " " + number_of_fees);
            student.setPayment_method("Cuotas");
        }

        saveStudent(student);

    }

    public void setFinalPriceByPaymentMethod(String rut){
        StudentEntity student = findByRut(rut);
        String payment_method = getPaymentMethod(rut);

        if(payment_method.equals("Contado")){
            student.setFinal_price(1500000*0.5);
        }
        saveStudent(student);
    }

    //2.
    public void setPaymentMethod(String rut, Integer number_of_fees){
        StudentEntity student = findByRut(rut);
        if(number_of_fees == 0){
            student.setNumber_of_fees(0);
            student.setPayment_method("Contado");
        }

        setFinalPriceByPaymentMethod(rut);
        setMaxNumberOfFees(rut, number_of_fees);
        Double final_price = calculateFinalPriceByDiscounts(rut);
        student.setFinal_price(final_price);
        saveStudent(student);
        restTemplate.postForObject("http://fee-service/fees/generate-fees/"+rut+"/"+student.getNumber_of_fees(), student, Boolean.class);
    }

    public void setFinalPriceByDiscounts(String rut, Double final_price){
        StudentEntity student = findByRut(rut);
        student.setFinal_price(final_price);
        saveStudent(student);
    }

}

