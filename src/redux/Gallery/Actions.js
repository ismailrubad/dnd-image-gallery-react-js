import { ADD_ITEM } from './Types'
import { SORT_ITEM } from './Types'
import { DELETE_ITEM } from './Types'
import { UPDATE_IMG_GRAYSCALE, UPDATE_IMG_CONTRAST, UPDATE_IMG_BLUR } from './Types'


export const addItem = (item) => {
   return {
      type: ADD_ITEM,
      payload: item
   }
}

export const sortItem = (indexObj) => {
   return {
      type: SORT_ITEM,
      payload: indexObj
   }
}

export const deleteItem = (id) => {
   return {
      type: DELETE_ITEM,
      payload: id
   }
}

export const updateImgBlur = (id, value) => {
   return {
      type: UPDATE_IMG_BLUR,
      payload: { id, value }
   }
}

export const updateImgGrayscale = (id, value) => {
   return {
      type: UPDATE_IMG_GRAYSCALE,
      payload: { id, value }
   }
}

export const updateImgContrast = (id, value) => {
   return {
      type: UPDATE_IMG_CONTRAST,
      payload: { id, value }
   }
}
