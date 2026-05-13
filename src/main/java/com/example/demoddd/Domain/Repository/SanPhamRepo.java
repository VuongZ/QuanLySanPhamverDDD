package com.example.demoddd.Domain.Repository;

import com.example.demoddd.Domain.Entities.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SanPhamRepo {
    List<SanPham> findAll();
    Optional<SanPham> findById(UUID id);
    SanPham save(SanPham sanPham);
    void delete(SanPham sanPham);
}
