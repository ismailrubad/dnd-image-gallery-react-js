import { FETCH_MEDIA_ITEMS } from './Types'

const initialState = {
   mediaItems: []
}

const mediaPanerReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_MEDIA_ITEMS: return {
         ...state,
         mediaItems: [
            {
               _id: (Math.random() * 100).toFixed(0),
               url: 'image4.png'
            },
            {
               _id: (Math.random() * 100).toFixed(0),
               url: 'image5.png'
            },
            {
               _id: (Math.random() * 100).toFixed(0),
               url: 'image6.png'
            },
            {
               _id: (Math.random() * 100).toFixed(0),
               url: 'image7.png'
            },
            {
               _id: (Math.random() * 100).toFixed(0),
               url: 'image8.png'
            }
         ]
      }

      default: return state
   }
}

export default mediaPanerReducer
