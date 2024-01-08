import React from "react";
import { ClassListProvider } from './ClassListContext';
import MainPage from "./pages/MainPage.tsx";

function App() {
  return (
    <ClassListProvider>
      <MainPage />
    </ClassListProvider>
  );
}

export default App;
