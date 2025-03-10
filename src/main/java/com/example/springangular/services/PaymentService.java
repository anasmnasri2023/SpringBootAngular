package com.example.springangular.services;

import com.example.springangular.dtos.NewPaymentDTO;
import com.example.springangular.entities.Payement;
import com.example.springangular.entities.PayementStatus;
import com.example.springangular.entities.PayementType;
import com.example.springangular.entities.Student;
import com.example.springangular.repository.PaymentRepository;
import com.example.springangular.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private StudentRepository studentRepository;

    public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }

    private PaymentRepository paymentRepository;
    public Payement savePayment(MultipartFile file,
                                NewPaymentDTO newPaymentDTO) throws IOException {

        Path folderPath = Paths.get(System.getProperty("user.home"), "spring-angular", "payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        String fileName = UUID.randomUUID().toString() + ".pdf";
        Path filePath = Paths.get(System.getProperty("user.home"), "spring-angular", "payments", fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Student student = studentRepository.findByCode(newPaymentDTO.getStudentCode());


        Payement payement = Payement.builder()
                .date(newPaymentDTO.getDate())
                .type(newPaymentDTO.getType())
                .student(student)
                .amount(newPaymentDTO.getAmount())
                .file(filePath.toUri().toString())
                .status(PayementStatus.CREATED)
                .build();

        return paymentRepository.save(payement);
    }

    public Payement updatePaymentStatus( PayementStatus status, Long id){

        Payement payement = paymentRepository.findById(id).get();
        payement.setStatus(status);
        return paymentRepository.save(payement);
    }
    public byte[] getPayementFile( Long paymentId) throws IOException {
        Payement payement = paymentRepository.findById(paymentId).orElseThrow(() -> new RuntimeException("Payment not found"));
        return Files.readAllBytes(Path.of(payement.getFile()));
    }

}
