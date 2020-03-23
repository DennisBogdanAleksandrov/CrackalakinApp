import React, { useEffect, useContext } from 'react'
import { View, Dimensions } from 'react-native'
import { VerticallyAlign, AlignContent, SettingsView, SettingsItemsText, StandardText, BottomRow, CountText, SettingsItems, StartingCountdownView } from '../styles/stylesMatchingGame'
import GridOfPrettyBoxes from '../components/GridOfPrettyBoxes'
import { MiscRow } from '../components/MiscRow'
import { MatchingGameContext } from '../context/ContextMatchingGame'
import { NEW_GAME, GAME_OVER, ROUND_OVER } from '../actionsTypes/types'
import { connect, useDispatch } from 'react-redux'

const width = Math.round(Dimensions.get('window').width);

export const GameScreen = ({ navigation, pairOfNumbers, cubesLeft, score, playGame, round, startCountdown, prettyBoxProperties }) => {
  const { setCurrentScreenOtherThanGame, toggleSettingsModal, setToggleSettingsModal } = useContext(MatchingGameContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (cubesLeft === 0) {
      dispatch({ type: ROUND_OVER })
    }
  }, [cubesLeft])

  useEffect(() => {
    if (playGame === true) {
      dispatch({ type: NEW_GAME })
    }
  }, [playGame])

  const handlerOnPressRestart = () => {
    dispatch({ type: NEW_GAME })
    setToggleSettingsModal(false)
  }


  const handleOnPressQuit = () => {
    navigation.navigate('Menu')
    dispatch({ type: NEW_GAME })
    dispatch({ type: GAME_OVER })
    setCurrentScreenOtherThanGame(true)
    setToggleSettingsModal(false)
  }



  return (
    <View style={{ flex: 1 }}>
      <AlignContent>
        <View>
          <MiscRow navigation={navigation} setToggleSettingsModal={setToggleSettingsModal} />
          <VerticallyAlign style={{ height: width * 1.33 }}>
            <GridOfPrettyBoxes pairOfNumbers={pairOfNumbers} />
          </VerticallyAlign>
          <BottomRow>
            <View>
              <CountText>{round}</CountText>
              <StandardText>ROUND</StandardText>
            </View>
            <CountText>{score}</CountText>
          </BottomRow>
        </View>
      </AlignContent>
      {startCountdown >= 0 ?
        <StartingCountdownView><StandardText>{startCountdown}</StandardText></StartingCountdownView>
        : null
      }
      {toggleSettingsModal ?
        <SettingsView>
          <SettingsItems onPress={handlerOnPressRestart}><SettingsItemsText>Restart</SettingsItemsText></SettingsItems>
          <SettingsItems onPress={handleOnPressQuit}><SettingsItemsText>Quit</SettingsItemsText></SettingsItems>
          <SettingsItems onPress={() => setToggleSettingsModal(false)}><SettingsItemsText>Cancel</SettingsItemsText></SettingsItems>
        </SettingsView>
        : null
      }
    </View>
  )
}


const mapStateToProps = (state) => {
  return {
    pairOfNumbers: state.pairOfNumbers,
    tappedValue: state.tappedValue,
    cubesLeft: state.cubesLeft,
    score: state.score,
    prettyBoxProperties: state.prettyBoxProperties,
    playGame: state.playGame,
    round: state.round,
    startCountdown: state.startCountdown,
  }
}


export default connect(mapStateToProps, null)(GameScreen)