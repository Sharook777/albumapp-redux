import { Provider } from "react-redux";

import store from "./reducer/store";
import Album from "./album/Album";

function App() {
  return (
    <Provider store={store}>
      <Album />
    </Provider>
  );
}

export default App;
