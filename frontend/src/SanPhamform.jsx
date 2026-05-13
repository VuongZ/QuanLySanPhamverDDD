import { useState, useEffect } from "react";
import { SanPhamApi } from "./api/SanPhamApi.js";

/* ─── Field component ─── */
const Field = ({ label, required, error, children }) => (
    <div style={F.fieldWrap}>
        <label style={F.label}>
            {label}
            {required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
        </label>
        {children}
        {error && <p style={F.errorText}>{error}</p>}
    </div>
);

/* ─── Main component ─── */
export default function SanPhamform({ loaiSPs = [], editData = null, onClose }) {
    const isEdit = Boolean(editData);

    const [form, setForm] = useState({
        maSanPham:   "",
        tenSanPham:  "",
        loaiSanPham: "",
        donVi:       "",
        giaBan:      "",
        slTon:       "",
        moTa:        "",
        trangThai:   1,
    });
    const [errors,   setErrors]   = useState({});
    const [saving,   setSaving]   = useState(false);
    const [apiError, setApiError] = useState("");

    /* Pre-fill when editing */
    useEffect(() => {
        if (editData) {
            setForm({
                maSanPham:   editData.maSanPham   ?? "",
                tenSanPham:  editData.tenSanPham  ?? "",
                loaiSanPham: editData.loaiSanPham ?? "",
                donVi:       editData.donVi       ?? "",
                giaBan:      editData.giaBan      ?? "",
                slTon:       editData.slTon       ?? "",
                moTa:        editData.moTa        ?? "",
                trangThai:   editData.trangThai   ?? 1,
            });
        }
    }, [editData]);

    /* Helpers */
    const set = (key, val) => {
        setForm(prev => ({ ...prev, [key]: val }));
        setErrors(prev => ({ ...prev, [key]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.maSanPham.trim())                   e.maSanPham   = "Vui lòng nhập mã sản phẩm";
        if (!form.tenSanPham.trim())                  e.tenSanPham  = "Vui lòng nhập tên sản phẩm";
        if (!form.loaiSanPham)                        e.loaiSanPham = "Vui lòng chọn loại sản phẩm";
        if (!form.donVi.trim())                       e.donVi       = "Vui lòng nhập đơn vị";
        if (!form.giaBan || Number(form.giaBan) <= 0) e.giaBan      = "Giá bán phải lớn hơn 0";
        if (form.slTon === "" || Number(form.slTon) < 0) e.slTon    = "Số lượng tồn phải ≥ 0";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setSaving(true);
        setApiError("");

        const payload = {
            ...form,
            giaBan:      Number(form.giaBan),
            slTon:       Number(form.slTon),
            loaiSanPham: Number(form.loaiSanPham),
        };

        try {
            if (isEdit) {
                await SanPhamApi.update(editData.sanPhamId, payload);
            } else {
                await SanPhamApi.create(payload);
            }
            onClose(true);
        } catch (err) {
            setApiError(err.message || "Lưu thất bại. Vui lòng thử lại.");
        } finally {
            setSaving(false);
        }
    };

    /* Backdrop click closes modal */
    const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(false); };

    return (
        <div style={F.overlay} onClick={handleBackdrop}>
            <div style={F.modal}>
                {/* ── Modal Header ── */}
                <div style={F.modalHeader}>
                    <div>
                        <div style={F.modalIcon}>{isEdit ? "✏️" : "📦"}</div>
                        <div>
                            <h2 style={F.modalTitle}>
                                {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                            </h2>
                            <p style={F.modalSub}>
                                {isEdit
                                    ? `Đang sửa: ${editData.tenSanPham}`
                                    : "Điền đầy đủ thông tin để thêm sản phẩm"}
                            </p>
                        </div>
                    </div>
                    <button style={F.closeBtn} onClick={() => onClose(false)}>✕</button>
                </div>

                {/* ── API Error ── */}
                {apiError && (
                    <div style={F.apiErrorBox}>
                        ⚠️ {apiError}
                    </div>
                )}

                {/* ── Form Body ── */}
                <div style={F.body}>
                    {/* Row 1 */}
                    <div style={F.row2}>
                        <Field label="Mã sản phẩm" required error={errors.maSanPham}>
                            <input
                                style={{ ...F.input, ...(errors.maSanPham ? F.inputErr : {}) }}
                                placeholder="VD: CRM-BASIC"
                                value={form.maSanPham}
                                onChange={e => set("maSanPham", e.target.value)}
                                disabled={isEdit}
                            />
                        </Field>
                        <Field label="Loại sản phẩm" required error={errors.loaiSanPham}>
                            <select
                                style={{ ...F.input, ...(errors.loaiSanPham ? F.inputErr : {}) }}
                                value={form.loaiSanPham}
                                onChange={e => set("loaiSanPham", e.target.value)}
                            >
                                <option value="">-- Chọn loại --</option>
                                {loaiSPs.map((l, i) => (
                                    <option key={l.id} value={i + 1}>{l.tenLoai}</option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    {/* Row 2 */}
                    <Field label="Tên sản phẩm" required error={errors.tenSanPham}>
                        <input
                            style={{ ...F.input, ...(errors.tenSanPham ? F.inputErr : {}) }}
                            placeholder="VD: Phần mềm CRM cơ bản"
                            value={form.tenSanPham}
                            onChange={e => set("tenSanPham", e.target.value)}
                        />
                    </Field>

                    {/* Row 3 */}
                    <div style={F.row3}>
                        <Field label="Đơn vị" required error={errors.donVi}>
                            <input
                                style={{ ...F.input, ...(errors.donVi ? F.inputErr : {}) }}
                                placeholder="VD: License, Cái, Hộp..."
                                value={form.donVi}
                                onChange={e => set("donVi", e.target.value)}
                            />
                        </Field>
                        <Field label="Giá bán (₫)" required error={errors.giaBan}>
                            <input
                                style={{ ...F.input, ...(errors.giaBan ? F.inputErr : {}) }}
                                type="number" min="0" placeholder="VD: 5000000"
                                value={form.giaBan}
                                onChange={e => set("giaBan", e.target.value)}
                            />
                        </Field>
                        <Field label="Số lượng tồn" required error={errors.slTon}>
                            <input
                                style={{ ...F.input, ...(errors.slTon ? F.inputErr : {}) }}
                                type="number" min="0" placeholder="0"
                                value={form.slTon}
                                onChange={e => set("slTon", e.target.value)}
                            />
                        </Field>
                    </div>

                    {/* Mô tả */}
                    <Field label="Mô tả">
                        <textarea
                            style={{ ...F.input, ...F.textarea }}
                            placeholder="Mô tả ngắn về sản phẩm (không bắt buộc)..."
                            value={form.moTa}
                            onChange={e => set("moTa", e.target.value)}
                            rows={3}
                        />
                    </Field>

                    {/* Trạng thái */}
                    <div style={F.statusRow}>
                        <span style={F.label}>Trạng thái</span>
                        <div style={F.toggleGroup}>
                            {[{ v: 1, label: "✅ Đang bán" }, { v: 0, label: "🚫 Ngừng bán" }].map(opt => (
                                <button
                                    key={opt.v}
                                    style={{
                                        ...F.toggleBtn,
                                        ...(form.trangThai === opt.v ? (opt.v === 1 ? F.toggleActiveGreen : F.toggleActiveRed) : {}),
                                    }}
                                    onClick={() => set("trangThai", opt.v)}
                                    type="button"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div style={F.footer}>
                    <button style={F.btnCancel} onClick={() => onClose(false)}>Hủy</button>
                    <button style={{ ...F.btnSave, opacity: saving ? 0.7 : 1 }} onClick={handleSubmit} disabled={saving}>
                        {saving
                            ? "⏳ Đang lưu..."
                            : isEdit ? "💾 Cập nhật" : "➕ Thêm sản phẩm"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Styles ─── */
const F = {
    overlay: {
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,23,42,.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
    },
    modal: {
        background: "#fff", borderRadius: 20,
        width: "100%", maxWidth: 640,
        boxShadow: "0 24px 64px rgba(0,0,0,.18)",
        display: "flex", flexDirection: "column",
        maxHeight: "90vh", overflow: "hidden",
    },
    modalHeader: {
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", padding: "24px 28px 0",
        gap: 12,
    },
    modalIcon: {
        fontSize: 28, marginBottom: 4,
        display: "flex", alignItems: "center", gap: 10,
    },
    modalTitle: {
        fontSize: 20, fontWeight: 800, margin: "0 0 2px",
        color: "#0f172a", letterSpacing: "-0.3px",
        display: "inline",
    },
    modalSub: { fontSize: 13, color: "#64748b", margin: "4px 0 0" },
    closeBtn: {
        background: "#f1f5f9", border: "none", borderRadius: 8,
        width: 34, height: 34, cursor: "pointer",
        fontSize: 14, color: "#64748b", flexShrink: 0,
    },
    apiErrorBox: {
        margin: "16px 28px 0",
        background: "#fef2f2", border: "1px solid #fecaca",
        color: "#dc2626", borderRadius: 10,
        padding: "10px 14px", fontSize: 13, fontWeight: 500,
    },
    body: {
        padding: "20px 28px",
        overflowY: "auto", flex: 1,
        display: "flex", flexDirection: "column", gap: 16,
    },
    row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
    row3: { display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: 14 },
    fieldWrap: { display: "flex", flexDirection: "column", gap: 5 },
    label: { fontSize: 13, fontWeight: 600, color: "#374151" },
    errorText: { fontSize: 12, color: "#ef4444", margin: 0 },
    input: {
        padding: "9px 13px",
        border: "1.5px solid #e2e8f0", borderRadius: 9,
        fontSize: 13, color: "#111827", background: "#f8fafc",
        outline: "none", width: "100%", boxSizing: "border-box",
        fontFamily: "inherit", transition: "border-color .15s",
    },
    inputErr: { borderColor: "#f87171", background: "#fff5f5" },
    textarea: { resize: "vertical", minHeight: 72 },
    statusRow: {
        display: "flex", alignItems: "center", gap: 16,
        background: "#f8fafc", borderRadius: 10, padding: "12px 14px",
    },
    toggleGroup: { display: "flex", gap: 8 },
    toggleBtn: {
        padding: "6px 16px", borderRadius: 8,
        border: "1.5px solid #e2e8f0", background: "#fff",
        fontSize: 13, cursor: "pointer", fontWeight: 500, color: "#64748b",
        transition: "all .15s",
    },
    toggleActiveGreen: {
        background: "#ecfdf5", borderColor: "#6ee7b7",
        color: "#059669", fontWeight: 700,
    },
    toggleActiveRed: {
        background: "#fef2f2", borderColor: "#fca5a5",
        color: "#dc2626", fontWeight: 700,
    },
    footer: {
        display: "flex", justifyContent: "flex-end", gap: 10,
        padding: "16px 28px", borderTop: "1px solid #f1f5f9",
        background: "#f8fafc",
    },
    btnCancel: {
        padding: "9px 20px", border: "1.5px solid #e2e8f0",
        borderRadius: 9, background: "#fff", color: "#64748b",
        fontSize: 14, fontWeight: 600, cursor: "pointer",
    },
    btnSave: {
        padding: "9px 24px",
        background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "#fff", border: "none", borderRadius: 9,
        fontSize: 14, fontWeight: 700, cursor: "pointer",
        boxShadow: "0 4px 12px rgba(37,99,235,.3)",
    },
};