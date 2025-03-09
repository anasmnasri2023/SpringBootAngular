package com.example.springangular;

import com.example.springangular.entities.Payement;
import com.example.springangular.entities.PayementStatus;
import com.example.springangular.entities.PayementType;
import com.example.springangular.entities.Student;
import com.example.springangular.repository.PaymentRepository;
import com.example.springangular.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class SpringAngularApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringAngularApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository,
                                        PaymentRepository paymentRepository){
        return args -> {
            if (studentRepository.count() == 0) {  // Vérifie si des étudiants existent déjà
                studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                        .firstName("Anas").lastname("mnasri").code("111111").programId("SDIA")
                        .build());
                studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                        .firstName("Messi").lastname("lionel").code("22222").programId("SDIA")
                        .build());
                studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                        .firstName("Lionel").lastname("yamine Lamal").code("33333").programId("GLSID")
                        .build());
                studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                        .firstName("Mamadou").lastname("Boubwena").code("44444").programId("BDCC")
                        .build());
            }

            PayementType[] payementTypes = PayementType.values();
            PayementStatus[] payementStatuses = PayementStatus.values();
            Random random = new Random();

            studentRepository.findAll().forEach(st -> {
                for (int i = 0; i < 10; i++) {
                    int typeIndex = random.nextInt(payementTypes.length);
                    int statusIndex = random.nextInt(payementStatuses.length);

                    Payement payement = Payement.builder()
                            .amount(1000 + (int)(Math.random()*20000)) // Correction ici
                            .type(payementTypes[typeIndex])
                            .status(payementStatuses[statusIndex]) // Ajout de statuts variés
                            .date(LocalDate.now())
                            .student(st)
                            .build();
                    paymentRepository.save(payement);
                }
            });
        };
    }

}
