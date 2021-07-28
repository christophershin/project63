import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import AppHeader from './components/AppHeader';
import Constants from 'expo-constants';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '', 
      phonetics: '',
    };
  }
  
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  

  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.text1}> Search </Text>
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.word}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderRadius: 30,
    outline: 'none',
  },
    searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'orange',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Rockwell',
    fontSize: 20,
color:'black',
  },
});
