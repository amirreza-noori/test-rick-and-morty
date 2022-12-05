import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './utils/store';
import { PersistGate } from 'redux-persist/integration/react'



const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ApolloProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

