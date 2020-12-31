import React, { useEffect, useState, useCallback } from 'react'
import GalleryCard from './GalleryCard'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import { addItem, sortItem } from '../redux'

export default function Gallery() {
   const galleryItems = useSelector(state => state.gallery.galleryItems)
   const dispatch = useDispatch()


   const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.CARD,
      drop: (item, monitor) => {
         dispatch(addItem({ ...item.mediaItem, imgBlur: 0, imgGrayscale: 0, imgContast: 100 }))
      },
      collect: monitor => ({
         isOver: !!monitor.isOver(),
      }),
   });

   const moveCard = useCallback((dragIndex, hoverIndex) => {
      console.log(dragIndex, hoverIndex)

      dispatch(sortItem({ dragIndex, hoverIndex }))


   }, [galleryItems]);

   return (
      <div ref={drop} style={{ minHeight: '500px', backgroundColor: isOver ? '#ebf8ff' : '#fff', padding: 30 }}>
         <div className="row">
            {galleryItems.length == 0 && <p className="drop_txt">Drop an image from Media Panel</p>}
            {
               galleryItems &&
               galleryItems.map((galleryItem, i) => {
                  return (
                     <GalleryCard key={galleryItem._id}
                        index={i}
                        id={galleryItem._id}
                        moveCard={moveCard}
                        item={galleryItem} />
                  )
               })
            }
         </div>
      </div>
   )
}
