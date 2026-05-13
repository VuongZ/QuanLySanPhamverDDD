package com.example.demoddd.Domain.Entities;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "bh_loaisanpham")
public class LoaiSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    @Column(name = "ten_loai")
    private String tenLoai;
    @Column(name = "mo_ta")
    private String moTa;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTenLoai() {
        return tenLoai;
    }

    public void setTenLoai(String tenLoai) {
        this.tenLoai = tenLoai;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }
}
