import { combineReducers } from 'redux'
import mediaReducer from './MediaPanel/Reducers'
import galleryReducer from './Gallery/Reducers'

const rootReducer = combineReducers({
  media: mediaReducer,
  gallery: galleryReducer,
})

export default rootReducer
