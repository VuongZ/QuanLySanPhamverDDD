package com.example.demoddd.Appilcation;

import com.example.demoddd.Domain.Entities.LoaiSanPham;
import com.example.demoddd.Domain.Repository.LoaiSanPhamRepo;
import com.example.demoddd.Domain.service.LoaiSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class LoaiSanPhamServiceiml implements LoaiSanPhamService {
    @Autowired
    private LoaiSanPhamRepo repository;
    public List<LoaiSanPham> findAll() {
        return repository.findAll();
    }
    public LoaiSanPham findById(UUID id) {
        return repository.findById(id).orElse(null);
    }
    public LoaiSanPham create(LoaiSanPham loaiSanPham) {
        return repository.save(loaiSanPham);
    }
    public boolean deleteById(UUID id) {
        LoaiSanPham loaiSanPham = repository.findById(id).orElse(null);
        repository.Delete(loaiSanPham);
        return true;
    }
}
