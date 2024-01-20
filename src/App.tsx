import { Analytics } from '@vercel/analytics/react';

import React from "react";
import { ClassListProvider } from './ClassListContext.js';
import MainPage from "./pages/MainPage.tsx";

function App() {
  return (
    <ClassListProvider>
      <MainPage />
      <Analytics />
    </ClassListProvider>
  );
}

export default App;
