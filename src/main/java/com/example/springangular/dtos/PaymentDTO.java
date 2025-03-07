package com.example.springangular.dtos;

import com.example.springangular.entities.PayementStatus;
import com.example.springangular.entities.PayementType;
import com.example.springangular.entities.Student;
import jakarta.persistence.*;

import java.time.LocalDate;

public class PaymentDTO {
    /* Mapper : nous permet de tranferer un les données d'un objet vers un autre objet(student vers student.DTO ou payement vers payemenet.DTO)
    * RequestDTO:stocker les données de la requète
    * RespenseDTO:envoyer que les données de besoins */

    private Long id;
    private LocalDate date;
    private double amount;
    private PayementType type;
    private PayementStatus status;
    private String file;
    private Student student;

}
