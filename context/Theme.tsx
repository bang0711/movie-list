"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Theme({ children }: Props) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

export default Theme;
