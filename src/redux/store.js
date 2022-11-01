import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { authReducer } from './reducers/authReducer';




const rootReducers = combineReducers({ authReducer });

const persistConfig = {
    key: "root6576",
    storage,
    blacklist: ["booking"],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  
  );
  const persistor = persistStore(store);
  export { store, persistor };