package com.example.demoddd.Infactructure.presetance;

import com.example.demoddd.Domain.Entities.SanPham;
import com.example.demoddd.Domain.Repository.SanPhamRepo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SanPhamJPARepo extends JpaRepository<SanPham, UUID> {
}
