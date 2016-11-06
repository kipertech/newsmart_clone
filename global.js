module.exports = {
    //Hard values
    ARTICLEMODAL: null,

    //Settings
    vocabColor: '#FFBE40',
    vocabMouseDownColor: '#DB991A',
    grammarColor: '#77B83E',
    grammarMouseDownColor: '#53911C',

    //DEMO DATA
    DEMO_PARAGRAPH: "Vine quickly carved a path to fame for a group, of artists? and creators, some of whom have gone on to launch larger careers as digital influencers. They include King Bach, also known as Andrew Bachelor, who recently signed on for a sitcom in development by 21st Century Fox Inc. Others used their Vine popularity to land product placement and branded content deals.",

    WORDS_DATA:
    [
        {
            POS: 1,
            COUNT: 1,
            TYPE: 'VOCAB',
            QUESTIONCODE: 'O1'
        },

        {
            POS: 4,
            COUNT: 1,
            TYPE: 'GRAMMAR',
            QUESTIONCODE: 'M1'
        },

        {
            POS: 7,
            COUNT: 3,
            TYPE: 'VOCAB'
        },

        {
            POS: 14,
            COUNT: 3,
            TYPE: 'VOCAB'
        },

        {
            POS: 34,
            COUNT: 2,
            TYPE: 'GRAMMAR'
        },

        {
            POS: 60,
            COUNT: 1,
            TYPE: 'GRAMMAR'
        },

        {
            POS: 61,
            COUNT: 1,
            TYPE: 'VOCAB'
        },

    ],

    QUESTION_DATA:
    [
        {
            TYPE: 'SINGLECHOICE',
            CODE: 'O1',
            POINT: 5,
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: `If you're an "influencers" or "influential" on social media, _____.`,
            ANSWERS:
            [
                "you don't have any followers",
                "you have a lot of followers"
            ],
            CORRECT_ANS: 1,
            INFORM: `You "influence" (= have an effect on) how people behave and think.`
        },
        {
            TYPE: 'MULTIPLECHOICE',
            CODE: 'M1',
            POINT: 4,
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: "Which TWO of the following are NOT examples of social media?",
            ANSWERS:
            [
                "Facebook is just Facebook is just Facebook is just Facebook",
                "Twitter",
                "Microsoft",
                "Tumblr",
                "Google Chrome",
                "Flickr",
                "Facebook",
                "Twitter",
                "Microsoft",
                "Tumblr",
                "Google Chrome",
            ],
            CORRECT_ANS: [2, 4],
            INFORM: `Social media is a group of Internet-based...`
        }
    ]
}
