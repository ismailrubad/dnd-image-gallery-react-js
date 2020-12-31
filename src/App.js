import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import MediaPanel from './components/MediaPanel'
import Gallery from './components/Gallery'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className='App'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <MediaPanel />
              </div>
              <div className="col-md-8">
                <div className="gallery_container">
                  <Gallery />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </Provider>
  )
}

export default App
