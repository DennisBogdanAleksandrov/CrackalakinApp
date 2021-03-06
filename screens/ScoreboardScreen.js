import React from "react";
import { Button } from "react-native";
import { Bg } from "../styles/ContainerStyles";
import { Text } from "../styles/TextStyles";

const ScoreboardScreen = ({ navigation }) => {
  return (
    <Bg>
      <Text>hi from ScoreboardScreen</Text>
      <Text>Scoreboard</Text>
      <Text>highlight the users score whereever it is</Text>

      <Button title="Game" onPress={() => navigation.navigate("Game")} />
    </Bg>
  );
};

export default ScoreboardScreen;

//~ Lets actually use data for these screens. So make the the login and saving data under their username work