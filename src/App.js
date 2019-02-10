/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from "./components/Home";
import Game from "./components/Game"
import About from "./components/About"

const RootStack = createStackNavigator({
  Home: { screen: Home },
  Game: { screen: Game },
  About: { screen: About }
});

const App = createAppContainer(RootStack);

export default App;
