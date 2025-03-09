package com.example.springangular.web;

import com.example.springangular.entities.Payement;
import com.example.springangular.entities.PayementStatus;
import com.example.springangular.entities.PayementType;
import com.example.springangular.entities.Student;
import com.example.springangular.repository.PaymentRepository;
import com.example.springangular.repository.StudentRepository;
import com.example.springangular.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/api") // Préfixe pour toutes les routes
public class PaymentRestController {

    private final StudentRepository studentRepository;
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentRestController(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }

    @GetMapping("/payments")
    public List<Payement> allPayements() {
        return paymentRepository.findAll();
    }

    @GetMapping("/students/{code}/payments")
    public List<Payement> paymentsByStudent(@PathVariable String code) {
        return paymentRepository.findByStudentCode(code);
    }

    @GetMapping("/payments/bystatus")
    public List<Payement> paymentsByStatus(@RequestParam PayementStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @GetMapping("/payments/bytype")
    public List<Payement> payementsByType(@RequestParam PayementType type) {
        return paymentRepository.findByType(type);
    }

    @GetMapping("/payments/{id}")
    public Payement getPaymentById(@PathVariable Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @GetMapping("/students")
    public List<Student> allStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code) {
        return studentRepository.findByCode(code);
    }

    @GetMapping("/students/byProgramId")
    public List<Student> getStudentByProgramId(@RequestParam(required = false) String programId) {
        return studentRepository.findByProgramId(programId);
    }
    @PutMapping("/payments/{id}")
    public Payement updatePaymentStatus(@RequestParam PayementStatus status,@PathVariable Long id){

        return  this.paymentService.updatePaymentStatus(status,id);
    }
    private PaymentService paymentService;
    @PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) /*ajout de données structurées*/
    public Payement savePayment(@RequestParam MultipartFile file,
                                @RequestParam LocalDate date,
                                @RequestParam double amount,
                                @RequestParam PayementType type,
                                @RequestParam String studentCode) throws IOException {

return this.paymentService.savePayment(file,date,amount,type,studentCode);

    }
    @GetMapping(path = "/paymentFile/{paymentId}", produces = MediaType.MULTIPART_FORM_DATA_VALUE)
    public byte[] getPayementFile(@PathVariable Long paymentId) throws IOException {
       return this.paymentService.getPayementFile(paymentId);
    }

}
