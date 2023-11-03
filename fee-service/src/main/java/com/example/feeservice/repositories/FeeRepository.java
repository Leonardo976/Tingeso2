package com.example.feeservice.repositories;

import com.example.feeservice.entity.FeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<FeeEntity, String> {
    FeeEntity findById(@Param("id") Integer id);

    @Query(value = "SELECT * FROM fees WHERE fees.rut =:rut", nativeQuery = true)
    List<FeeEntity> getFeesByRut(@Param("rut") String rut);

    @Query(value = "SELECT COUNT(*) FROM fees WHERE fees.rut = :rut AND fees.state = 'PAID'", nativeQuery = true)
    Integer countPaidFeesByRut(@Param("rut") String rut);

    @Query(value = "SELECT * FROM fees WHERE fees.rut = :rut AND fees.state = 'PAID'", nativeQuery = true)
    List<FeeEntity> getPaidFeesByRut(String rut);

    @Query(value = "SELECT * FROM fees WHERE fees.rut = :rut AND fees.state = 'PAID' ORDER BY fees.payment_date DESC LIMIT 1", nativeQuery = true)
    FeeEntity getFeeByRutOrderByPaymentDateDesc(String rut);

    @Query(value = "SELECT * FROM fees WHERE fees.rut = :rut AND fees.number_of_fee = :number_of_fee", nativeQuery = true)
    FeeEntity getByRutAndNumber_of_fee(@Param("rut") String rut, @Param("number_of_fee") Integer number_of_fee);
}
