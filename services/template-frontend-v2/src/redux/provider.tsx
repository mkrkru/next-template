"use client";

import { store } from "./store";
import { Provider as RawProvider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <RawProvider store={store}>{children}</RawProvider>;
}
