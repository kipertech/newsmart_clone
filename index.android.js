import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
const GLOBAL = require('./global');
import QuestionModal from './scenes/modal';

/* --- */
const words = GLOBAL.DEMO_PARAGRAPH.split(' ');
let st = Dimensions.get('window').width;
const wordsToHighlight = GLOBAL.WORDS_DATA;
var ignoreList = [];
/* --- */

export default class pandora extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            qCode: 'O1'
        };
    }

    //Render highlighted word
    renderHighlight(i, content, type, code)
    {
        const bColor = (type == 'GRAMMAR') ? 'rgb(221, 233, 209)' : 'rgb(252, 235, 197)'
        const uColor = (type == 'GRAMMAR') ? 'rgb(119, 184, 62)' : 'rgb(223, 150, 119)'

        //Detect if end of word has a special character to exclude it from being highlighted
        var tempChar = '', newContent = '';
        if (content.substring(content.length - 1).match(/[^a-zA-Z ]/g))
        {
            tempChar = content.substring(content.length - 1);
            newContent = content.substring(0, content.length - 1);
        }
        else 
        {
            tempChar = '';
            newContent = content;
        }
        
        //Highlight
        return (
            <View key={i} style={{ flexDirection: 'row' }}>

                {/* Actual highlighted word */}
                <TouchableHighlight                     
                    onPress={() => {
                        this.refs.qModal.open(code);
                    }}
                    style={{ backgroundColor: bColor, borderRadius: 5 }}
                    underlayColor={uColor}>

                    <View style={{ flexDirection: 'row' }}>                        
                        <Image 
                            source={require('./images/icon_undone.png')}
                            resizeMode='center'/>

                        <Text style={{ color: 'black' }}>{newContent}</Text>

                        <Image 
                            source={require('./images/icon_fake.png')}
                            resizeMode='center'/>
                    </View>

                </TouchableHighlight>

                {/* Special character at the end */}
                <Text>{tempChar}{' '}</Text>

            </View>
        )
    }

    //Render each word
    renderWord(word, i)
    {
        if (ignoreList.indexOf(i) > -1)
            return(null);

        //Search for phrase with multiple words
        for (var j = 0; j < wordsToHighlight.length; ++j)
        {
            if (wordsToHighlight[j].POS == i)
            {
                var tempWord = '';
                for (var c = i; c < i + wordsToHighlight[j].COUNT; ++c)
                {
                    //Put next word to ignore list, so that map() will skip this word
                    ignoreList.push(c);

                    //Pending all words together
                    if (tempWord != '')
                        tempWord = tempWord + ' ' + words[c];
                    else tempWord = words[c];
                };

                //return highlighted phrase/word
                return(this.renderHighlight(i, tempWord, wordsToHighlight[j].TYPE, wordsToHighlight[j].QUESTIONCODE));
            }
        }

        //else just return normal word
        return (<Text key={i}  onPress={() => console.log(this.state.qCode)}>{word} </Text>);
    }

    //Main render function
    render() 
    {
        return (
            <View style={{flex: 1}}>
                <View style={{ padding: 5, width: st, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                    {words.map((word, index) => this.renderWord(word, index))}
                </View>

                <QuestionModal ref='qModal'/>
            </View>
        );
    }
}

AppRegistry.registerComponent('pandora', () => pandora);
