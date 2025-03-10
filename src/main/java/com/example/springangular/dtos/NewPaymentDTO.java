package com.example.springangular.dtos;

import com.example.springangular.entities.PayementType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class NewPaymentDTO {
    private double amount;
   private String studentCode;
   private  LocalDate date;
    private PayementType type;
}
