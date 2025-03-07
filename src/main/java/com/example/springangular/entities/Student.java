package com.example.springangular.entities;
import lombok.Builder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastname;
    @Column(unique = true)
    private String code;
    private String programId;
    private String photo;


}
