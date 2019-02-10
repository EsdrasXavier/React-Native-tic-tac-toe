import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight
} from "react-native";


const PLAYER_TOKEN = 'X';
const CPU_TOKEN = 'O';

var fc = 0;
var called = false;

class Game extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'Game'),
      headerStyle: {
        backgroundColor: '#1D72F9',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff'
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      level: 4,// this.props.navigation.state.params.level || 1,
      turn: true, // True for Player and False for the CPU
      // gameTable: ['O', 'X', 'O', '', 'O', 'X', '', 'O', 'X'],
      gameTable: ['', '', '', '', '', '', '', '', ''],
      playerPoints: 0,
      player2Points: 0,
      cpuPoints: 0,
      playerVsPlayer: false
    }

    let level = this.state.level;
    let title = 'Nível de jogo ' + (level == 1 ? 'fácil' : (level == 2 ? 'médio' : (level == 3 ? 'difícil' : 'Player VS Player')));

    this.props.navigation.setParams({otherParam: title})


  }

  componentDidMount() {
    if (this.state.level >= 4 ) {
      this.setState({
        playerVsPlayer: true
      });
    }
  }

  resetGame() {
    let table = ['',, '', '', '', '', '', '', '', ''];

    this.setState({
      gameTable: table,
      turn: true
    })
  }


  checkForWinner(board, player) {

    if (
      (board[0] == player && board[1] == player && board[2] == player) || // First line
      (board[3] == player && board[4] == player && board[5] == player) || // Second line
      (board[6] == player && board[7] == player && board[8] == player) || // Third line
      (board[0] == player && board[3] == player && board[6] == player) || // First column
      (board[1] == player && board[4] == player && board[7] == player) || // Second column
      (board[2] == player && board[5] == player && board[8] == player) || // Third column
      (board[0] == player && board[4] == player && board[8] == player) || // Left to right \
      (board[2] == player && board[4] == player && board[6] == player) // Right to Left /
    ) {
      return true;
    }

    return false;
  }


  emptyIndexes(board) {
    let arrIndexes = [];
    board.forEach((e, index) => {
      if (e != PLAYER_TOKEN && e != CPU_TOKEN) arrIndexes.push(index);
    });
    return arrIndexes;
  }

  miniMax(newBoard, player) {
    var emptySpots = this.emptyIndexes(newBoard);
    fc++;
    if (fc > 20) {
      fc = 0;
      return {  score: 0}
    }

    console.log(`Board: ${newBoard}`);
    console.log(`EmptySpots: ${emptySpots}`)

    if (this.checkForWinner(newBoard, PLAYER_TOKEN)) {
      console.log(`PLayer Ganhou`);
      return { score: -10 };
    } else if (this.checkForWinner(newBoard, CPU_TOKEN)) {
      console.log(`CPU Ganhou`);
      return { score: 10 };
    } else if (emptySpots.length === 0) {
      console.log('Empate')
      return { score: 0 };
    }

    var moves = [];

    for (var i = 0; i < emptySpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      let index = emptySpots[i];
      move.index = index;

      // set the empty spot to the current player
      newBoard[index] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == CPU_TOKEN) {
        var result = this.miniMax(newBoard, PLAYER_TOKEN);
        move.score = result.score;
      }
      else{
        var result = this.miniMax(newBoard, CPU_TOKEN);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[index] = move.index;

      // push the object to the array
      moves.push(move);
    }


    var bestMove;

    if (player === CPU_TOKEN) {
      let bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }



  makeMove(x) {

    let table = this.state.gameTable;
    let turn = this.state.turn;
    let player = PLAYER_TOKEN;

    console.log('turn: ' + turn)

    if (table[x] === PLAYER_TOKEN || table[x] == CPU_TOKEN) {
      console.log('Ocupado..')
      return ;
    }

    if (!turn) player = CPU_TOKEN;

    turn = !turn;
    table[x] = player;

    this.setState({
      gameTable: table,
      turn: turn
    })

    let msg = '';

    if (this.checkForWinner(table, PLAYER_TOKEN)) {
      msg = 'Player ganhou';
      this.setState({
        playerPoints: this.state.playerPoints + 1,
      })
    } else if (this.checkForWinner(table, CPU_TOKEN)) {
      msg = 'CPU Ganhou';
      if (this.state.playerVsPlayer) msg = 'Player 2 ganhou!'
      this.setState({
        player2Points: this.state.player2Points + 1,
        cpu2Points: this.state.cpu2Points + 1,
      })
    } else if (this.emptyIndexes(table).length === 0) {
      msg = 'Empate :('
    }

    if (msg) {
      Alert.alert(
        'Fim de jogo!',
        msg,
        [
          {
            text: 'Ok',
            onPress: () => this.resetGame(),
            style: 'cancel',
          },
          // {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }


    // if (!turn) {
    //   var test = this.miniMax(table, CPU_TOKEN)
    //   this.makeMove(test);
    //   console.log(test)
    // }
  }

  buttonField(x) {
    return (
      <TouchableHighlight
        underlayColor={'#237BFF'}
        activeOpacity={0.5}
        onPress={() => this.makeMove(x)}
        style={styles.square}
        data='1'
      >
        <Text style={styles.symbol}>{this.state.gameTable[x]}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreTitle}> Pontuação </Text>
        <View style={styles.score}>
          <Text style={[styles.player, {left: 0, position: 'absolute'}]}>
            Jogador 1: {this.state.playerPoints}
          </Text>

          {this.state.playerVsPlayer ? (
            <Text style={[styles.player, {right: 0, position: 'absolute'}]}> Jogador 2: {this.state.player2Points} </Text>
          ) : (
            <Text style={[styles.player, {right: 0, position: 'absolute'}]}> CPU: {this.state.cpuPoints} </Text>
          )}

        </View>

        <View style={styles.gameContainer}>
          <View style={styles.gameRow}>
            {this.buttonField(0)}
            {this.buttonField(1)}
            {this.buttonField(2)}
          </View>
          <View style={styles.gameRow}>
            {this.buttonField(3)}
            {this.buttonField(4)}
            {this.buttonField(5)}
          </View>
          <View style={styles.gameRow}>
            {this.buttonField(6)}
            {this.buttonField(7)}
            {this.buttonField(8)}
          </View>
        </View>
      </View>
    );
  }
}
export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    padding: '12%',
    paddingTop: '10%'
  },
  gameContainer: {
    flex: 2,
    backgroundColor: 'gray',
    width: '100%',
    height: '100%',
  },
  gameRow: {
    flex: 1,
    flexDirection: 'row',
  },
  square: {
    flex: 2,
    width: '33%',
    height: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontFamily: 'Roboto',
    fontSize: 80,
    marginBottom: 20,
    // fontWeight: 'bold',
    color: '#000'
  },
  score: {
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreTitle: {
    fontSize: 40,
    margin: '1%',
    fontFamily: 'Roboto',
    color: '#000'
  },
  player: {
    fontSize: 20,
    margin: '1%',
    fontFamily: 'Roboto',
  }
});