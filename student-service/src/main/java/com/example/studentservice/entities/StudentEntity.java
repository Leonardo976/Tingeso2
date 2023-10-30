package com.example.studentservice.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentEntity {
    @Id
    @Column(nullable = false)
    private String rut;
    private String names;
    private String surnames;
    private String birthday;
    private String school_type;
    private String school_name;
    private Integer senior_year;
    private String payment_method;
    private Integer number_of_fees;
    private Double final_price;
}
