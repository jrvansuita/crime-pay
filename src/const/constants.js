module.exports = Object.freeze({
    THIEF_NOT_FOUND: "Thief not found!",
    OUT_OF_STAMINA: "You're out of stamina!",
    THIEF_ARRESTED: "You're under arrest!",
    THIEF_NOT_ARRESTED: "You're not arrested!",

    ROBBERY_SUCCESS: [
        "You are the best thief in the world!",
        "You got it so fast!",
        "It looked like child's play",
        "You could do it with eyes shut.",
        "Success is your last name.",
        "Someone give this guy a prize"
    ],
    ROBBERY_FAIL: [
        "Who do you think you are?",
        "You failed hard honey.",
        "Welcome to jail!",
        "You piece of shit.",
        "Have a nice time in prison.",
        "You are your family's shame."
    ],
    PRISON_ESCAPE_SUCCESS: ["You escaped from prison!", "You barely escaped!", "You are free!"],
    PRISON_ESCAPE_FAIL: ["It was a trap!", "You couldn't escape!", "The buddy left you alone."],
    PRISON_BRIBE_SUCCESS: ["The jailer became your partner.", "You are out!", "Run out of here!"],
});



Object.assign(Array.prototype, {
    randomOne() {
        return this[Math.floor(Math.random() * this.length)];
    }
});