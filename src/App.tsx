import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { rootStore, Provider } from "./common/store/root.store";

function App() {
  return (
    <Provider value={rootStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
