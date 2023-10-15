import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { rootStore, Provider } from "./common/store/root.store";
import { GlobalLoader } from "./common/components/GlobalLoader";

function App() {
  return (
    <Provider value={rootStore}>
      <RouterProvider router={router} fallbackElement={<GlobalLoader />} />
    </Provider>
  );
}

export default App;
