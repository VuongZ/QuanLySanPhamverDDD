package com.example.demoddd.Presentation;

import com.example.demoddd.Domain.Entities.LoaiSanPham;
import com.example.demoddd.Domain.service.LoaiSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/loaisanpham")
@CrossOrigin(origins = "http://localhost:5173")
public class LoaiSanPhamController {
    @Autowired

    LoaiSanPhamService loaiSanPhamservice;
    @GetMapping
    public ResponseEntity<List<LoaiSanPham>> getALL(){
        return new ResponseEntity<>(loaiSanPhamservice.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<LoaiSanPham> Create(@RequestBody LoaiSanPham loaiSanPham){
        return new ResponseEntity<>(loaiSanPhamservice.create(loaiSanPham), HttpStatus.OK);

    }
    @GetMapping("/{id}")
    public ResponseEntity<LoaiSanPham> GetById(@PathVariable UUID id){
        return new ResponseEntity<>(loaiSanPhamservice.findById(id),HttpStatus.OK);
    }
    @DeleteMapping
    public ResponseEntity<Boolean> DeleteById(@PathVariable UUID id){
        if(loaiSanPhamservice.deleteById(id)){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.OK);
    }
}
