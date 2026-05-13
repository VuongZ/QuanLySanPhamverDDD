package com.example.demoddd.Domain.service;

import com.example.demoddd.Domain.Entities.LoaiSanPham;
import com.example.demoddd.Domain.Entities.SanPham;

import java.util.List;
import java.util.UUID;

public interface LoaiSanPhamService {
    public List<LoaiSanPham> findAll();
    public LoaiSanPham findById(UUID id);
    public LoaiSanPham create(LoaiSanPham loaiSanPham);
    public boolean deleteById(UUID id);
}
