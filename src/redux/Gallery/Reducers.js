import { ADD_ITEM, SORT_ITEM, DELETE_ITEM, UPDATE_IMG_BLUR, UPDATE_IMG_GRAYSCALE, UPDATE_IMG_CONTRAST } from './Types'
import update from 'immutability-helper';

const initialState = {
   galleryItems: []
}

const galleryReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_ITEM:

         const existsInArray = state.galleryItems.some(item => item._id === action.payload._id)
         if (existsInArray) {
            return state;
         }

         return {
            ...state,
            galleryItems: [...state.galleryItems, action.payload]

         }

      case DELETE_ITEM: return {
         ...state,
         galleryItems: state.galleryItems.filter(item => item._id !== action.payload)
      }

      case UPDATE_IMG_BLUR: return {
         ...state,
         galleryItems: state.galleryItems.map(
            (item, i) => item._id === action.payload.id ? { ...item, imgBlur: action.payload.value } : item)
      }

      case UPDATE_IMG_GRAYSCALE: return {
         ...state,
         galleryItems: state.galleryItems.map(
            (item, i) => item._id === action.payload.id ? { ...item, imgGrayscale: action.payload.value } : item)
      }

      case UPDATE_IMG_CONTRAST: return {
         ...state,
         galleryItems: state.galleryItems.map(
            (item, i) => item._id === action.payload.id ? { ...item, imgContast: action.payload.value } : item)
      }

      case SORT_ITEM:
         console.log(action.payload)
         const dragCard = state.galleryItems[action.payload.dragIndex];
         return {
            ...state,
            galleryItems: update(state.galleryItems, {
               $splice: [
                  [action.payload.dragIndex, 1],
                  [action.payload.hoverIndex, 0, dragCard],
               ],
            })
         }

      default: return state
   }
}

export default galleryReducer
