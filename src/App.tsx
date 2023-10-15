import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { rootStore, Provider } from "./common/store/root.store";
import { GlobalSpinner } from "./common/components/GlobalSpinner";

function App() {
  return (
    <Provider value={rootStore}>
      <RouterProvider router={router} fallbackElement={<GlobalSpinner />} />
    </Provider>
  );
}

export default App;
