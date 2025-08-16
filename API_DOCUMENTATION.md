# API Documentation - SIDARABALI

## Base URL

- Development: `http://localhost:3001/api`
- Production: `https://bitwize.cloud/api`

## Authentication

Semua endpoint memerlukan header Authorization dengan format:

```
Authorization: Bearer {token}
```

## Endpoints

### 1. Create Application

**POST** `/documents/applications`

Membuat aplikasi pengajuan baru.

**Request Body:**

```json
{
  "id_pengajuan": 1,
  "application_title": "Pengajuan Tanah Eks Kota Praja",
  "additional_notes": "Catatan tambahan (opsional)",
  "user_id": 123
}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Application created successfully",
  "data": {
    "id": 1,
    "id_pengajuan": 1,
    "application_title": "Pengajuan Tanah Eks Kota Praja",
    "additional_notes": "Catatan tambahan",
    "user_id": 123,
    "created_at": "2024-01-01T00:00:00.000Z",
    "status": "pending"
  }
}
```

**Response Error (400/500):**

```json
{
  "success": false,
  "message": "Error message"
}
```

### 2. Get Pengajuan Types

**GET** `/documents/pengajuan/names`

Mendapatkan daftar jenis pengajuan yang tersedia.

**Response Success (200):**

```json
[
  {
    "id_pengajuan": 1,
    "nama_pengajuan": "Standar Pelayanan Kelengkapan Administrasi Permohonan Rekomendasi Hak Atas Tanah Eks Kota Praja"
  },
  {
    "id_pengajuan": 2,
    "nama_pengajuan": "Standar Pelayanan Pencatatan Surat Pernyataan Ahli Waris WNI"
  }
]
```

### 3. Get User Profile

**GET** `/profile`

Mendapatkan data profil pengguna yang sedang login.

**Response Success (200):**

```json
{
  "success": true,
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com",
    "nama_lengkap": "John Doe",
    "tempat_lahir": "Jakarta",
    "tanggal_lahir": "1990-01-01",
    "jenis_kelamin": "L",
    "agama": "Islam",
    "no_ktp_sktld": "1234567890123456",
    "alamat_lengkap": "Jl. Contoh No. 123",
    "pekerjaan": "Karyawan",
    "phone": "081234567890"
  }
}
```

### 4. Upload Documents

**POST** `/documents/upload`

Mengunggah dokumen ke sistem.

**Request Body (FormData):**

```
document: [file]
user_id: 123
document_type: "surat_pengantar_rt_rw"
id_pengajuan: 1
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "id": 1,
    "file_name": "document.pdf",
    "document_type": "surat_pengantar_rt_rw",
    "status": "pending"
  }
}
```

### 5. Bulk Upload Documents

**POST** `/documents/upload/bulk-links`

Mengunggah multiple dokumen sekaligus dengan URL.

**Request Body:**

```json
{
  "user_id": 123,
  "id_pengajuan": 1,
  "documents": [
    {
      "document_type": "surat_pengantar_rt_rw",
      "file_url": "https://example.com/file1.pdf",
      "user_note": "Catatan untuk dokumen 1"
    }
  ]
}
```

## Error Handling

Semua endpoint mengembalikan error dengan format yang konsisten:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical error details (optional)"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Notes

1. Semua request harus menyertakan token authentication
2. File upload mendukung format: PDF, JPG, JPEG, PNG, DOC, DOCX
3. Maksimal ukuran file: 10MB
4. Timestamp menggunakan format ISO 8601
5. ID pengguna diambil dari localStorage setelah login
