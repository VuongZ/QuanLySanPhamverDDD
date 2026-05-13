package com.example.demoddd.Domain.Repository;

import com.example.demoddd.Domain.Entities.LoaiSanPham;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LoaiSanPhamRepo {
    List<LoaiSanPham> findAll();
    Optional<LoaiSanPham> findById(UUID id);
    LoaiSanPham save(LoaiSanPham sanPham);
    void Delete(LoaiSanPham sanPham);
}
