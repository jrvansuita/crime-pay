module.exports = Object.freeze({


    PRISON: {
        PAGE_TITLE: 'Welcome to Prison',
        DEFAULT_EXPLANATION: "Prison is a place for weak criminals, who didn't succeed and got caught by the cops. If you are arrested, pay your jail time and be released. Or try your luck bribing a jailer to let you go.",
        LIFE_IMPRISONMENT_EXPLANATION: 'You got for life prison. It was a pleasure to capture you and lock you in forever. The streets are at peace without you.',
        ARRESTED_TEXT: "You got arrested and will be released from prison ",
        NOT_ARRESTED_TEXT: "Enjoy your time out of prison. Be careful not to get caught and end up here.",
        FREE_MAN: "You are a free man!",
        GAME_OVER: "Looks like the game is over for you.",
        WAITING_FREE: "What are you waiting for? Get out of here!",
        TRY_ESCAPE: 'Why not try to escape?',
        SOME_GUY_HELP: 'Hi Buddy, I can help you get out from here!',
        ADDING_DAYS_JAIL: "Adding %s jail day when fail.",
        LOOKING_FOR: "What are you looking for?",
        CAN_TAKE_IT_EASY: "I can make it easy for you. Give me some coins.",
        GET_OUT_CHANCE: "%s% chance to get out.",
    },

    HOSPITAL: {
        PAGE_TITLE: 'The Hospital',
        DEFAULT_EXPLANATION: "If you arrived here, it's because you are in really bad health. At the Hospital you will find the best medical care to help you get health again.",
        INTOXICATED_TITLE: "You need Rehab Care!",
        INTOXICATED_TEXT: "Come with me to take some medicine and reduce your intoxication.",
        INTOXICATED_QUOTE: "%s% regenerate after medicine.",
    },

    ROBBERY: {
        PAGE_TITLE: 'Making a Robbery',
        DEFAULT_EXPLANATION: "Select a target and try your lucky! Each target places has a specific difficult and costs some amount of stamina. Try not to get caught by the police, otherwise you'll go straight to prison.",
        WATCHING_YOU: "I'm watching you!",
        PAYING_TIME_IN_PRISON: "You're paying your time in prison.",
        BEHAVE_YOURSELF: "Behave yourself and I'll leave you alone.",
        ACTION_BUTTON: 'Carry Out Theft',
        STAMINA_TOOLTIP: 'Recovery 1 point every hour.',
        INTOXICATION_TOOLTIP: 'Regenerate 1 point every hour.',
        USE_FULL_STAMINA: 'Use Full Stamina',
        SUCCESS: ["The heist was successful!", 'You were successful!'],
        FAIL: ["You're under arrest!", "You went to jail!", "The heist failed, you're in prison."],

    },

    CLUB: {
        PAGE_TITLE: 'Welcome to the Night Club',
        DEFAULT_EXPLANATION: "In the club everything is possible. Nobody cares for you. You can fuck some chicks or drug yourself until you good. Be careful, there are some fake and traitor hookers that can steal you coins or even take you to prison.",
        WANNA_TRY: "Wanna try %s?",
        CANT_FAIL: 'No chances to fail',
        FAIL_CHANCE: '%s% chance to fail',
        AND_ARREST_CHANCE: ' and %s% chance to go arrested',
        ACTION_BUTTON: 'Enjoy the Vibe',
    },

    PAGE_NOT_FOUND: {
        PAGE_TITLE: 'Page Not Found!',
        DEFAULT_EXPLANATION: "We can't find the page you are looking for.",
        EXTENSION: "This request url was not found on the server.",
        BUTTON_TEXT: 'Visit Home Page'
    },


    MARKET: {
        PAGE_TITLE: 'Welcome to the Dark Market',
        DEFAULT_EXPLANATION: 'Here you can find something to help you in your day-to-day life. Being a thief is tough, and you need buy some tools to make your life easy. Other thieves can also show up with some merchandise to sell in this area! ',
        WANNA_BUY: "Want to buy the %s?",
        ACTION_BUTTON: "Buy Now",
        MARKET_FROM_PLAYERS: 'Equipments from the Hood'

    },

    INVENTORY: {
        PAGE_TITLE: 'Your Inventory',
        DEFAULT_EXPLANATION: 'Here you have access to all your equipment. You can equip up to two weapons and three special items at the same time. It will became your thefts much easier and more profitable if you equip your bests inventory gears.'
            + " A non equipped item can be sold on the dark market without period restriction, and is automatic shown for other players who may have be interest for it.",

        EQUIP_TITLE: "You selected the %s",
        WANNA_SELL: "Want to sell the %s?",
        WEAPON_EQUIPPED: "Your equipped gears were updated!",
        EMPTY_TITLE: 'Empty Inventory',
        EMPTY_DESCRIPTION: "You don't have any weapon yet. Visit the market to buy one.",
        SELL_TEXT: "You can sell this item on the market. The hood is begging for new equipments!",
        SELLING_TEXT: "You are selling %s for %s coins. The price can be changed if you want.",
        EQUIP_TEXT: "Waiting what? Equip it now and enjoy the next easy thefts.",
        DROP_TEXT: "Drop it and you will be an easy prey for police.",
        DROP_TO_SELL: "You need to drop this item first to be able to sell it.",
    },

    HISTORIC: {
        PAGE_TITLE: 'Crime Historic',
        DEFAULT_EXPLANATION: 'Here you find the true criminal who you are. All your recent crime historic is shown here.',

        EVENT_TYPE: {
            1: ['You tried to rob a place.',
                'You attempted to make a robbery.',
                'You tried a robbery.',
                'You made a theft.',
                'You tried to stealing something'
            ],

            2: ['You tried to fuck hooker at the bar.',
                'You got horny by a pussy.',
                'You attempted to get a bitch at the club.',
                'The bitch bit you harder.',
                'You fucked a random hooker at the club.'
            ],

            3: ['You got drugged as fuck.',
                'You drugged yourself a lot.',
                'You got drunk or drugged.',
                'You attempted to get some drug at the club.',
                'You drugged yourself.'
            ],

            4: ['You bribed a jailer at the prison.'],
            5: ['You tried to escape from the prison.', 'You tried to escape with some dude from jail.'],
            6: ['You bought a new equipment on the market.'],
            7: ['You burned an equipment.'],
            8: ['Your equipment on the market got updated.', 'You updated your selling equipment'],
            9: ["You sold an equipment on the market."],

        }
    },

    SETTINGS: {

    }







});

