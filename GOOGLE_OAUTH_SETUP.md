# Setup Google OAuth untuk Login

## ⚠️ Error: ClientFetchError

Jika mendapat error `ClientFetchError: Unexpected end of JSON input`, ikuti langkah di bawah.

## Langkah 1: Generate NEXTAUTH_SECRET

**PENTING**: NEXTAUTH_SECRET harus di-set untuk production/development.

Di terminal, jalankan:
```bash
openssl rand -base64 32
```

Copy hasil output dan update `.env.local`:
```env
NEXTAUTH_SECRET=hasil-dari-openssl-rand-base64-32
```

## Langkah 2: Setup Google Cloud Console

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Buat project baru atau gunakan project yang sudah ada
3. Aktifkan Google+ API:
   - Cari "Google+ API" di search bar
   - Klik "Enable"

4. Buat OAuth 2.0 Credentials:
   - Pilih "Credentials" di sidebar
   - Klik "Create Credentials" > "OAuth 2.0 Client IDs"
   - Pilih "Web application"
   - Di "Authorized JavaScript origins" tambahkan:
     - `http://localhost:3000`
   - Di "Authorized redirect URIs" tambahkan:
     - `http://localhost:3000/api/auth/callback/google`
   - Klik "Create"

5. Copy **Client ID** dan **Client Secret**

## Langkah 3: Update `.env.local`

Buka file `.env.local` dan update:

```env
MONGODB_URI=mongodb+srv://kecoabalap122_db_user:%40Ruyat123@cluster0.5s1rbrs.mongodb.net/wedding-invitation?retryWrites=true&w=majority&appName=Cluster0

# NextAuth Configuration
NEXTAUTH_SECRET=hasil-dari-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-copied-client-id
GOOGLE_CLIENT_SECRET=your-copied-client-secret
```

## Langkah 4: Restart Development Server

```bash
npm run dev
```

Pastikan tidak ada error di console. Jika masih ada error, check:
- ✅ NEXTAUTH_SECRET tidak kosong
- ✅ NEXTAUTH_URL sesuai (http://localhost:3000)
- ✅ GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET benar (bukan placeholder)
- ✅ MONGODB_URI valid

## Langkah 5: Testing

1. Buka http://localhost:3000/landing
2. Klik "Buat Undangan Gratis"
3. Klik "Masuk dengan Google"
4. Login dengan akun Google Anda
5. Seharusnya redirect ke `/client` dashboard

## Production Setup

Untuk production:

1. Update `NEXTAUTH_URL` di environment:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

2. Di Google Cloud Console, tambah authorized URIs:
   ```
   https://yourdomain.com
   https://yourdomain.com/api/auth/callback/google
   ```

3. Generate NEXTAUTH_SECRET yang kuat:
   ```bash
   openssl rand -base64 32
   ```

## Troubleshooting

### ❌ ClientFetchError: Unexpected end of JSON input
- Pastikan NEXTAUTH_SECRET sudah di-set (bukan placeholder)
- Restart dev server setelah update `.env.local`

### ❌ Redirect URI mismatch
- Pastikan callback URL di Google Console cocok: `http://localhost:3000/api/auth/callback/google`
- Pastikan `NEXTAUTH_URL=http://localhost:3000`

### ❌ User tidak muncul di database
- Check MongoDB connection
- Pastikan `MONGODB_URI` valid

### ❌ Session tidak persist
- Pastikan `NEXTAUTH_SECRET` tidak kosong
- Session strategy sudah set ke `jwt`
