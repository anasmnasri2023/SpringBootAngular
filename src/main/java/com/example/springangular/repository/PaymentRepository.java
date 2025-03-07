package com.example.springangular.repository;

import com.example.springangular.entities.Payement;
import com.example.springangular.entities.PayementStatus;
import com.example.springangular.entities.PayementType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payement,Long> {
    List<Payement> findByStudentCode(String code);
    List<Payement> findByType(PayementType type);

    List<Payement> findByStatus(PayementStatus status);
}
