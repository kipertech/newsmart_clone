module.exports = {
    //Hard values
    ARTICLEMODAL: null,
    ARTICLESCENE: null,

    //Settings
    vocabColor: '#FFBE40',
    vocabMouseDownColor: '#DB991A',
    grammarColor: '#77B83E',
    grammarMouseDownColor: '#53911C',

    vocabPointUnderColor: 'rgb(255, 205, 108)',
    vocabPointUpperColor: 'rgb(250, 183, 52)',
    grammarPointUnderColor: 'rgb(138, 195, 89)',
    grammarPointUpperColor: 'rgb(119, 184, 62)',

    //DEMO DATA
    ARTICLE:
    {
        ID: 'AF101',

        TITLE: `Twitter's Vine Shutdown Shows Split Between App’s Popularity, Profits`,

        IMAGE: 'https://d34yfym6wfrgx6.cloudfront.net/uploads/article/custom_image/144308/super_large_MIT-Grad-Rankings_0.jpg',

        LEVEL: 3,

        OBJECTIVE: 'Pandora Level 4 (B2, TOEIC 551–668, TOEFL iBT 53–64, IELTS 5–6)',

        DESCRIPTION: `Double-click any word to translate`,

        TYPE: 'Tech',

        CONTENT: `Just six months ago, Twitter Inc. called the looping-video app Vine one of its “foundational acquisitions.” On Thursday, the social-media company said it was shutting it down. \n Vine's demise shows how difficult it is for an internet sensation to have staying power and turn profit. \n The app rocketed to the top of the rankings in Apple's app store in early 2013 within weeks of its debut, resonating with young people who were drawn to the short, snappy format. The best of the site's six-second looping videos helped popularize new cultural memes such as “Damn Daniel” and “on fleek.” \n Vine quickly carved a path to fame for a group of artists and creators, some of whom have gone on to launch larger careers as digital influencers. They include King Bach, also known as Andrew Bachelor, who recently signed on for a sitcom in development by 21st Century Fox Inc. Others used their Vine popularity to land product placement and branded content deals. \n But Twitter was never able to fully capitalize on Vine's popularity, and over time the site lost out to competitors like Snap Inc.'s Snapchat, Facebook Inc., Instagram and Alphabet Inc.'s YouTube, The Wall Street Journal reported in May. \n Many top Viners, marketers and ad buyers abandoned the site, frustrated that it never implemented a sustainable advertising model. Dominant creators, such as Viral Nation clients Joey Purpdrank and Max Jr., shifted to making longer videos for YouTube, Facebook and other platforms that drew larger audiences and a chance to make money through advertising. The app was recently ranked 284 among free U.S. apps in the App Store, according to data tracker App Annie. \n “If Vine was housed inside a company that was growing at 30% a year…it would have survived,” said Scott Galloway, founder of consumer-brand research firm L2 Inc. and a marketing professor at New York University. For Twitter, “not growing its user base, a part-time CEO and disgruntled investors—all of that adds up to forced focus.” \n A Twitter spokesman wasn't immediately available for comment. Twitter announced the news on Thursday separate from its third-quarter earnings report, which included shrinking revenue growth and job cuts. \n Vine's co-founders instantly expressed remorse on Thursday. “Don't sell your company!” co-founder Rus Yusupov wrote on Twitter. Another co-founder, Dom Hofmann, wrote: “busting out the bourbon.” Mr. Yusupov left Twitter last year as part of a wave of layoffs. Mr. Hofmann left earlier. \n Some users took to Vine to spin the grim news into gags, with lip-sync tributes and comedic acts. There was also some resentment among users who built large followings, directing their anger at Twitter for failing to capitalize on Vine's former zeitgeist status. \n “Vine messed up—they let their top creators leave the app,” said Jason Nash, a comedian who got his start on Vine three years ago and has 2.7 million followers on the site. Still, Mr. Nash said he was grateful to Vine, which inspired him to create independent film “FML” about two social media celebrities trying to drum up more followers. “Weird how fast technology changes,” Mr. Nash said Thursday. “I guess I have my sequel.”`,

        DATE: 'October 28, 2016',

        AUTHOR: 'Deepa Seetharaman',

        STARRED: false,

        CURVOCABPOINT: 0,
        CURGRAMMARPOINT: 0,

        WORDS_DATA:
        [
            {
                POS: 19,
                COUNT: 1,
                TYPE: 'VOCAB',
                QUESTIONCODE: 'M1'
            },

            {
                POS: 29,
                COUNT: 1,
                TYPE: 'VOCAB',
                QUESTIONCODE: 'M2'
            },

            {
                POS: 41,
                COUNT: 2,
                TYPE: 'VOCAB',
                QUESTIONCODE: 'O1'
            },

            {
                POS: 44,
                COUNT: 2,
                TYPE: 'VOCAB',
                QUESTIONCODE: 'M3'
            },

            {
                POS: 58,
                COUNT: 2,
                TYPE: 'VOCAB',
                QUESTIONCODE: 'O2'
            },

            {
                POS: 92,
                COUNT: 1,
                TYPE: 'VOCAB',
                QUESTIONCODE: 'O3'
            },

            {
                POS: 102,
                COUNT: 1,
                TYPE: 'GRAMMAR',
                QUESTIONCODE: 'D1'
            },

            {
                POS: 511,
                COUNT: 1,
                TYPE: 'GRAMMAR',
                QUESTIONCODE: 'D1'
            },
        ],
    },

    QUESTION_DATA:
    [
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O1',
            POINT: 5,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `If you're an "influencers" or "influential" on social media, _____.`,
            ANSWERS:
            [
                "you don't have any followers",
                "you have a lot of followers"
            ],
            CORRECT_ANS: 2,
            INFORM: `You "influence" (= have an effect on) how people behave and think.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: -1
        },
        {
            TYPE: 'MULTIPLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'M1',
            POINT: 4,
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: "Which TWO of the following are NOT examples of social media?",
            ANSWERS:
            [
                "Facebook",
                "Twitter",
                "Microsoft",
                "Tumblr",
                "Google Chrome",
                "Flickr"
            ],
            CORRECT_ANS: [3, 5],
            INFORM: `Social media is a group of Internet-based...`,

            USER_ANSWERS: [],
            ANSWERED_DATE: '',
            POINTS_EARNED: 0
        },
        {
            TYPE: 'MULTIPLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'M2',
            POINT: 3,
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: `Which TWO words have a similar meaning to "demise"?`,
            ANSWERS:
            [
                "restructuring",
                "collapse",
                "failure",
                "recovery",
            ],
            CORRECT_ANS: [1, 4],
            INFORM: `A demise is when someone dies or a business stops operating.`,

            USER_ANSWERS: [],
            ANSWERED_DATE: null,
            POINTS_EARNED: -1
        },
        {
            TYPE: 'MULTIPLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'M3',
            POINT: 2,
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: `Which phrases mean the same thing as "turn a profit"? Choose TWO.`,
            ANSWERS:
            [
                "make a profit",
                "report a profit",
                "share a profit",
                "earn a profit",
            ],
            CORRECT_ANS: [1, 4],
            INFORM: `"Turn a profit" means the same thing as make or earn a profit. They are all common collocations – words that are often used with the word "profit." \n "Report a profit" and "post a profit" both mean to officially say that you have made a profit.`,

            USER_ANSWERS: [1, 4],
            ANSWERED_DATE: '09/11/2016',
            POINTS_EARNED: 2
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O2',
            POINT: 3,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `Which of the following is usually NOT sold in an app store?`,
            ANSWERS:
            [
                "games",
                "cameras",
                "messaging programs",
                "music",
                "web browsers",
            ],
            CORRECT_ANS: 2,
            INFORM: `"App" is short for "application" or "application program," meaning a computer program that is designed for a particular purpose. App stores sell software and digital goods such as music, but do not usually sell hardware such as cameras.`,

            USER_ANSWERS: 2,
            ANSWERED_DATE: '09/11/2016',
            POINTS_EARNED: 3
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O3',
            POINT: 5,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `A meme is a person skilled in the art of acting without speech.`,
            ANSWERS:
            [
                "True",
                "False"
            ],
            CORRECT_ANS: 2,
            INFORM: `The answer is "False." In fact, a meme is an idea, behavior, or style that spreads from person to person within a particular culture.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: -1
        },
        {
            TYPE: 'DRAGWORD',
            TYPE_QUESTION: 'GRAMMAR',
            CODE: 'D1',
            POINT: 3,
            REQUIREMENT: 'Tap the words to put them into the box, then drag them into the correct order.',
            ANSWERS:
            [
                {
                    KEY: 1,
                    WORD: "Share"
                },
                {
                    KEY: 2,
                    WORD: "markets"
                },
                {
                    KEY: 3,
                    WORD: "have"
                },
                {
                    KEY: 4,
                    WORD: "risen"
                },
                {
                    KEY: 5,
                    WORD: "extremely"
                },
                {
                    KEY: 6,
                    WORD: "quickly."
                }
            ],
            INFORM: `Notice how the adverb "quickly" describes the verb "rise," and the adverb "extremely" shows us how quickly the prices rose.`,

            USER_ANSWERS: [],
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
        },
    ]
}
