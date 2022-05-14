let state = {
    gameId: "123456",
    activeCards: {
        self: {
	  suit: "spades",
	  rank: "10",
	},
        left: {
	  suit: "spades",
	  rank: "10",
	},
        partner: {
	  suit: "spades",
	  rank: "10",
	},
        right: {
	  suit: "spades",
	  rank: "10",
	},
    },
    trickCounts: {
        us: 0,
        them: 0,
    },
    gameScore: {
        us: 0,
        them:0,
    },
    actionOn: "1",
    trumpSuit: 'spades',
    actions: [
        {type: "play", options: ["Ad", "Kd", "Td", "2d"]}, 
        {type: "swap", options: ["Ad", "Kd", "Td", "2d"]}, 
        {type: "bid1", options: ["y", "n"]},
        {type: "bid2", options: ["y", "n"]},
        {type: "trump-suit-selection", options: ["hearts", "clubs", "spades", "diamonds"]},
    ],
    hand: ["Ad", "Kd", "Td", "2d"],
    topKitty: "Ad",
    dealer: "2",
}
