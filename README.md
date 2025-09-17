# Fitness Learning App

เว็บตัวอย่างเพื่อการเรียนรู้ออกกำลังกาย (React + Vite) พร้อมสคริปต์ deploy ไปยัง GitHub Pages

## รันบนเครื่อง
```bash
npm install
npm run dev
```

## Deploy ไป GitHub Pages
1) แก้ `package.json` เปลี่ยน `USERNAME` ให้เป็นชื่อ GitHub ของคุณ
2) ล็อกอิน GitHub และสร้าง repository ชื่อ `fitness-learning-app` (Public)
3) เปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วรัน:
```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/USERNAME/fitness-learning-app.git
git push -u origin main
```
4) ติดตั้งและ deploy:
```bash
npm install
npm run deploy
```
5) เปิดลิงก์ `https://USERNAME.github.io/fitness-learning-app`

> หากหน้าเว็บไม่ขึ้น ให้ไปที่ Settings → Pages ของ repo ตรวจสอบว่า Source ใช้ `GitHub Actions` หรือ branch `gh-pages` (ระบบ gh-pages จะสร้าง branch ให้เองหลัง deploy)
