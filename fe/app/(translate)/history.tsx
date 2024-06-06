import HeaderContainer from "@/components/global/HeaderContainer";
import IconBtn from "@/components/global/IconBtn";
import HistoryCard from "@/components/translate/HistoryCard/HistoryCard";
import PlaceHolder from "@/components/translate/PlaceHolder/PlaceHolder";
import { radiusBase } from "@/styles/base";
import { bg, text } from "@/styles/colors";
import { HistoryItem } from "@/types/translate/history";
import { getAllHisObj } from "@/utils/localStore";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

export default function HistoryView() {
  const [hisArr, setHisArr] = useState<HistoryItem[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const initHisArr = async() => {
    const jsonValue = await getAllHisObj();
    if (jsonValue) {
      setHisArr(JSON.parse(jsonValue));
    }
  }

  useEffect(() => {
    initHisArr();
  }, [])

  useEffect(() => {
    if (!hisArr.length) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false);
    }
  }, [hisArr])

  const hisLists = () => {
    return hisArr.map((el, index) => {
      return <HistoryCard
      from={el.from}
      to={el.to}
      text={el.inputText}
      translatedText={el.outputText}
      soundStr={el.audio}></HistoryCard>
    })
  }

  return (
    <View className="flex h-full w-full" style={styles.pageContainer}>
      <StatusBar style="light" />
      <HeaderContainer>
        <View style={styles.headerContainer}>
          <IconBtn onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="white" />
          </IconBtn>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>History</Text>
          </View>
        </View>
      </HeaderContainer>
      <View style={styles.bodyContainer}>
        <View className="flex-row justify-end mt-2 px-4">
          <IconBtn>
            <FontAwesome5 name="trash" size={24} color={bg.red_600} />
          </IconBtn>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View>
            {!isEmpty && hisLists()}
            {isEmpty && <PlaceHolder></PlaceHolder>}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "flex-end",
  },
  bodyContainer: {
    position: "relative",
    height: height - 80,
    width: "100%",
    paddingVertical: 20,
    backgroundColor: bg.page,
    borderTopLeftRadius: radiusBase,
    borderTopRightRadius: radiusBase,
  },
  headerText: {
    color: text.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 80,
  },
  headerTextContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
