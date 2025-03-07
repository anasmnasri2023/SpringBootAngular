package com.example.springangular.web;

import com.example.springangular.entities.Payement;
import com.example.springangular.entities.PayementStatus;
import com.example.springangular.entities.PayementType;
import com.example.springangular.entities.Student;
import com.example.springangular.repository.PaymentRepository;
import com.example.springangular.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
}
