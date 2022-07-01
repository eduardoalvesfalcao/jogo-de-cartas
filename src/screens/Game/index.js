import { useEffect, useState } from "react";
import { ScrollView ,View, Text, Image, Button } from "react-native";
import { getCards } from "../../services/axiosClient";

const Game = ({ route }) => {
  const { deckId } = route.params;
  const [cards, setCards] = useState(null);

  const inspecionar = () => {
    const validar =
      cards &&
      cards.cards.some((card) => {
        return card.value === "KING" || card.value === "QUEEN";
      });

    if (validar) {
      alert("Você perdeu  =(");
    } else {
      alert("Parabéns você ganhou!!!");
    }
  };

  const tentarNovamente = () => {
    const novoJogo = async () => {
      const deck = await getCards(deckId, 3);
      setCards(deck);
    };
    novoJogo();
  };

  useEffect(() => {
    const get = async () => {
      const deck = await getCards(deckId, 3);
      setCards(deck);
    };
    get();
  }, []);

  useEffect(() => {
    // if (cards.length === 0) return;
    console.log(cards);
  }, [cards]);

  return (
    <ScrollView>
      <View
        style={{
          // width: '100%',
          // height: '40%',
          flex: 1,
          backgroundColor: 'black',
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
       <View style = {{}}>
          {cards &&
            cards.cards.map((card) => (
              <>
                <Image
                  style={{ width: 145, height: 255, margin: 1,  resizeMode: "contain", flex: 1 }}
                  source={{ uri: card.image }}
                />
              </>
            ))}
            </View>
        </View>
        <View style = {{backgroundColor: 'black'}} >
          <Button color = "black" title="Conferir Jogo" onPress={inspecionar} />
          <Button color = "black" title="Tente novamente" onPress={tentarNovamente} />
        </View>
      
    </ScrollView>
  );
};

export default Game;
