import React, { useEffect, useState } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { getDeckId } from "../../services/axiosClient";
import { styles } from "./styles";
import bgImg from "../../images/AAAA.webp";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [idDeck, setIdDeck] = useState(null);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const id = await getDeckId();
      setIdDeck(id);
      setLoading(false);
    };
    get();
  }, []);

  const inciarPartida = async () => {
    navigation.navigate("Game", {
      deckId: idDeck,
    });
  };

  return (
    <>
      <ImageBackground
        source={bgImg}
        style={styles.container}
        imageStyle={{ resizeMode: "contain", transform: [{ scale: 2.3 }] }}
      >
        <Text style={styles.title}>Jogo de Cartas</Text>
        <View style={{ flex: 2, justifyContent: "center", paddingTop: "25%" }}>
          <Button title="Iniciar Partida" onPress={inciarPartida} />
        </View>
        <View
          style={styles.regras}
        >
          <Text style={styles.regras} >Regras do jogo: </Text>
          <Text style={styles.regras}>Rei ou Rainha: Derrota!!!</Text>
          <Text style={styles.regras}>Qualquer outra combinação: Vitória!!!</Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;
