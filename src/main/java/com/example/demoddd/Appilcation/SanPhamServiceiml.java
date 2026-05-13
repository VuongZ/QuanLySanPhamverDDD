package com.example.demoddd.Appilcation;

import com.example.demoddd.Domain.Entities.SanPham;
import com.example.demoddd.Domain.Repository.SanPhamRepo;
import com.example.demoddd.Domain.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SanPhamServiceiml implements SanPhamService {
    @Autowired
    private SanPhamRepo sanPhamrepo;
    public List<SanPham> GetAll() {
        return sanPhamrepo.findAll();
    }
    public SanPham GetById(UUID id) {
        return sanPhamrepo.findById(id).orElseThrow(()->(new RuntimeException("Khong tim thay san pham")));

    }
    public SanPham Create(SanPham sanPham) {
        return sanPhamrepo.save(sanPham);
    }
    public boolean  deletebyid(UUID id) {
        SanPham sanPham = sanPhamrepo.findById(id).orElseThrow(()->(new RuntimeException("Khong tim thay san pham")));
            sanPhamrepo.delete(sanPham);
        return true;
    }
}
