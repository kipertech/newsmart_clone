module.exports = {
    //Hard values
    ARTICLEMODAL: null,
    ARTICLESCENE: null,
    PROFILESCENE: null,

    //Settings
    vocabColor: '#FFBE40',
    vocabMouseDownColor: '#DB991A',
    grammarColor: '#77B83E',
    grammarMouseDownColor: '#53911C',
    compColor: 'rgb(66, 197, 212)',
    compMouseDownColor: '#269EAE',

    vocabPointUnderColor: 'rgb(255, 205, 108)',
    vocabPointUpperColor: 'rgb(250, 183, 52)',
    grammarPointUnderColor: 'rgb(138, 195, 89)',
    grammarPointUpperColor: 'rgb(119, 184, 62)',
    compPointUpperColor: 'rgb(105, 215, 223)',
    compPointUnderColor: 'rgb(66, 197, 212)',

    //User data
    USER_DATA:
    {
        BASIC_INFO:
        {
            NAME: 'Tan Nguyen',
            COUNTRY: 'Viet Nam',
            JOBTITLE: 'Developer',
            SHORTBIO: 'Love purple, like pink, introvert and often cry silently',
            EMAIL: 'tan.nguyen19596@gmail.com',
            PICTURE: require('./images/profile_pic.jpg')
        }
    },

    //DEMO DATA
    ARTICLES:
    [
        {
            ID: 'AF101',

            TITLE: `Twitter's Vine Shutdown Shows Split Between App’s Popularity, Profits`,

            ABSTRACT: 'Twitter on Thursday announced it was shutting down the popular looping-video app Vine, showing how difficult it is for an internet sesation to have staying power and turn a profit.',

            IMAGE: 'https://d34yfym6wfrgx6.cloudfront.net/uploads/article/custom_image/144308/super_large_MIT-Grad-Rankings_0.jpg',

            LEVEL: 3,

            OBJECTIVE: 'Pandora Level 4 (B2, TOEIC 551–668, TOEFL iBT 53–64, IELTS 5–6)',

            DESCRIPTION: `Double-click any word to translate`,

            TYPE: 'NORMAL',

            CATEGORY: 'Tech',

            CONTENT: `Just six months ago, Twitter Inc. called the looping-video app Vine one of its “foundational acquisitions.” On Thursday, the social-media company said it was shutting it down. \n Vine's demise shows how difficult it is for an internet sensation to have staying power and turn profit. \n The app rocketed to the top of the rankings in Apple's app store in early 2013 within weeks of its debut, resonating with young people who were drawn to the short, snappy format. The best of the site's six-second looping videos helped popularize new cultural memes such as “Damn Daniel” and “on fleek.” \n Vine quickly carved a path to fame for a group of artists and creators, some of whom have gone on to launch larger careers as digital influencers. They include King Bach, also known as Andrew Bachelor, who recently signed on for a sitcom in development by 21st Century Fox Inc. Others used their Vine popularity to land product placement and branded content deals. \n But Twitter was never able to fully capitalize on Vine's popularity, and over time the site lost out to competitors like Snap Inc.'s Snapchat, Facebook Inc., Instagram and Alphabet Inc.'s YouTube, The Wall Street Journal reported in May. \n Many top Viners, marketers and ad buyers abandoned the site, frustrated that it never implemented a sustainable advertising model. Dominant creators, such as Viral Nation clients Joey Purpdrank and Max Jr., shifted to making longer videos for YouTube, Facebook and other platforms that drew larger audiences and a chance to make money through advertising. The app was recently ranked 284 among free U.S. apps in the App Store, according to data tracker App Annie. \n “If Vine was housed inside a company that was growing at 30% a year…it would have survived,” said Scott Galloway, founder of consumer-brand research firm L2 Inc. and a marketing professor at New York University. For Twitter, “not growing its user base, a part-time CEO and disgruntled investors—all of that adds up to forced focus.” \n A Twitter spokesman wasn't immediately available for comment. Twitter announced the news on Thursday separate from its third-quarter earnings report, which included shrinking revenue growth and job cuts. \n Vine's co-founders instantly expressed remorse on Thursday. “Don't sell your company!” co-founder Rus Yusupov wrote on Twitter. Another co-founder, Dom Hofmann, wrote: “busting out the bourbon.” Mr. Yusupov left Twitter last year as part of a wave of layoffs. Mr. Hofmann left earlier. \n Some users took to Vine to spin the grim news into gags, with lip-sync tributes and comedic acts. There was also some resentment among users who built large followings, directing their anger at Twitter for failing to capitalize on Vine's former zeitgeist status. \n “Vine messed up — they let their top creators leave the app,” said Jason Nash, a comedian who got his start on Vine three years ago and has 2.7 million followers on the site. Still, Mr. Nash said he was grateful to Vine, which inspired him to create independent film “FML” about two social media celebrities trying to drum up more followers. “Weird how fast technology changes,” Mr. Nash said Thursday. “I guess I have my sequel.”`,

            DATE: 'October 28, 2016',

            AUTHOR: 'Deepa Seetharaman',

            STARRED: false,

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
                    QUESTIONCODE: 'O3'
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
                    POS: 127,
                    COUNT: 1,
                    TYPE: 'VOCAB',
                    QUESTIONCODE: 'O1'
                },

                {
                    POS: 211,
                    COUNT: 1,
                    TYPE: 'VOCAB',
                    QUESTIONCODE: 'O4'
                },

                {
                    POS: 325,
                    COUNT: 1,
                    TYPE: 'VOCAB',
                    QUESTIONCODE: 'O5'
                },

                {
                    POS: 357,
                    COUNT: 1,
                    TYPE: 'VOCAB',
                    QUESTIONCODE: 'O6'
                },

                {
                    POS: 453,
                    COUNT: 2,
                    TYPE: 'VOCAB',
                    QUESTIONCODE: 'O7'
                },

                {
                    POS: 500,
                    COUNT: 2,
                    TYPE: 'VOCAB',
                    QUESTIONCODE: 'O8'
                },

                {
                    POS: 513,
                    COUNT: 1,
                    TYPE: 'GRAMMAR',
                    QUESTIONCODE: 'D2'
                },
            ],
        },

        {
            ID: 'VF101',

            TITLE: `Samsung's Drive Toward Smarter Cars`,

            ABSTRACT: 'Samsung Electronics Co. makes a drive for control of the car, paying $8 billion for U.S. auto-parts supplier Harman International Industries.',

            IMAGE: 'http://blog.parapusula.com/content/userfiles/listitem/big/apple-ve-cin-li-teknoloji-sirketleri-samsung-u-caresiz-birakti-37m16.jpg',

            VIDEO: {uri: 'http://m.wsj.net/video/20161114/111416samsungharman/111416samsungharman_v2_ec664k.mp4'},

            LEVEL: 4,

            OBJECTIVE: 'Pandora Level 4 (B2, TOEIC 551–668, TOEFL iBT 53–64, IELTS 5–6)',

            DESCRIPTION: `Double-click any word to translate`,

            TYPE: 'VIDEO',

            CATEGORY: 'Tech',

            DATE: 'November 15, 2016',

            AUTHOR: 'Anonymous',

            STARRED: true,

            QUESTIONS: 
            [
                {
                    TYPE: 'SINGLECHOICE',
                    TYPE_QUESTION: 'COMP',
                    POINT: 3,
                    REQUIREMENT: 'Watch this part of the video: [00:00-00:45]. Then choose the correct answer.',
                    QUESTION: `Samsung plans to sell cars`,
                    ANSWERS:
                    [
                        "True",
                        "False"
                    ],
                    CORRECT_ANS: 2,
                    INFORM: `Samsung doesn't plan to sell cars, but to sell more components.`,

                    TIME_START: '00:00',
                    TIME_END: '00:45',

                    USER_ANSWERS: 2,
                    ANSWERED_DATE: null,
                    POINTS_EARNED: 3
                },
                {
                    TYPE: 'SINGLECHOICE',
                    TYPE_QUESTION: 'VOCAB',
                    POINT: 3,
                    REQUIREMENT: 'Watch this part of the video: [00:50-01:20]. Then choose the correct answer.',
                    QUESTION: `Harman is originally a _____`,
                    ANSWERS:
                    [
                        "Audio pioneer",
                        "Automative manufacturer",
                        "Software developer"
                    ],
                    CORRECT_ANS: 1,
                    INFORM: ``,

                    TIME_START: '00:50',
                    TIME_END: '01:20',

                    USER_ANSWERS: -1,
                    ANSWERED_DATE: null,
                    POINTS_EARNED: 0
                },
                {
                    TYPE: 'DRAGWORD',
                    TYPE_QUESTION: 'COMP',
                    POINT: 3,
                    REQUIREMENT: 'Watch this part of the video: [01:10-01:30]. Then tap the words to put them into the box.',
                    ANSWERS:
                    [
                        {
                            KEY: 1,
                            WORD: "'Net"
                        },
                        {
                            KEY: 2,
                            WORD: "profit'"
                        },
                        {
                            KEY: 3,
                            WORD: "is"
                        },
                        {
                            KEY: 4,
                            WORD: "profit"
                        },
                        {
                            KEY: 5,
                            WORD: "made"
                        },
                        {
                            KEY: 6,
                            WORD: "after"
                        },
                        {
                            KEY: 7,
                            WORD: "cost."
                        }
                    ],
                    INFORM: ``,
                    
                    TIME_START: '01:10',
                    TIME_END: '01:30',

                    USER_ANSWERS: [],
                    ANSWERED_DATE: '',
                    POINTS_EARNED: 0
                },
            ]
        }
    ],

    QUESTION_DATA:
    [
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O1',
            POINT: 2,
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
            POINTS_EARNED: 0
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O3',
            POINT: 1,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `A movie with "staying power" stays popular for a long time.`,
            ANSWERS:
            [
                "True",
                "False"
            ],
            CORRECT_ANS: 1,
            INFORM: `Staying power is the ability to keep going even when it might be difficult to do so.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O4',
            POINT: 1,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `If you abandon something, you ___.`,
            ANSWERS:
            [
                "embrace it",
                "give up on it"
            ],
            CORRECT_ANS: 2,
            INFORM: ``,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O5',
            POINT: 2,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `Why might your employees be disgruntled?`,
            ANSWERS:
            [
                "Because you've given them a pay rise.",
                "Because you've told them they need to work this weekend.",
                "Because they don't have enough qualifications."
            ],
            CORRECT_ANS: 2,
            INFORM: `If somebody is disgruntled, they are angry or unhappy about a situation that's bad for them.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O6',
            POINT: 2,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `Which word has a similar meaning to "shrink"?`,
            ANSWERS:
            [
                "analyze",
                "expand",
                "contract",
                "adjust"
            ],
            CORRECT_ANS: 4,
            INFORM: `The answer is "contract." If something shrinks or contracts, it gets smaller.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O7',
            POINT: 2,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `Which of these people has messed up?`,
            ANSWERS:
            [
                "Matt lands a new deal with a big client.",
                "Ange sets the wrong price on a product and sells it at a tiny margin.",
                "Clive gives a presentation and receives good feedback.",
            ],
            CORRECT_ANS: 2,
            INFORM: `Ange messed up because she made a serious mistake.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
        },
        {
            TYPE: 'SINGLECHOICE',
            TYPE_QUESTION: 'VOCAB',
            CODE: 'O8',
            POINT: 1,
            REQUIREMENT: 'Choose the correct answer',
            QUESTION: `An independent film is a film produced outside of the major film studio system.`,
            ANSWERS:
            [
                "True",
                "False"
            ],
            CORRECT_ANS: 1,
            INFORM: `Independent films are films produced mainly or completely outside of the major film studio system. They are usually made with lower budgets than major studio films.`,

            USER_ANSWERS: -1,
            ANSWERED_DATE: null,
            POINTS_EARNED: 0
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
            POINTS_EARNED: 0
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
            POINTS_EARNED: 0
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

            USER_ANSWERS: [1, 2, 3, 4, 5, 6],
            ANSWERED_DATE: '18/11/2016',
            POINTS_EARNED: 3
        },
        {
            TYPE: 'DRAGWORD',
            TYPE_QUESTION: 'GRAMMAR',
            CODE: 'D2',
            POINT: 5,
            REQUIREMENT: 'Tap the words to put them into the box, then drag them into the correct order.',
            ANSWERS:
            [
                {
                    KEY: 1,
                    WORD: "Sometimes"
                },
                {
                    KEY: 2,
                    WORD: "it"
                },
                {
                    KEY: 3,
                    WORD: "takes"
                },
                {
                    KEY: 4,
                    WORD: "us"
                },
                {
                    KEY: 5,
                    WORD: "no"
                },
                {
                    KEY: 6,
                    WORD: "time."
                }
            ],
            INFORM: `The correct answer is "Sometimes it takes us no time.".`,

            USER_ANSWERS: [],
            ANSWERED_DATE: '',
            POINTS_EARNED: 0
        },
    ],

    QUESTION_TEST:
    [
        {
            TYPE: 'SINGLECHOICE',
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: "Which headline goes with the picture?",
            IMAGE: require('./images/test_2.png'),
            ANSWERS:
            [
                "Global Firms Address Latin American Risk",
                "Facebook's Profit Surges on Mobile-Ad Growth",
                "Sony Forecasts $1.1 Billion Loss",
                "More People Pick Homes Over the Phone",
            ],
            CORRECT_ANS: 3,
            USER_ANSWERS: null,
        },
        {
            TYPE: 'SINGLECHOICE',
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: "Which headline goes with the picture?",
            ANSWERS:
            [
                "Formula One Boss Steps Aside",
                "How Busy Colleagues Spread Secondhand Stress",
                "Downtown Manhattan Penthouse Sells for $50.9 Million",
                "Apple Repurchases $14 Billion of Own Shares in 2 Weeks",
            ],
            CORRECT_ANS: 1,
            IMAGE: require('./images/test_3.png'),
            USER_ANSWERS: null,

        },
        {
            TYPE: 'SINGLECHOICE',
            REQUIREMENT: 'Choose the correct answer(s)',
            QUESTION: `The Nikkei and other Asian stock markets are likely to ____.`,
            ANSWERS:
            [
                "up",
                "rise",
                "jump",
                "start",
            ],
            CORRECT_ANS: 1,
            IMAGE: null,
            USER_ANSWERS: null,
        },
        {
            TYPE: 'SINGLECHOICE',
            REQUIREMENT: 'Choose the best word(s) to complete the sentence.',
            QUESTION: `People ___ to understand every word.`,
            ANSWERS:
            [
                "not",
                "not need",
                "don’t need",
                "need not",
            ],
            CORRECT_ANS: 2,
            IMAGE: null,
            USER_ANSWERS: null,
        },
        {
            TYPE: 'SINGLECHOICE',
            REQUIREMENT: 'Choose the best word to complete the sentence.',
            QUESTION: `Hackers _____ steal sensitive information.`,
            ANSWERS:
            [
                "want",
                "are",
                "can",
                "for"
            ],
            CORRECT_ANS: 3,
            IMAGE: null,
            USER_ANSWERS: null,
        },
        {
            TYPE: 'SINGLECHOICE',
            REQUIREMENT: 'Look at the chart. Choose the best word to complete the sentence.',
            QUESTION: `Cocoa products ____ an average 100-gram milk chocolate bar.`,
            ANSWERS:
            [
                " make up 31% of",
                "have increased by 31% in",
                "are not used in",
                "buy about 31% of"

            ],
            CORRECT_ANS: 2,
            IMAGE: require('./images/test_7.png'),
            USER_ANSWERS: null,
        },
    ]
}
