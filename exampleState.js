let state = {
    gameId: "123456",
    activeCards: {
        p1: {
	  suit: "spades",
	  rank: "10",
	},
        p2: {
	  suit: "spades",
	  rank: "10",
	},
        p3: {
	  suit: "spades",
	  rank: "10",
	},
        p4: {
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
    hands: {
      p1: [
        {
	  "rank": null,
	  "suit": null
	},
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        }
      ],
      p2: [
        {
	  "rank": null,
	  "suit": null
	},
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        }
      ],
      p3: [
        {
	  "rank": null,
	  "suit": null
	},
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        },
        {
          "rank": null,
          "suit": null
        }
      ],
      p4: [
        {
	  "rank": "ace",
	  "suit": "clubs"
	},
        {
          "rank": "king",
          "suit": "diamonds"
        },
        {
          "rank": "king",
          "suit": "hearts"
        },
        {
          "rank": "queen",
          "suit": "clubs"
        },
        {
          "rank": "jack",
          "suit": "spades"
        }
      ],
    },
    kitty: [
      {
	rank: null,
        suit: null
      },
      {
	rank: null,
        suit: null
      },
      {
	rank: null,
        suit: null
      },
      {
	rank: 9,
        suit: "hearts"
      }
    ],
    dealer: 2,
}
