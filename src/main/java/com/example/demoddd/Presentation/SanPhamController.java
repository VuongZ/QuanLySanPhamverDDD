package com.example.demoddd.Presentation;

import com.example.demoddd.Domain.Entities.SanPham;
import com.example.demoddd.Domain.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/sanpham")
@CrossOrigin(origins = "http://localhost:5173")
public class SanPhamController  {
    @Autowired
    SanPhamService sanPhamService;
    @GetMapping()
    public ResponseEntity<List<SanPham>> GetAll() {
            return new ResponseEntity<>(sanPhamService.GetAll(), HttpStatus.OK);

    }
    @PostMapping()
    public ResponseEntity<SanPham> Create(@RequestBody SanPham sanPham) {
        return new ResponseEntity<SanPham>(sanPhamService.Create(sanPham), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<SanPham> GetById(@PathVariable UUID id) {
        return new ResponseEntity<SanPham>(sanPhamService.GetById(id), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> Delete(@PathVariable UUID id) {
        if (sanPhamService.deletebyid(id)){
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }
        return new ResponseEntity<Boolean>(false, HttpStatus.OK);

    }
}
