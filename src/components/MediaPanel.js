import React, { useEffect } from 'react'
import MediaCard from './MediaCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMediaItems } from '../redux'

export default function MediaPanel() {
   const mediaItems = useSelector(state => state.media.mediaItems)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchMediaItems())
   }, [])

   console.log(mediaItems);

   return (
      <div className="media_panel">
         <h2>Media Panel</h2>

         <div className="media_area">
            {
               mediaItems &&
               mediaItems.map(mediaItem => <MediaCard item={mediaItem} key={mediaItem._id} />)}

         </div>
      </div>
   )
}
