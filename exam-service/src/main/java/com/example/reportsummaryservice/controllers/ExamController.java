package com.example.reportsummaryservice.controllers;

import com.example.reportsummaryservice.entities.ExamEntity;
import com.example.reportsummaryservice.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/exams")
public class ExamController {
    @Autowired
    private ExamService examService;

    @GetMapping("/file-upload")
    public String main(){
        return "file-upload";
    }

    @PostMapping("/file-upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file){
        examService.save(file);

        examService.readCSV("students_exams.csv");
        return ResponseEntity.ok("Bien");
    }

    @GetMapping("/file-information")
    public ResponseEntity<List<ExamEntity>> getExamList(){
        List<ExamEntity> exams = examService.getExams();
        if(exams.isEmpty()){
            ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/report-summaries")
    public ResponseEntity<List<List<Object>>> getReportSummaries(){
        return ResponseEntity.ok(examService.getReportSummaries());
    }

    @GetMapping("/discounts")
    public ResponseEntity<List<List<Object>>> getDiscounts(){
        return ResponseEntity.ok(examService.getDiscounts());
    }

    @DeleteMapping("/delete-all")
    public void deleteExams(){
        examService.deleteAll();
    }

}
