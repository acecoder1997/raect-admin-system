import './App.css';
import IndexRouter from "./router";
import React,{Fragment} from 'react';
import {store,persistor} from './redux/store'
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react"

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Fragment>
                    <IndexRouter/>
                </Fragment>
            </PersistGate>
        </Provider>
    );
}

export default App;
