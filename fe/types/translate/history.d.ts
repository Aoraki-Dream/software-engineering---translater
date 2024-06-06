import { LangsValue } from "./lang";

export interface HistoryItem {
  from: LangsValue | "auto";
  to: LangsValue;
  inputText: string;
  outputText: string;
  audio: string | null | undefined;
}
