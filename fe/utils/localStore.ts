import { HistoryItem } from "@/types/translate/history";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HIS_KEY = "@TT_History_key";

export const storeHisObj = async (value: HistoryItem) => {
  try {
    const jsonValue = await getAllHisObj();
    console.log(jsonValue);
    const hisObjArr = jsonValue ? JSON.parse(jsonValue) : [];
    hisObjArr.unshift(value);
    await AsyncStorage.setItem(HIS_KEY, JSON.stringify(hisObjArr));
    console.log(hisObjArr);
  } catch (e) {
    console.error(e);
  }
};

export const getAllHisObj = async () => {
  try {
    return await AsyncStorage.getItem(HIS_KEY);
  } catch (e) {
    console.error(e);
  }
};
