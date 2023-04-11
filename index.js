const {
  Client,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const editJsonFile = require("edit-json-file");
const config = require("./config");
const fs = require('fs');
const client = new Client({
  intents: ["Guilds", "GuildMembers"],
});

client.on("ready", async () => {
  console.log("BROKEN BOT WHITE LIST");
  let channel = `${config.channelId}`;
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `${config.main.title}`,
      iconURL: `${config.main.iconURL}`,
      url: null,
    })
    .setDescription(`${config.main.Description}`)
    .setColor("Red")
    .setImage(`${config.main.image}`)
    .setFooter({
      text: `BROKEN BOT`,
      iconURL:
        "https://cdn.discordapp.com/attachments/1061277003044634757/1066488529431056474/icona.png",
    });
  const x = new ButtonBuilder()
    .setCustomId("buttonVerify")
    .setLabel(`${config.main.button_msg}`)
    .setEmoji(`${config.main.button_emoji}`)
    .setStyle(`${config.main.button_style}`);
  const row = new ActionRowBuilder().addComponents(x);
  const rawData = fs.readFileSync('id.json');
  const data = JSON.parse(rawData);
  const channels = await client.channels.fetch(config.channelId)

  if(!data.messageID){
    const message = await client.channels.cache
    .get(channel)
    .send({ embeds: [embed], components: [row] });
    data.messageID = message.id;
    const newData = JSON.stringify(data);
    fs.writeFileSync('id.json', newData);
  }else{
    try {
      const messages =  await channels.messages.fetch(data.messageID)
      messages.edit({ embeds: [embed], components: [row] })
    } catch (s) {
      data.messageID = '';
      const newData = JSON.stringify(data);
      fs.writeFileSync('id.json', newData);
      await client.channels.cache
    .get(channel)
    .send({ embeds: [embed], components: [row] });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  let channel = `${config.channelId_Log}`;
  if (interaction.isButton()) {
    if (interaction.customId == "buttonVerify") {
      let lel = new ModalBuilder()
        .setTitle(`${config.modals.title}`)
        .setCustomId("model_function");

      //DEBUG MODALS
      let steam_link = new TextInputBuilder()
        .setCustomId("steam_link")
        .setLabel("ลิงค์สตรีม".substring(0, 100))
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      let username_oc = new TextInputBuilder()
        .setCustomId("username_oc")
        .setLabel("ชื่อ OC ".substring(0, 45))
        .setStyle(TextInputStyle.Short);
      let username_ic = new TextInputBuilder()
        .setCustomId("username_ic")
        .setLabel("ชื่อ IC ".substring(0, 45))
        .setStyle(TextInputStyle.Short);

      let age_oc = new TextInputBuilder()
        .setCustomId("age_oc")
        .setLabel("อายุ OC IC".substring(0, 45))
        .setStyle(TextInputStyle.Paragraph);

      let facebook_ic = new TextInputBuilder()
        .setCustomId("facebook_ic")
        .setLabel("เฟส IC".substring(0, 45))
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      let row_all = new ActionRowBuilder().addComponents(steam_link);
      let row_all2 = new ActionRowBuilder().addComponents(username_oc);
      let row_all3 = new ActionRowBuilder().addComponents(age_oc);
      let row_all5 = new ActionRowBuilder().addComponents(username_ic);
      let row_all4 = new ActionRowBuilder().addComponents(facebook_ic);
      lel.addComponents(row_all, row_all2, row_all5, row_all3, row_all4);
      await interaction.showModal(lel);
    }

    // funtion confirm roles
    if (interaction.customId == "addRoles") {
      interaction.deferUpdate();
      const WhitelistRole = `${config.WhitelistRole}`;
      const m = interaction.message?.mentions.members.first();
      m.roles.add(WhitelistRole);

      const addRoles = new ButtonBuilder()
        .setCustomId("addRoles")
        .setLabel("✅ ยืนยัน")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true);

      const Cancel = new ButtonBuilder()
        .setCustomId("Cancel")
        .setLabel("❌ ยกเลืก")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true);
      const row = new ActionRowBuilder().addComponents(addRoles, Cancel);
      interaction.message.edit({
        components: [row],
      });
    }
    // funtion cancel roles
    if (interaction.customId == "Cancel") {
      //ปุ่มหาย
      interaction.message.edit({
        components: [],
      });
    }
  }
  if (interaction.isModalSubmit()) {
    try {
      const steam_link = interaction.fields.getTextInputValue("steam_link");
      const username_ic = interaction.fields.getTextInputValue("username_ic");
      const username_oc = interaction.fields.getTextInputValue("username_oc");
      const age_all = interaction.fields.getTextInputValue("age_oc");
      const facebook_ic = interaction.fields.getTextInputValue("facebook_ic");
      const m = interaction.member.user.username;
      console.log(m);
      let file = editJsonFile(`${process.cwd()}/config.json`);
      let data = file.get().data;
      let x = {
        ชื่อดิสคอร์ด: `${interaction.member.user.username}#${interaction.member.user.discriminator}`,
        สตรีมลิงค์: steam_link,
        "ชื่อ OC": username_oc,
        "ชื่อ IC": username_ic,
        "อายุ OC IC": age_all,
        "เฟส IC": facebook_ic,
      };
      data.push(x);
      file.set("data", data);
      file.save();

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${config.reply_submit.title}`,
          iconURL: `${config.reply_submit.iconURL}`,
          url: null,
        })
        .setDescription(
          `${config.reply_submit.Description} <@&${config.roleAdmin}> `
        )
        .setColor(`${config.reply_submit.colors}`)
        .setFooter({
          text: "BROKEN BOT",
          iconURL:
            "https://cdn.discordapp.com/attachments/1061277003044634757/1066488529431056474/icona.png",
        })
        .setTimestamp(Date.now());

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });

      const embedadmin = new EmbedBuilder()
        .setDescription(
          `** ข้อมูลทั้งหมด**\n
          **ดิสคอร์ดของผู้ส่ง**\n
          <@${interaction.member?.id}>\n
          ลิงค์สตรีม
          \`\`\`🔗 ${steam_link}\`\`\`
          ชื่อ OC IC
          \`\`\`👤 ${username_oc} & ${username_ic}\`\`\`
          อายุ OC IC
          \`\`\`👤 ${age_all}\`\`\`
          เฟส IC
          [ลิงค์เฟส](${facebook_ic})
        `
        )
        .setAuthor({
          name: `${config.reply_admin.title}`,
          iconURL: `${config.reply_admin.iconURL}`,
          url: null,
        })
        .setColor("Green")
        .setFooter({
          text: "BROKEN BOT",
          iconURL:
            "https://cdn.discordapp.com/attachments/1061277003044634757/1066488529431056474/icona.png",
        })
        .setTimestamp(Date.now());
      const addRoles = new ButtonBuilder()
        .setCustomId("addRoles")
        .setLabel("✅ ยืนยัน")
        .setStyle(ButtonStyle.Primary);

      const Cancel = new ButtonBuilder()
        .setCustomId("Cancel")
        .setLabel("❌ ยกเลืก")
        .setStyle(ButtonStyle.Danger);

      const rowx = new ActionRowBuilder().addComponents(addRoles, Cancel);

      interaction.guild.channels.cache.get(channel).send({
        content: `ส่งข้อมูลโดย: <@${interaction.member?.id}>`,
        embeds: [embedadmin],
        components: [rowx],
        ephemeral: true,
      });
    } catch (e) {
      console.log(e);
    }
  }
});

client.login(config.token);
