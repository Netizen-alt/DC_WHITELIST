# ระบบ DISCORD WHITELIST FOR FIVEM
+ [ วิธีตั้งค่า EMBED เบื้องต้นง่ายๆ ]
+ [ติดต่อ](https://discord.gg/EB9CFWjcFh)

### วิธีการติดตั้งและรัน
 + Req: [NodeJS](https://nodejs.org/en/download)
 + Req: [VSCODE](https://code.visualstudio.com/download)
 + Req: [TOKENBOT](https://discord.com/developers/)
 
 
```js
npm install && npm i

node index.js && node .
```

```js 
const { ButtonStyle } = require('discord.js');

module.exports = {
  // ตั้งค่าโทเคนและข้อมูลเซิร์ฟเวอร์
  token: "",                       // โทเคนของบอท
  roleAdmin: "",                   // ไอดียศแอดมิน
  guild: [""],                     // ไอดีเซิร์ฟเวอร์
  WhitelistRole: "",               // ไอดียศไวท์ลิสต์
  channelId: "",                   // ไอดีห้องกดรับยศ
  channelId_Log: "",               // ไอดีห้องบันทึกข้อมูล

  // ตั้งค่าหน้าข้อความและปุ่มหลัก
  main: {
    title: "test",                 // ชื่อหัวข้อข้อความ
    iconURL: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // ไอคอนหัวข้อ
    Description: "**FF \n\n กรุณากรอกข้อมูลให้ครบ [มิเช่นนั้น] ทางเราจะไม่รับเรื่องดังที่สมัครเข้ามา**",
    colors: "#ff0003",             // สีของข้อความ
    image: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // รูปภาพหลัก

    button_msg: "กดปุ่มเพื่อลงทะเบียนไวท์ลิสต์",  // ข้อความปุ่ม
    button_emoji: "✅",                             // อิโมจิปุ่ม
    button_style: ButtonStyle.Danger,              // สีปุ่ม (Primary น้ำเงิน, Secondary เทา, Success เขียว, Danger แดง)
  },

  // ตั้งค่าหน้ากรอกข้อมูล
  modals: {
    title: "test"                   // ชื่อหัวข้อหน้ากรอกข้อมูล
  },

  // ข้อความตอบกลับผู้ใช้หลังกรอกข้อมูล
  reply_submit: {
    title: "test",                 // ชื่อหัวข้อข้อความตอบกลับ
    iconURL: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // ไอคอนหัวข้อ
    colors: "#41ff00",             // สีข้อความ
    Description: "**คุณได้ทำการยืนยันเป็นที่เรียบร้อย รอทางแอดมินตรวจสอบ**"
  },

  // ข้อความแจ้งเตือนไปยังแอดมิน
  reply_admin: {
    title: "test",                 // ชื่อหัวข้อข้อความแจ้งแอดมิน
    iconURL: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png" // ไอคอนหัวข้อ
  }
};

```
 
 
 ผู้แก้ไขข้อมูล **BALLZAZA#4481**
 ผู้แก้ไขข้อมูล **st4rsation_**
