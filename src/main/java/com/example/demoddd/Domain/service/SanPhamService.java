package com.example.demoddd.Domain.service;

import com.example.demoddd.Domain.Entities.SanPham;

import java.util.List;
import java.util.UUID;

public interface SanPhamService {
        public List<SanPham> GetAll();
        public SanPham GetById(UUID id);
        public SanPham Create(SanPham sanPham);
        public  boolean  deletebyid(UUID id);
}
