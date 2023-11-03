package com.example.reportsummaryservice.services;

import com.example.reportsummaryservice.entities.ExamEntity;
import com.example.reportsummaryservice.models.FeeModel;
import com.example.reportsummaryservice.models.StudentModel;
import com.example.reportsummaryservice.repositories.ExamRepository;
import lombok.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
public class ExamService {
    @Autowired
    ExamRepository examRepository;

    @Autowired
    RestTemplate restTemplate;

    private final Logger logg = LoggerFactory.getLogger(ExamService.class);

    public List<ExamEntity> getExams(){
        return examRepository.findAll();
    }

    @Generated
    public String save(MultipartFile file){
        String filename = file.getOriginalFilename();
        if(filename != null){
            if(!file.isEmpty()){
                try{
                    byte [] bytes = file.getBytes();
                    Path path = Paths.get(file.getOriginalFilename());
                    Files.write(path, bytes);
                    logg.info("File saved");
                }catch(IOException e){
                    logg.error("ERROR", e);
                }
            }
            return "File saved succesfully";
        }else{
            return "File not saved";
        }
    }

    @Generated
    public void readCSV(String address){
        String text = "";
        BufferedReader buffer = null;
        examRepository.deleteAll();
        try{
            buffer = new BufferedReader(new FileReader(address));
            String temp = "";
            String bufferRead;
            int count = 1;
            while((bufferRead = buffer.readLine()) != null){
                if(count == 1){
                    count = 0;
                }else{
                    saveDataDB(
                            bufferRead.split(";")[0],
                            bufferRead.split(";")[1],
                            bufferRead.split(";")[2]);
                    temp = temp + "\n" + bufferRead;
                }
            }
            text = temp;
            System.out.println("File read succesfully");
        }catch(Exception e){
            System.err.println("File not found");
        }finally{
            if(buffer != null){
                try{
                    buffer.close();
                }catch (IOException e){
                    logg.error("ERROR", e);
                }
            }
        }
    }

    public void saveData(ExamEntity exam){
        examRepository.save(exam);
    }

    public void saveDataDB(String rut, String exam_date, String score){
        ExamEntity exam = new ExamEntity();
        exam.setRut(rut);
        exam.setExam_date(exam_date);
        exam.setScore(score);
        saveData(exam);
    }

    public List<String> getRuts(){
        return examRepository.getRuts();
    }

    public Double getAverageScoreByRutAndMonth(String rut, String exam_date){
        return examRepository.getAverageScoreByRutAndMonth(rut, exam_date);
    }

    public Double getAverageScoreByRut(String rut){
        return examRepository.getAverageScoreByRut(rut);
    }

    public Integer getNumberOfExamsByRut(String rut){
        return examRepository.getNumberOfExamsByRut(rut);
    }

    public String getLastExamDate(String rut){
        return examRepository.findByExam_dateOrderByExam_dateDesc(rut);
    }

    public void deleteAll(){
        examRepository.deleteAll();
    }

    public List<List<Object>> getReportSummaries(){
        List<String> ruts = getRuts();
        List<List<Object>> reports = new ArrayList<>();

        for(String rut : ruts){
            reports.add(calculateReportSummary(rut));
        }

        return reports;
    }

    public List<Object> calculateReportSummary(String rut){
        StudentModel studentModel = restTemplate.getForObject("http://student-service/students/"+rut, StudentModel.class);
        Double final_price = restTemplate.getForObject("http://fee-service/fees/total-price-by-fees/"+rut, Double.class);
        Integer total_fees = restTemplate.getForObject("http://fee-service/fees/count-fees/"+rut, Integer.class);
        Integer paid_fees = restTemplate.getForObject("http://fee-service/fees/count-paid-fees/"+rut, Integer.class);
        Double total_paid = restTemplate.getForObject("http://fee-service/fees/total-paid/"+rut, Double.class);
        String last_payment = restTemplate.getForObject("http://fee-service/fees/last-payment/"+rut, String.class);
        Double total_debt = restTemplate.getForObject("http://fee-service/fees/total-debt/"+rut, Double.class);
        Integer late_fees = restTemplate.getForObject("http://fee-service/fees/count-late-fees/"+rut, Integer.class);

        ArrayList<Object> report = new ArrayList<>();
        report.add(rut);
        report.add(studentModel.getNames());
        report.add(studentModel.getSurnames());
        report.add(studentModel.getPayment_method());
        report.add(getNumberOfExamsByRut(rut));
        report.add(getAverageScoreByRut(rut));
        report.add(total_fees);
        report.add(paid_fees);
        report.add(late_fees);
        report.add(total_paid);
        report.add(total_debt);
        report.add(last_payment);
        report.add(final_price);


        return report;
    }

    public List<Object> calculateDiscount(String rut){
        Double discount_senior_year = restTemplate.getForObject("http://student-service/students/calculate-discount-senior-year/"+rut, Double.class);
        Double discount_school_type = restTemplate.getForObject("http://student-service/students/calculate-discount-school-type/"+rut, Double.class);
        String last_exam_date = getLastExamDate(rut);
        Double average_score = getAverageScoreByRutAndMonth(rut, last_exam_date);

        Double discount_average_score = restTemplate.getForObject("http://fee-service/fees/score-discount/"+rut+"/"+average_score, Double.class);
        restTemplate.put("http://fee-service/fees/score-discount/"+rut+"/"+average_score+"/put", Double.class);
        Double interest_months_late = restTemplate.getForObject("http://fee-service/fees/interest-months-late/"+rut, Double.class);
        restTemplate.put("http://fee-service/fees/interest-months-late/"+rut+"/put", Double.class);
        Double total_price_by_fees = restTemplate.getForObject("http://fee-service/fees/total-price-by-fees/"+rut, Double.class);
        restTemplate.put("http://student-service/students/set-final-price/"+rut+"/"+total_price_by_fees, Double.class);

        ArrayList<Object> discount = new ArrayList<>();

        discount.add(rut);
        discount.add(discount_school_type);
        discount.add(discount_senior_year);
        discount.add(discount_average_score);
        discount.add(interest_months_late);
        discount.add(total_price_by_fees);

        return discount;
    }

    public List<List<Object>> getDiscounts(){
        List<String> ruts = getRuts();
        List<List<Object>> discounts = new ArrayList<>();

        for(String rut : ruts){
            System.out.println(rut);
            discounts.add(calculateDiscount(rut));
        }

        return discounts;
    }

}
