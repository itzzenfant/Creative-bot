const Discord = require('discord.js')
const transcript = require("discord-html-transcripts")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, collector } = require("discord.js")
 
module.exports = async (enfant, interaction, message, channel) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
      
      let entry = interaction.options.getFocused()

      if(interaction.commandName === "command") {

        let choices = enfant.commands.filter(cmd => cmd.name.includes(entry))
        await interaction.respond(entry === "" ? enfant.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name}))) 
      }
  }
 
    if (interaction.isCommand()) {
        let command = require(`../Commands/${interaction.commandName}`);
        command.run(enfant, interaction, interaction.options, enfant.db);
    }

    if(interaction.isButton()) {
      if(interaction.customId === 'dem') {

        let demandee = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`Bonjour l'équipe du staff ${interaction.user} a fait une demande de creation d'un salon`)
          
        await interaction.reply({content: "**votre demande a etais envoie avec succès !**", ephemeral: true})
        enfant.channels.cache.get("1030821311750078504").send({ embeds: [demandee]})
      }
    }

    
    if(interaction.isButton()) {
      if(interaction.customId === "hallo") {
        let Reponce = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

      await interaction.reply({embeds: [Reponce]});
      }
  }

    /*-----------------------------------------------------------------------ticket--------------------------------------------------------------------------------------------*/ 
    if(interaction.isButton()) {
      if(interaction.customId === "close") {
        let EmbedPermissionClose3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose3], ephemeral: true})

        let EmbedCloseTicket3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)
        let Button3 = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
          .setCustomId('oui')
          .setLabel("Oui")
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setCustomId('non')
          .setLabel("Non")
          .setStyle(ButtonStyle.Danger),
        );
        await interaction.reply({embeds: [EmbedCloseTicket3], components: [Button3]});
      }
      else if(interaction.customId === "oui") {
        let EmbedPermissionClose3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose3], ephemeral: true})

        interaction.channel.delete();
      }
      else if(interaction.customId === "non") {
        let EmbedPermissionClose3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose3], ephemeral: true})

        interaction.message.delete()
      }
      else if(interaction.customId === "transcript") {

        let EmbedSendTranscript3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`✅ Transcript envoyé avec succès !`)
        let EmbedTranscript3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`📑 Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)
        let EmbedPermissionTranscript3 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionTranscript3], ephemeral: true})

        await interaction.deferReply({ ephemeral: true })
        await enfant.channels.cache.get("1018153625731727421")/*salon pour resevoir le transcript*/.send( {embeds: [EmbedTranscript3], files: [await transcript.createTranscript(interaction.channel)]})
        await interaction.editReply({embeds: [EmbedSendTranscript3], ephemeral: true})
      }
  }

  if(interaction.isSelectMenu()) {
      if(interaction.customId === 'menuticket') {
        if(interaction.values == 'part') {

          let channelss = await interaction.guild.channels.create({
          parent: "1026194569869656145",/*cathegory pour envoier le ticket*/
          name: `partenariat-${interaction.user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionFlagsBits.ViewChannel],
            },
            {
              id: interaction.user,
              allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
            },
          ],
          });

          let EmbedCreateChannel3 = new EmbedBuilder()
          .setColor(enfant.color)
          .setTitle('Ticket ouvert')
          .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre serveur !")
          .setTimestamp()
          .setFooter({ text: `${enfant.user.username}`, iconURL: enfant.user.displayAvatarURL({dynamic: true}) });
          const Row = new ActionRowBuilder()
              .addComponents(new ButtonBuilder()
              .setCustomId('close')
              .setLabel('Fermer le ticket')
              .setEmoji('🗑️')
              .setStyle(ButtonStyle.Danger),
              new ButtonBuilder()
              .setCustomId('transcript')
              .setLabel('Demander le transcript')
              .setEmoji('📑')
              .setStyle(ButtonStyle.Primary),
              );


          await channelss.send({embeds: [EmbedCreateChannel3], components: [Row]})

          const EmbedSuccessCreateChannel3 = new EmbedBuilder()
            .setColor(enfant.color)
            .setDescription(`✅ Votre salon a été créé avec succès ${channelss} !`)

          await interaction.reply({embeds: [EmbedSuccessCreateChannel3], ephemeral: true})
        }
      }

    if(interaction.isButton()) {
      if(interaction.customId === "close") {
        let EmbedPermissionClose2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)
   
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose2], ephemeral: true})
   
        let EmbedCloseTicket2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)
        let Button = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
          .setCustomId('oui')
          .setLabel("Oui")
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setCustomId('non')
          .setLabel("Non")
          .setStyle(ButtonStyle.Danger),
        );
        await interaction.reply({embeds: [EmbedCloseTicket2], components: [Button]});
      }
      else if(interaction.customId === "oui") {
        let EmbedPermissionClose2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)
   
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose2], ephemeral: true})
   
        interaction.channel.delete();
      }
      else if(interaction.customId === "non") {
        let EmbedPermissionClose2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)
   
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose2], ephemeral: true})
   
        interaction.message.delete()
      }
      else if(interaction.customId === "transcript") {
   
        let EmbedSendTranscript2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`✅ Transcript envoyé avec succès !`)
        let EmbedTranscript2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`📑 Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)
        let EmbedPermissionTranscript2 = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)
   
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionTranscript2], ephemeral: true})
   
        await interaction.deferReply({ ephemeral: true })
        await enfant.channels.cache.get("1018153625731727421").send( {embeds: [EmbedTranscript2], files: [await transcript.createTranscript(interaction.channel)]})
        await interaction.editReply({embeds: [EmbedSendTranscript2], ephemeral: true})
      }
  }
   
  if(interaction.isSelectMenu()) {
      if(interaction.customId === 'menuticket') {
        if(interaction.values == 'boost') {
   
          let channels = await interaction.guild.channels.create({
          parent: "1026194569869656145",
          name: `boost-${interaction.user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionFlagsBits.ViewChannel],
            },
            {
              id: interaction.user,
              allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
             },
          ],
          });
   
          let EmbedCreateChannel2 = new EmbedBuilder()
          .setColor(enfant.color)
          .setTitle('Ticket ouvert')
          .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nAlors comme sa on boost notre serv !")
          .setTimestamp()
          .setFooter({ text: `${enfant.user.username}`, iconURL: enfant.user.displayAvatarURL({dynamic: true}) });
          const Row2 = new ActionRowBuilder()
              .addComponents(new ButtonBuilder()
              .setCustomId('close')
              .setLabel('Fermer le ticket')
              .setEmoji('🗑️')
              .setStyle(ButtonStyle.Danger),
              new ButtonBuilder()
              .setCustomId('transcript')
              .setLabel('Demander le transcript')
              .setEmoji('📑')
              .setStyle(ButtonStyle.Primary),
              );
  
   
          await channels.send({embeds: [EmbedCreateChannel2], components: [Row2]})
   
          const EmbedSuccessCreateChannel2 = new EmbedBuilder()
            .setColor(enfant.color)
            .setDescription(`✅ Votre salon a été créé avec succès ${channels} !`)
   
          await interaction.reply({embeds: [EmbedSuccessCreateChannel2], ephemeral: true})
        }
      }

      if(interaction.isButton()) {
        if(interaction.customId === "close") {
          let EmbedPermissionClose = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
 
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose], ephemeral: true})
 
          let EmbedCloseTicket = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)
          let Button = new ActionRowBuilder()
          .addComponents(new ButtonBuilder()
            .setCustomId('oui')
            .setLabel("Oui")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setCustomId('non')
            .setLabel("Non")
            .setStyle(ButtonStyle.Danger),
          );
          await interaction.reply({embeds: [EmbedCloseTicket], components: [Button]});
        }
        else if(interaction.customId === "oui") {
          let EmbedPermissionClose = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
 
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose], ephemeral: true})
 
          interaction.channel.delete();
        }
        else if(interaction.customId === "non") {
          let EmbedPermissionClose = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
 
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionClose], ephemeral: true})
 
          interaction.message.delete()
        }
        else if(interaction.customId === "transcript") {
 
          let EmbedSendTranscript = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`✅ Transcript envoyé avec succès !`)
          let EmbedTranscript = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`📑 Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)
          let EmbedPermissionTranscript = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`❌ Vous n'avez pas la permission requise !`)
 
          if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionTranscript], ephemeral: true})
 
          await interaction.deferReply({ ephemeral: true })
          await enfant.channels.cache.get("1018153625731727421").send( {embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)]})
          await interaction.editReply({embeds: [EmbedSendTranscript], ephemeral: true})
        }
    }
 
    if(interaction.isSelectMenu()) {
        if(interaction.customId === 'menuticket') {
          if(interaction.values == 'help') {
 
            let channel = await interaction.guild.channels.create({
            parent: "1026194569869656145",
            name: `help-${interaction.user.username}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [Discord.PermissionFlagsBits.ViewChannel],
              },
              {
                id: interaction.user,
                allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
              },
            ],
            });
 
            let EmbedCreateChannel = new EmbedBuilder()
            .setColor(enfant.color)
            .setTitle('Ticket ouvert')
            .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre problème !")
            .setTimestamp()
            .setFooter({ text: `${enfant.user.username}`, iconURL: enfant.user.displayAvatarURL({dynamic: true}) });
            const Row = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                .setCustomId('close')
                .setLabel('Fermer le ticket')
                .setEmoji('🗑️')
                .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                .setCustomId('transcript')
                .setLabel('Demander le transcript')
                .setEmoji('📑')
                .setStyle(ButtonStyle.Primary),
                );

 
            await channel.send({embeds: [EmbedCreateChannel], components: [Row]})
 
            const EmbedSuccessCreateChannel = new EmbedBuilder()
              .setColor(enfant.color)
              .setDescription(`✅ Votre salon a été créé avec succès ${channel} !`)
 
            await interaction.reply({embeds: [EmbedSuccessCreateChannel], ephemeral: true})

          }
        }


 /* ------------------------------------------------------fin ticket---------------------------------------------------------------------*/

 /* ------------------------------------------------------création de forum---------------------------------------------------------------------*/
    if(interaction.isButton()) {
      if(interaction.customId === 'boutton') {

        let noperm = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [noperm], ephemeral: true})

          let forum = await interaction.guild.channels.create({
          name: `forum-${interaction.user.username}`,
          type: ChannelType.GuildForum,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionFlagsBits.ViewChannel],
            },
            {
              id: interaction.user,
              allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel], 
            },
          ],
          });

          const forumcreate = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`✅ Votre forum a été créé avec succès ${forum} !`)

        await interaction.reply({embeds: [forumcreate], ephemeral: true})
        }
      }
      


     /*const nop = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription("pas le permission")

      /*const forumsucces = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`✅ Votre forum a été créé avec succès ${forum} !`)*/

    /*await interaction.reply({embeds: [nop], ephemeral: true})*/

 /* ------------------------------------------------------fin forum---------------------------------------------------------------------*/

 /**--------------------------------------------------------------autorole------------------------------------------------------------------- */

 if(interaction.isSelectMenu()) {
  if(interaction.customId === 'autorole') {
    if(interaction.values == 'annonce') {
      
      interaction.member.roles.add("1028321398642442281")
      interaction.member.roles.add("1028321236117373059")

      const roleannonce = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`✅ Le role annonce à étais donnée avec succès !`)

      await interaction.reply({embeds: [roleannonce], ephemeral: true})
    }
  }
}

if(interaction.isSelectMenu()) {
  if(interaction.customId === 'autorole') {
    if(interaction.values == 'part') {
      
      interaction.member.roles.add("1032305143267463268")
      interaction.member.roles.add("1028321236117373059")

      const rolepart = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`✅ Le role partenariat à étais donnée avec succès !`)

      await interaction.reply({embeds: [rolepart], ephemeral: true})
    }
  }
}

if(interaction.isSelectMenu()) {
  if(interaction.customId === 'autorole') {
    if(interaction.values == 'give') {
      
      interaction.member.roles.add("1032304629356183655")
      interaction.member.roles.add("1028321236117373059")

      const rolegive = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`✅ Le role giveaway à étais donnée avec succès !`)

      await interaction.reply({embeds: [rolegive], ephemeral: true})
    }
  }
}

 /**-----------------------------------------------------------fin autorole---------------------------------------------------------------------- */

    if(interaction.isSelectMenu()) {
      if(interaction.customId === 'test') {
        if(interaction.values == 'test') {
          
          interaction.reply("l'interaction test a etais choisie")
        }
      }
    }

    if(interaction.isSelectMenu()) {
      if(interaction.customId === 'dem') {
          
          interaction.reply("**Vous avez demande un channel merci d'attendre une reponce**")
      }
    }

    if(interaction.isButton()) {
      if(interaction.customId === 'forum') {
      let threaddelete = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`❌ Vous n'avez pas la permission requise !`)

      /*let oauthor = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`❌ Vous n'ete pas l'auteur du message !`)*/

      if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [threaddelete], ephemeral: true})

      /*if(!interaction.author) return interaction.reply({embeds: [oauthor], ephemeral: true})*/

      interaction.channel.delete();
      }
    }

    if(interaction.isButton()) {
      if(interaction.customId === 'sup') {
      let supp = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`❌ Vous n'avez pas la permission requise !`)

      /*let oauthor = new EmbedBuilder()
      .setColor(enfant.color)
      .setDescription(`❌ Vous n'ete pas l'auteur du message !`)*/

      if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [supp], ephemeral: true})

      /*if(!interaction.author) return interaction.reply({embeds: [oauthor], ephemeral: true})*/

      interaction.channel.delete();
      }
    }

    if(interaction.isSelectMenu()) {
      if(interaction.customId === 'test') {
        if(interaction.values == 'enfant') {

          let enfant2 = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`**C'est un enfant de modération avec un peu de fun. Des mises a jour arrive tres vites !**`)

          await interaction.reply({embeds: [enfant2], ephemeral: true})
        }
      }
    }

    if(interaction.isSelectMenu()) {
      if(interaction.customId === 'test') {
        if(interaction.values == 'part') {

          let partt = new EmbedBuilder()
          .setColor(enfant.color)
          .setTitle("**<:DiscordPartner:1028001171379589300> Les partenariat**")
          .setDescription(`Le serveur n'a pas encor de partenariat. Ils ce trouverons ici : <#1026356880374767638> !`)
          .setTimestamp()

          await interaction.reply({embeds: [partt], ephemeral: true})
        }
      }
    }

    if(interaction.isButton()) { 
      if(interaction.customId === "reglemet") {
        interaction.member.roles.add("1018145951187206254")

        const regleme = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`✅ Le reglement à étais accepter avec succès !`)


      await interaction.reply({embeds: [regleme], ephemeral: true})
      }
    }

    if(interaction.isSelectMenu()) {
      if(interaction.customId === 'menuticket') {
        if(interaction.values == 'stop') {

          let stop = new EmbedBuilder()
          .setColor(enfant.color)
          .setDescription(`**Vous anuler la creation d'un ticket.**`)

          await interaction.reply({embeds: [stop], ephemeral: true})
        }
      }
    }

    if(interaction.isButton()) {
      if(interaction.customId === 'salut') {
          
          interaction.reply(`<:Discord_Mention:1023495008323645462> **${interaction.member} vous souhaite la bienvenue**`)
        }
      }
    }

    /*-------------------------------------------------*/

    if(interaction.isCommand()) { 
      if(interaction.customId === "giveaway") {
        interaction.member.roles.add("1028321398642442281")

        const regleme = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`✅ Le role giveaway a etais ajouter avec succès !`)


      await interaction.reply({embeds: [regleme], ephemeral: true})
      }
    }




  //-------------------------------------------------------------sinix dev-----------------------------------------------------------------


  if(interaction.isButton()) {
    if(interaction.customId === 'sug') {

        let thread = await interaction.channel.threads.create({
        type: ChannelType.PublicThread,})
        console.log(`Created thread: ${thread}`);

        const threadcreate = new EmbedBuilder()
        .setColor(enfant.color)
        .setDescription(`✅ Votre thread a été créé avec succès ${thread} !`)

      await interaction.reply({embeds: [threadcreate], ephemeral: true})
      }
    }
    }
  }
  
  }


//-------------------------------------------------------------ticket boost------------------------------------------------------------------------------------------------------