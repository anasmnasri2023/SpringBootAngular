package com.example.springangular.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

public class Payement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private double amount;
    private PayementType type;
    @Enumerated(EnumType.STRING)
    private PayementStatus status;
    private String file;
    @ManyToOne
    private Student student;


}
