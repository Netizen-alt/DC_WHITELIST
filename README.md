# DC_WHITELIST
+ [ วิธีตั้งค่า EMBED เบื้องต้นง่ายๆ ]
+ [ติดต่อ](https://discord.gg/EB9CFWjcFh)

### how to install and run 
 + Req: [NodeJS](https://nodejs.org/en/download)
 + Req: [VSCODE](https://code.visualstudio.com/download)
 + Req: [TOKENBOT](https://discord.com/developers/)
 
 
```js
npm install && npm i

node index.js && node .
```
 ```js 
module.exports = {
  token:
    "", // โทเคนบอท
  roleAdmin: "", //ยศแอดมิน
  guild: [""], //เซิฟเวอร์
  WhitelistRole: "", //ยศไวริส
  channelId: "", //ห้องสำหรับกดรับ
  channelId_Log: "", // ห้องสำหรับข้อมูล
  // setting ส่วนแรกคือหน้ากด
  main: {
    button_msg: "กดปุ่มเพื่อลงทะเบียนไวริส", // ข้อความปุ่ม
    button_emoji: "✅", // อิโมจิเท่านั้น สามารถใช้อิโมจิพิเศษได้ ตัวอย่าง `<a:784488608782483477:853402922037280780>`
    button_style: ButtonStyle.Danger, //จำเป็นต้องมี ButtonStyle อยุ่ข้างหน้าเสมอ มีทั้งหมด 4สี ได้แก่ Primary สีน้ำเงิน , Secondary = เทา , Success = เขียว ,Danger =แดง 
    title: "test", // ชื่อหัวข้อ
    iconURL: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // รูปไอคอน
    Description: "**FF \n\n กรุณากรอกข้อมูลให้ครบ [มิเช่นนั้น] ทางเราจะไม่รับเรื่องดังที่สมัครเข้ามา**", // คำอธิบาย
    colors: "#ff0003", // #a7e7ff -> [R, G, B] // 12942973
    image: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // รูปหลัก
  },
  //ชื่อของหัวข้อหลังกดปุ่ม
  modals: {
    title: "test"
  },
  //setting หลังกรอกข้อมูลเสร็จ
  reply_submit: {
    title: "test", // ชื่อหัวข้อ
    iconURL: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // รูปไอคอน
    colors: "#41ff00", // #a7e7ff -> [R, G, B] // 12942973
    Description: "**คุณได้ทำการยืนยันเป็นที่เรียบร้อย รอทาง**"
  },
  reply_admin: {
    title: "test", // ชื่อหัวข้อ
    iconURL: "https://cdn.discordapp.com/attachments/988800716212674570/1082762974520946758/logo.png", // รูปไอคอน
  }
};
 ```
 
 
 ผู้แก้ไขข้อมูล **BALLZAZA#4481**
 ผู้แก้ไขข้อมูล **st4rsation_**
