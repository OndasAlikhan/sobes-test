import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createContext } from "react";
import { RootModelType, rootStore } from "./common/store/root.store";

export const StoreContext = createContext<RootModelType>({} as RootModelType);
function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  );
}

export default App;
