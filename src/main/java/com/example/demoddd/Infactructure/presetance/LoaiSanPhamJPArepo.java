package com.example.demoddd.Infactructure.presetance;

import com.example.demoddd.Domain.Entities.LoaiSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LoaiSanPhamJPArepo extends JpaRepository<LoaiSanPham, UUID> {
}
