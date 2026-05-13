package com.example.demoddd.Infactructure.presetance;

import com.example.demoddd.Domain.Entities.SanPham;
import com.example.demoddd.Domain.Repository.SanPhamRepo;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class SanPhamJpaRepoIml implements SanPhamRepo {
    private final SanPhamJPARepo jpaRepo;
    public SanPhamJpaRepoIml(SanPhamJPARepo jpaRepo) {
        this.jpaRepo = jpaRepo;
    }
    @Override
    public List<SanPham> findAll() {
        return jpaRepo.findAll();
    }

    @Override
    public Optional<SanPham> findById(UUID id) {
        return jpaRepo.findById(id);
    }
    @Override
    public SanPham save(SanPham sanPham) {
        return jpaRepo.save(sanPham);
    }

    @Override
    public void delete(SanPham sanPham) {
        jpaRepo.delete(sanPham);
    }

}
