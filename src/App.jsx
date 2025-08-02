import React from "react";
import { BrowserRouter } from "react-router";
import { HomePage } from "./pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}
