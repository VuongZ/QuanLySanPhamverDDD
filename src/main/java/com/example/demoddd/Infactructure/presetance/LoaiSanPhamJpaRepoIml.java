package com.example.demoddd.Infactructure.presetance;

import ch.qos.logback.core.model.INamedModel;
import com.example.demoddd.Domain.Entities.LoaiSanPham;
import com.example.demoddd.Domain.Entities.SanPham;
import com.example.demoddd.Domain.Repository.LoaiSanPhamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public class LoaiSanPhamJpaRepoIml implements LoaiSanPhamRepo {
    private LoaiSanPhamJPArepo jparepo;
    public  LoaiSanPhamJpaRepoIml(LoaiSanPhamJPArepo jparepo){
        this.jparepo=jparepo;
    }
    @Override
    public List<LoaiSanPham>  findAll() {
        return jparepo.findAll();
    }
    @Override
    public Optional<LoaiSanPham> findById(UUID id)
    {
        return jparepo.findById(id);
    }
    @Override
    public LoaiSanPham save(LoaiSanPham lsp)
    {
        return jparepo.save(lsp);
    }
    @Override
    public void Delete(LoaiSanPham lsp) {
        jparepo.delete(lsp);
    }

}
