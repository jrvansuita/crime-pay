const types = {
    DOMESTIC: 0,
    MASK: 2,
    BLADED: 3,
    PISTOL: 4,
    SHOTGUN: 5,
    SUBMACHINE: 6,
    RIFFLE: 7,
    SNIPER: 8,
    FICTITIOUS: 9,
    BOMB: 10,
    WAR: 11,

}

const classes = {
    SPECIAL_ITEM: [
        types.DOMESTIC,
        types.MASK,
        types.BOMB,
    ],

    WEAPON: [
        types.BLADED,
        types.PISTOL,
        types.SHOTGUN,
        types.SUBMACHINE,
        types.RIFFLE,
        types.FICTITIOUS,
        types.FICTITIOUS,
        types.WAR,
    ]
}



module.exports = { Types: types, Classes: classes };