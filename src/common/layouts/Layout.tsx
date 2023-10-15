import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GlobalLoader } from "../components/GlobalLoader";
import { useMst } from "../store/root.store";
import { observer } from "mobx-react-lite";

export const Layout = observer(() => {
  const store = useMst();
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" />
      {store.globalLoader.loading ? <GlobalLoader /> : null}
    </div>
  );
});
