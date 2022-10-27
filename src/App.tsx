import React from 'react';
import './App.css';
import { Route, Routes ,BrowserRouter} from "react-router-dom";
import {NoteView} from "./Component/NoteView";
import {NoteStore} from "./Store/NoteStore";
function App() {

    const store : NoteStore = new NoteStore();
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<NoteView store={store} />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
