package com.example.studentservice.repositories;

import com.example.studentservice.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, String> {
    @Query(value = "SELECT * FROM students WHERE students.rut = :rut", nativeQuery = true)
    StudentEntity findByRut(@Param("rut") String rut);

    @Query(value = "SELECT students.school_type WHERE students.rut = :rut", nativeQuery = true)
    String findSchoolType(@Param("rut") String rut);

    @Query(value = "SELECT student.senior_year WHERE students.rut = :rut", nativeQuery = true)
    Integer findSeniorYear(@Param("rut") String rut);

    @Query(value = "SELECT students.payment_method WHERE students.rut = :rut", nativeQuery = true)
    String findPaymentMethod(@Param("rut") String rut);
}
