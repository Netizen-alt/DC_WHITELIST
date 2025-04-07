const { Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const editJsonFile = require("edit-json-file");
const config = require("./config");
const fs = require("fs");

const client = new Client({ intents: ["Guilds", "GuildMembers"] });

client.on("ready", setupInitialMessage);
client.on("interactionCreate", handleInteraction);

async function setupInitialMessage() {
  console.log("✅ BOT IS ONLINE");
  const channel = client.channels.cache.get(config.channelId);

  const embed = new EmbedBuilder()
    .setAuthor({ name: config.main.title, iconURL: config.main.iconURL })
    .setDescription(config.main.Description)
    .setColor("Red")
    .setImage(config.main.image)
    .setFooter({ text: "BROKEN BOT", iconURL: config.main.footerIcon });

  const verifyButton = new ButtonBuilder()
    .setCustomId("buttonVerify")
    .setLabel(config.main.button_msg)
    .setEmoji(config.main.button_emoji)
    .setStyle(config.main.button_style);

  const actionRow = new ActionRowBuilder().addComponents(verifyButton);

  let messageData = JSON.parse(fs.readFileSync("id.json"));

  try {
    const existingMessage = await channel.messages.fetch(messageData.messageID);
    existingMessage.edit({ embeds: [embed], components: [actionRow] });
  } catch (error) {
    const newMessage = await channel.send({ embeds: [embed], components: [actionRow] });
    messageData.messageID = newMessage.id;
    fs.writeFileSync("id.json", JSON.stringify(messageData));
  }
}

async function handleInteraction(interaction) {
  if (interaction.isButton()) return handleButtonInteraction(interaction);
  if (interaction.isModalSubmit()) return handleModalSubmission(interaction);
}

async function handleButtonInteraction(interaction) {
  switch (interaction.customId) {
    case "buttonVerify":
      return showVerifyModal(interaction);
    case "addRoles":
      return confirmRoles(interaction);
    case "Cancel":
      return cancelInteraction(interaction);
  }
}

async function showVerifyModal(interaction) {
  const modal = new ModalBuilder().setTitle(config.modals.title).setCustomId("model_function");

  modal.addComponents(
    createTextInput("steam_link", "ลิงค์สตรีม", true),
    createTextInput("username_oc", "ชื่อ OC"),
    createTextInput("username_ic", "ชื่อ IC"),
    createTextInput("age_oc", "อายุ OC IC"),
    createTextInput("facebook_ic", "เฟส IC")
  );

  await interaction.showModal(modal);
}

function createTextInput(customId, label, required = false) {
  return new ActionRowBuilder().addComponents(
    new TextInputBuilder().setCustomId(customId).setLabel(label).setStyle(TextInputStyle.Short).setRequired(required)
  );
}

async function confirmRoles(interaction) {
  await interaction.deferUpdate();
  const member = interaction.message?.mentions.members.first();
  if (member) member.roles.add(config.WhitelistRole);

  updateInteractionButtons(interaction, true);
}

async function cancelInteraction(interaction) {
  updateInteractionButtons(interaction, false, true);
}

function updateInteractionButtons(interaction, disableConfirm = false, remove = false) {
  if (remove) return interaction.message.edit({ components: [] });

  const confirmButton = new ButtonBuilder()
    .setCustomId("addRoles")
    .setLabel("✅ ยืนยัน")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(disableConfirm);

  const cancelButton = new ButtonBuilder()
    .setCustomId("Cancel")
    .setLabel("❌ ยกเลิก")
    .setStyle(ButtonStyle.Danger)
    .setDisabled(disableConfirm);

  const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

  interaction.message.edit({ components: [row] });
}

async function handleModalSubmission(interaction) {
  const submissionData = extractSubmissionData(interaction);
  saveSubmissionData(submissionData);

  await interaction.reply({
    embeds: [createUserReplyEmbed()],
    ephemeral: true,
  });

  sendAdminLog(interaction, submissionData);
}

function extractSubmissionData(interaction) {
  const fields = interaction.fields;
  return {
    ชื่อดิสคอร์ด: `${interaction.member.user.username}#${interaction.member.user.discriminator}`,
    สตรีมลิงค์: fields.getTextInputValue("steam_link"),
    "ชื่อ OC": fields.getTextInputValue("username_oc"),
    "ชื่อ IC": fields.getTextInputValue("username_ic"),
    "อายุ OC IC": fields.getTextInputValue("age_oc"),
    "เฟส IC": fields.getTextInputValue("facebook_ic"),
  };
}

function saveSubmissionData(data) {
  let file = editJsonFile("config.json");
  let existingData = file.get("data") || [];
  existingData.push(data);
  file.set("data", existingData).save();
}

function createUserReplyEmbed() {
  return new EmbedBuilder()
    .setAuthor({ name: config.reply_submit.title, iconURL: config.reply_submit.iconURL })
    .setDescription(`${config.reply_submit.Description} <@&${config.roleAdmin}>`)
    .setColor(config.reply_submit.colors)
    .setTimestamp();
}

function sendAdminLog(interaction, submissionData) {
  const logChannel = interaction.guild.channels.cache.get(config.channelId_Log);
  logChannel.send({
    content: `ส่งข้อมูลโดย: <@${interaction.member?.id}>`,
    embeds: [new EmbedBuilder()
      .setAuthor({ name: config.reply_admin.title, iconURL: config.reply_admin.iconURL })
      .setDescription(`**ข้อมูลผู้ส่ง:** <@${interaction.member?.id}>\n**ลิงค์สตรีม:** ${submissionData.สตรีมลิงค์}\n**ชื่อ OC & IC:** ${submissionData["ชื่อ OC"]} & ${submissionData["ชื่อ IC"]}\n**อายุ:** ${submissionData["อายุ OC IC"]}\n**เฟส IC:** [Link](${submissionData["เฟส IC"]})`)
      .setColor("Green")
      .setTimestamp()
    ],
    components: [new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("addRoles").setLabel("✅ ยืนยัน").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("Cancel").setLabel("❌ ยกเลิก").setStyle(ButtonStyle.Danger)
    )]
  });
}

client.login(config.token);
