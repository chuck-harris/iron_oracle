
const eris = require( 'eris' );
const config = require( './config.js' )();
const OracleList = require( './OracleList.js' );

const majorPlotTwists = require( './MajorPlotTwist.js' );

// create a Client instance with our bot token

const bot = new eris.Client( config.clientToken );

function rollDie( sides ) {
    return Math.floor( Math.random() * sides ) + 1;
}

async function respondToMessage( msg, response ) {
    try {
        await msg.channel.createMessage( response );
    }
    catch (e) {
        // There are various reasons why sending a message might fail. The API might time out or choke and return a
        // 5xx status, or the bot may not have the permission to send the message (403 status).
        console.warn( 'Failed to respond to mention.' );
        console.warn( e );
    }
}

// when the bot is connected and ready, log to console
bot.on( 'ready', () =>  {
    console.log( 'Connected and ready.' );
});

// Every time a message is sent anywhere the bot is present, this event will fire.
bot.on( 'messageCreate', async (msg) => {
    const botWasMentioned = msg.mentions.find( mentionedUser => mentionedUser.id === bot.user.id );

    if( botWasMentioned ) {
        await respondToMessage( msg, "I am listening." );
    }

    // don't respond to my own messages
    if( msg.author.username == "IronOracle" )
        return;

    let lowercaseMessage = msg.content.toLowerCase();
    console.log( lowercaseMessage );

    const tokens = lowercaseMessage.split( ' ' ).map( s => s.trim()).filter( s => s );
    const commandName = tokens[0];
    const args = tokens.slice( 1 );

    const command = commandForCommandName[commandName];
    if( command ) {
        await command.execute( msg, args );
    }
});

bot.on( 'error', err => {
    console.warn( err );
});

const commandForCommandName = {};

commandForCommandName['!help'] = {
    helpMessage: "This command explains how I can help you.",
    execute: async ( msg, args ) => {
        let helpMessage = "I am the Great and Powerful Oracle, and I know all!\n";

        Object.getOwnPropertyNames( commandForCommandName).forEach( commandName => {
            helpMessage += "**" + commandName + ":**\n";
            helpMessage += commandForCommandName[commandName].helpMessage + "\n";
        })

        await respondToMessage( msg, helpMessage );
    }
}

commandForCommandName['!roll'] = {

    helpMessage: "This command makes an Ironsworn roll with an action die and two challenge dice."
    + " Any modifiers can be listed on the line and they will be applied to the action die roll; e.g.,\n"
    + "  !roll +3 -1\n"
    + "will add three and subtract one from the roll. An arbitrary number of modifiers can be added.",

    execute: async ( msg, args ) => {
       let results = ['Miss', 'Weak Hit', 'Strong Hit'];

       let actionDie = rollDie( 6 );
       let challengeDie1 = rollDie( 10 );
       let challengeDie2 = rollDie( 10 );

       args.forEach( arg => {
          if( arg.startsWith( "+" ) || arg.startsWith( "-" )) {
              let modifier = ( parseInt( arg, 10 ) || 0 );
              actionDie += modifier;
          }
       });

       if( actionDie > 10 )
           actionDie = 10;

       let result = 0;
       if( actionDie > challengeDie1 )
           result++;
       if( actionDie > challengeDie2 )
           result++;

       let response = "Action die: [" + actionDie + "]  Challenge dice: [" + challengeDie1 + ":" + challengeDie2 + "]\nThat's a " + results[result] + "!";

       await respondToMessage( msg, response );
    }
};

commandForCommandName['!ask'] = {

    helpMessage: "This command allows you to consult me using one of my idea tables. You can ask me what I know, and"
    + "I'll share a list.",

    execute: async ( msg, args ) => {
        let lowercaseMessage = msg.content.toLowerCase();
        if (lowercaseMessage.includes("major plot twist")) {
            let result = majorPlotTwists.roll();
            await respondToMessage( msg, result);
        }
        else if( lowercaseMessage.includes( "what you know" )) {
            let response = "I know about:\n``` * major plot twists```";
            await respondToMessage( msg, response );
        }
        else {
            await respondToMessage( msg, "I don't know anything about that." );
        }
    }
};

bot.connect();
