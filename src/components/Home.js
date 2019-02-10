import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

var logo = require ('../img/logo.png');

class Home extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoImgContainer}>
          <Image style={styles.logoImg}
            source={logo}
          />
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.title}> Selecione o nível do jogo </Text>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Game', {level:'4'})}
          >
            <Text style={styles.buttonText}>Jogador VS Jogador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Game', {level:'1'})}
          >
            <Text style={styles.buttonText}>Fácil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Game', {level:'2'})}
          >
            <Text style={styles.buttonText}>Médio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Game', {level:'3'})}
          >
            <Text style={styles.buttonText}>Dificil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('About')}
          >
            <Text style={styles.buttonText}>Sobre</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
  },
  logoImgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImg: {
    width: 200,
    height: 200,
    marginTop: 20,
    resizeMode: 'contain'
  },
  optionsContainer: {
    flex: 2,
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'column',
    marginTop: '15%'
  },
  buttons: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    margin: 10,
    backgroundColor: "#007aff",
    paddingHorizontal: 30,
    paddingVertical: 1,
    borderRadius: 30
  },
  buttonText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '400',
    color: "#FFF",
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '400',
    color: "black",
  }
});