package com.example.reportsummaryservice.repositories;

import com.example.reportsummaryservice.entities.ExamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<ExamEntity, Integer> {
    @Query(value = "SELECT DISTINCT exams.rut FROM exams", nativeQuery = true)
    List<String> getRuts();

    @Query(value = "SELECT * FROM exams WHERE exams.rut = :rut", nativeQuery = true)
    List<ExamEntity> findByRut(@Param("rut") String rut);

    @Query(value = "SELECT COUNT(*) FROM exams WHERE exams.rut = :rut", nativeQuery = true)
    Integer getNumberOfExamsByRut(@Param("rut") String rut);

    @Query(value = "SELECT COUNT(*) as count_exams, YEAR(exam_date) AS year, MONTH(exam_date) AS month FROM exams WHERE exams.rut = :rut AND exams.exam_date = :exam_date GROUP BY YEAR(exam_date), MONTH(exam_date)", nativeQuery = true)
    Integer getNumberOfExamsByRutByMonth(@Param("rut") String rut, @Param("exam_date") String exam_date);

    @Query(value = "SELECT AVG(exams.score) AS average_score FROM exams WHERE exams.rut =:rut GROUP BY rut", nativeQuery = true)
    Double getAverageScoreByRut(@Param("rut") String rut);

    @Query(value = "SELECT AVG(exams.score) AS average_score FROM exams WHERE exams.rut = :rut AND exams.exam_date = :exam_date GROUP BY exams.rut, YEAR(exam_date), MONTH(exam_date)", nativeQuery = true)
    Double getAverageScoreByRutAndMonth(@Param("rut") String rut, @Param("exam_date") String exam_date);

    @Query(value = "SELECT exams.exam_date FROM exams WHERE exams.rut = :rut ORDER BY exams.exam_date DESC LIMIT 1", nativeQuery = true)
    String findByExam_dateOrderByExam_dateDesc(@Param("rut") String rut);
}
