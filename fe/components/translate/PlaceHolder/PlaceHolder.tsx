import { text } from '@/styles/colors';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function PlaceHolder() {
  return <View style={styles.container}>
    <Image style={styles.img} source={require("../../../assets/history_Empty.svg")} transition={500} contentFit='contain'></Image>
    <Text style={styles.text}>No Results</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    alignItems: 'center',
  },
  img: {
    flex: 1,
    width: '80%',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: text.gray_800,
  }
})