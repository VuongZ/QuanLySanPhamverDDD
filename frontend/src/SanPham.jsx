import { useState, useEffect } from "react";
import { SanPhamApi, LoaiSanPhamAPI } from "./api/SanPhamApi.js";
import SanPhamForm from "./SanPhamForm.jsx";

/* ───────────────────────── helpers ───────────────────────── */
const fmt = (n) => n?.toLocaleString("vi-VN") + "₫";

const StatusBadge = ({ trangThai }) => (
    <span style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.04em", textTransform: "uppercase",
        background: trangThai === 1 ? "#ecfdf5" : "#fef2f2",
        color:      trangThai === 1 ? "#059669" : "#dc2626",
        border:     `1px solid ${trangThai === 1 ? "#a7f3d0" : "#fecaca"}`,
    }}>
        <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: trangThai === 1 ? "#10b981" : "#ef4444",
        }} />
        {trangThai === 1 ? "Đang bán" : "Ngừng bán"}
    </span>
);

/* ───────────────────────── component ───────────────────────── */
export default function SanPham() {
    const [sanPhams, setSanPhams]     = useState([]);
    const [loaiSPs, setLoaiSPs]       = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);
    const [search, setSearch]         = useState("");
    const [filterLoai, setFilterLoai] = useState("all");
    const [filterTT, setFilterTT]     = useState("all");
    const [showForm, setShowForm]     = useState(false);
    const [editData, setEditData]     = useState(null);

    const loadData = () => {
        setLoading(true);
        Promise.all([SanPhamApi.getAll(), LoaiSanPhamAPI.getAll()])
            .then(([spRes, loaiRes]) => {
                setSanPhams(spRes.data);
                setLoaiSPs(loaiRes.data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(loadData, []);

    const getTenLoai = (id) => loaiSPs[id - 1]?.tenLoai ?? "—";

    const handleDelete = (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) return;
        SanPhamApi.delete(id)
            .then(loadData)
            .catch(err => alert("Xóa thất bại: " + err.message));
    };

    const handleEdit = (sp) => { setEditData(sp); setShowForm(true); };
    const handleAdd  = ()   => { setEditData(null); setShowForm(true); };
    const handleFormClose = (saved) => { setShowForm(false); setEditData(null); if (saved) loadData(); };

    const filtered = sanPhams.filter(sp => {
        const q = search.toLowerCase();
        const matchSearch = sp.tenSanPham?.toLowerCase().includes(q) || sp.maSanPham?.toLowerCase().includes(q);
        const matchLoai   = filterLoai === "all" || String(sp.loaiSanPham) === String(filterLoai);
        const matchTT     = filterTT   === "all" || String(sp.trangThai)   === filterTT;
        return matchSearch && matchLoai && matchTT;
    });

    /* ── stats ── */
    const dangBan  = sanPhams.filter(s => s.trangThai === 1).length;
    const tongTon  = sanPhams.reduce((a, s) => a + (s.slTon || 0), 0);

    /* ── loading / error ── */
    if (loading) return (
        <div style={S.center}>
            <div style={S.spinnerRing} />
            <p style={{ color: "#64748b", marginTop: 14, fontSize: 14 }}>Đang tải dữ liệu...</p>
        </div>
    );
    if (error) return (
        <div style={S.center}>
            <div style={S.errorBox}>
                <span style={{ fontSize: 28 }}>⚠️</span>
                <p style={{ color: "#dc2626", fontWeight: 600 }}>Lỗi tải dữ liệu</p>
                <p style={{ color: "#64748b", fontSize: 13 }}>{error}</p>
                <button style={S.btnPrimary} onClick={loadData}>Thử lại</button>
            </div>
        </div>
    );

    return (
        <>
            {showForm && (
                <SanPhamForm
                    loaiSPs={loaiSPs}
                    editData={editData}
                    onClose={handleFormClose}
                />
            )}

            <div style={S.page}>
                {/* ── Header ── */}
                <div style={S.topBar}>
                    <div>
                        <div style={S.breadcrumb}>Tổng quan / <strong>Sản phẩm</strong></div>
                        <h1 style={S.title}>Quản lý sản phẩm</h1>
                    </div>
                    <button style={S.btnPrimary} onClick={handleAdd}>
                        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Thêm sản phẩm
                    </button>
                </div>

                {/* ── Stat cards ── */}
                <div style={S.statsRow}>
                    {[
                        { label: "Tổng sản phẩm", value: sanPhams.length, icon: "📦", color: "#2563eb", bg: "#eff6ff" },
                        { label: "Đang bán",       value: dangBan,         icon: "✅", color: "#059669", bg: "#ecfdf5" },
                        { label: "Ngừng bán",      value: sanPhams.length - dangBan, icon: "🚫", color: "#dc2626", bg: "#fef2f2" },
                        { label: "Tổng tồn kho",   value: tongTon.toLocaleString(), icon: "🏪", color: "#7c3aed", bg: "#f5f3ff" },
                        { label: "Loại sản phẩm",  value: loaiSPs.length,  icon: "🏷️", color: "#d97706", bg: "#fffbeb" },
                    ].map(c => (
                        <div key={c.label} style={{ ...S.statCard, background: c.bg, borderColor: c.bg }}>
                            <div style={{ ...S.statIcon, background: c.color + "18", color: c.color }}>{c.icon}</div>
                            <div>
                                <div style={{ ...S.statValue, color: c.color }}>{c.value}</div>
                                <div style={S.statLabel}>{c.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Filters ── */}
                <div style={S.filterBar}>
                    <div style={S.searchWrap}>
                        <span style={S.searchIcon}>🔍</span>
                        <input
                            style={S.searchInput}
                            placeholder="Tìm theo tên hoặc mã sản phẩm..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button style={S.clearBtn} onClick={() => setSearch("")}>✕</button>
                        )}
                    </div>
                    <select style={S.select} value={filterLoai} onChange={e => setFilterLoai(e.target.value)}>
                        <option value="all">Tất cả loại</option>
                        {loaiSPs.map((l, i) => (
                            <option key={l.id} value={i + 1}>{l.tenLoai}</option>
                        ))}
                    </select>
                    <select style={S.select} value={filterTT} onChange={e => setFilterTT(e.target.value)}>
                        <option value="all">Tất cả trạng thái</option>
                        <option value="1">Đang bán</option>
                        <option value="0">Ngừng bán</option>
                    </select>
                    <div style={S.resultCount}>
                        {filtered.length !== sanPhams.length
                            ? <><strong>{filtered.length}</strong> / {sanPhams.length} sản phẩm</>
                            : <><strong>{sanPhams.length}</strong> sản phẩm</>}
                    </div>
                </div>

                {/* ── Table ── */}
                <div style={S.tableCard}>
                    <table style={S.table}>
                        <thead>
                        <tr>
                            {["Mã SP","Tên sản phẩm","Loại","Đơn vị","Giá bán","Tồn kho","Trạng thái",""].map(h => (
                                <th key={h} style={S.th}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={S.empty}>
                                    <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
                                    <div style={{ fontWeight: 600, color: "#374151" }}>Không tìm thấy sản phẩm</div>
                                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>Thử thay đổi từ khóa hoặc bộ lọc</div>
                                </td>
                            </tr>
                        ) : filtered.map((sp, i) => (
                            <tr key={sp.sanPhamId} style={{ ...S.tr, background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                                <td style={S.td}>
                                    <span style={S.codeBadge}>{sp.maSanPham}</span>
                                </td>
                                <td style={{ ...S.td, maxWidth: 220 }}>
                                    <div style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>{sp.tenSanPham}</div>
                                    {sp.moTa && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{sp.moTa}</div>}
                                </td>
                                <td style={S.td}>
                                    <span style={S.loaiBadge}>{getTenLoai(sp.loaiSanPham)}</span>
                                </td>
                                <td style={{ ...S.td, color: "#6b7280", fontSize: 13 }}>{sp.donVi}</td>
                                <td style={S.td}>
                                    <span style={S.priceTag}>{fmt(sp.giaBan)}</span>
                                </td>
                                <td style={S.td}>
                                    <span style={{
                                        ...S.stockNum,
                                        color: sp.slTon === 0 ? "#dc2626" : sp.slTon < 10 ? "#d97706" : "#059669",
                                    }}>{sp.slTon ?? 0}</span>
                                </td>
                                <td style={S.td}><StatusBadge trangThai={sp.trangThai} /></td>
                                <td style={{ ...S.td, whiteSpace: "nowrap" }}>
                                    <button style={S.btnEdit}   onClick={() => handleEdit(sp)}>✏️ Sửa</button>
                                    <button style={S.btnDelete} onClick={() => handleDelete(sp.sanPhamId)}>🗑</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

/* ───────────────────────── styles ───────────────────────── */
const S = {
    page: {
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "28px 32px",
        fontFamily: "'Segoe UI', 'Be Vietnam Pro', sans-serif",
        color: "#111827",
    },
    center: {
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", flexDirection: "column", background: "#f1f5f9",
    },
    spinnerRing: {
        width: 44, height: 44,
        border: "4px solid #e2e8f0",
        borderTop: "4px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 0.75s linear infinite",
    },
    errorBox: {
        background: "#fff", borderRadius: 16, padding: "40px 48px",
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    },
    /* top */
    topBar: {
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 24,
    },
    breadcrumb: { fontSize: 12, color: "#94a3b8", marginBottom: 4 },
    title: { fontSize: 26, fontWeight: 800, margin: 0, color: "#0f172a", letterSpacing: "-0.5px" },
    btnPrimary: {
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
        color: "#fff", border: "none", borderRadius: 10,
        padding: "10px 20px", fontSize: 14, fontWeight: 700,
        cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,.35)",
        transition: "opacity .15s",
    },
    /* stats */
    statsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 14, marginBottom: 20,
    },
    statCard: {
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 20px", borderRadius: 14,
        border: "1px solid transparent",
        boxShadow: "0 1px 4px rgba(0,0,0,.04)",
    },
    statIcon: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
    statValue: { fontSize: 22, fontWeight: 800, lineHeight: 1 },
    statLabel: { fontSize: 12, color: "#64748b", marginTop: 3, fontWeight: 500 },
    /* filters */
    filterBar: {
        display: "flex", gap: 10, alignItems: "center",
        background: "#fff", borderRadius: 12, padding: "12px 16px",
        boxShadow: "0 1px 4px rgba(0,0,0,.05)", marginBottom: 16,
    },
    searchWrap: {
        flex: 1, position: "relative", display: "flex", alignItems: "center",
    },
    searchIcon: { position: "absolute", left: 12, fontSize: 14, pointerEvents: "none" },
    searchInput: {
        width: "100%", padding: "8px 36px 8px 36px",
        border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14,
        background: "#f8fafc", outline: "none", color: "#111827",
        boxSizing: "border-box",
    },
    clearBtn: {
        position: "absolute", right: 10, background: "none",
        border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14,
    },
    select: {
        padding: "8px 12px", border: "1px solid #e2e8f0",
        borderRadius: 8, fontSize: 13, background: "#f8fafc",
        cursor: "pointer", color: "#374151", minWidth: 140,
    },
    resultCount: { fontSize: 13, color: "#64748b", whiteSpace: "nowrap", paddingLeft: 4 },
    /* table */
    tableCard: {
        background: "#fff", borderRadius: 16,
        boxShadow: "0 1px 8px rgba(0,0,0,.06)",
        overflow: "hidden", border: "1px solid #e2e8f0",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
        padding: "13px 16px", textAlign: "left",
        fontSize: 11, fontWeight: 700, color: "#64748b",
        textTransform: "uppercase", letterSpacing: "0.07em",
        background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
    },
    tr: { transition: "background .1s" },
    td: { padding: "13px 16px", fontSize: 13, borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" },
    empty: { textAlign: "center", padding: "56px 0", color: "#9ca3af" },
    codeBadge: {
        fontFamily: "'Cascadia Code','Fira Code',monospace",
        background: "#eff6ff", color: "#1d4ed8",
        padding: "3px 9px", borderRadius: 6, fontSize: 12, fontWeight: 700,
    },
    loaiBadge: {
        background: "#f1f5f9", color: "#475569",
        padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
        border: "1px solid #e2e8f0",
    },
    priceTag: { fontWeight: 700, color: "#0369a1", fontSize: 14 },
    stockNum: { fontWeight: 700, fontSize: 14 },
    btnEdit: {
        background: "#f0fdf4", color: "#16a34a",
        border: "1px solid #bbf7d0", borderRadius: 7,
        padding: "5px 13px", fontSize: 12, fontWeight: 600,
        cursor: "pointer", marginRight: 6,
    },
    btnDelete: {
        background: "#fff1f2", color: "#dc2626",
        border: "1px solid #fecaca", borderRadius: 7,
        padding: "5px 10px", fontSize: 13, cursor: "pointer",
    },
};