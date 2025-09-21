# FelixCraft Panel

แผงควบคุมเซิร์ฟเวอร์ Minecraft สำหรับ Exaroton.com

## การติดตั้ง

1. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

2. ตั้งค่า API Key:
   - เข้าไปที่ [Exaroton Dashboard](https://exaroton.com/account)
   - สร้าง API Key ในส่วน Account Settings
   - แก้ไขไฟล์ `.env` และใส่ API Key ของคุณ:
     ```
     EXAROTON_API_KEY=your_actual_api_key_here
     ```

3. รันแอปพลิเคชัน:
   ```bash
   npm start
   ```

4. เปิดเบราว์เซอร์และไปที่ `http://localhost:3000`

## คุณสมบัติ

- แสดงรายชื่อเซิร์ฟเวอร์ทั้งหมด
- เริ่มและหยุดเซิร์ฟเวอร์
- อัปเดตสถานะเซิร์ฟเวอร์อัตโนมัติทุก 30 วินาที
- อินเทอร์เฟซที่ใช้งานง่ายด้วยภาษาไทย

## API Endpoints

- `GET /api/servers` - ดึงรายชื่อเซิร์ฟเวอร์
- `POST /api/servers/:id/start` - เริ่มเซิร์ฟเวอร์
- `POST /api/servers/:id/stop` - หยุดเซิร์ฟเวอร์
  
## License

ISC
