const { ButtonStyle } = require('discord.js')
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
    title: "", // ชื่อหัวข้อ
    iconURL: "", // รูปไอคอน
    Description: "**FF \n\n กรุณากรอกข้อมูลให้ครบ [มิเช่นนั้น] ทางเราจะไม่รับเรื่องดังที่สมัครเข้ามา**", // คำอธิบาย
    colors: [255, 0, 0], // #a7e7ff -> [R, G, B] // 12942973
    image: "", // รูปหลัก
  },
  //ชื่อของหัวข้อหลังกดปุ่ม
  modals: {
    title: ""
  },
  //setting หลังกรอกข้อมูลเสร็จ
  reply_submit: {
    title: "", // ชื่อหัวข้อ
    iconURL: "", // รูปไอคอน
    colors: [255, 0, 0], // #a7e7ff -> [R, G, B] // 12942973
    Description: "**คุณได้ทำการยืนยันเป็นที่เรียบร้อย รอทาง**"
  },
  reply_admin: {
    title: "", // ชื่อหัวข้อ
    iconURL: "", // รูปไอคอน
  }
};
