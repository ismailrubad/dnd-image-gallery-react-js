import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux'

import { ItemTypes } from '../utils/items';
import { deleteItem, updateImgBlur, updateImgGrayscale, updateImgContrast } from '../redux'
import useOutsideClick from "./useOutsideClick";

const style = {
   marginBottom: '30px',
   cursor: 'move',
};
export default function GalleryCard({ id, index, moveCard, item }) {
   const dispatch = useDispatch()

   const ref = useRef(null);

   const [, drop] = useDrop({
      accept: 'galleryCard',
      hover(item, monitor) {
         if (!ref.current) {
            return;
         }
         const dragIndex = item.index;
         const hoverIndex = index;
         // Don't replace items with themselves
         if (dragIndex === hoverIndex) {
            return;
         }
         // Determine rectangle on screen
         const hoverBoundingRect = ref.current && ref.current.getBoundingClientRect();
         // Get vertical middle
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

         // Get horizontal middle
         const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

         // Determine mouse position
         const clientOffset = monitor.getClientOffset();

         // Get pixels to the top
         const hoverClientY = clientOffset.y - hoverBoundingRect.top;

         // Get pixels to the left
         const hoverClientX = clientOffset.x - hoverBoundingRect.left;

         const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
         const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
         const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
         const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

         if (upwards && (leftwards || rightwards)) {
            return;
         }

         if (downwards && (leftwards || rightwards)) {
            return;
         }
         // Time to actually perform the action
         moveCard(dragIndex, hoverIndex);
         // Note: we're mutating the monitor item here!
         // Generally it's better to avoid mutations,
         // but it's good here for the sake of performance
         // to avoid expensive index searches.
         item.index = hoverIndex;
      },
   });
   const [{ isDragging }, drag] = useDrag({
      item: { type: 'galleryCard', id, index },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
   });
   const opacity = isDragging ? 0 : 1;
   drag(drop(ref));

   const [openFilterArea, setOpenFilterArea] = useState(false);

   useOutsideClick(ref, () => {
      if (openFilterArea) setOpenFilterArea(false);
   });

   return (
      <div className="col-md-4" ref={ref} style={{ ...style, opacity }}>
         <div
            className="img_area galleryCard">
            {
               item.url && <img style={{ filter: `blur(${item.imgBlur}px) grayscale(${item.imgGrayscale}%) contrast(${item.imgContast}%)` }} width="200" src={require(`../assets/${item.url}`)} />
            }

            <div className="filter_btn_area">
               <button onClick={() => setOpenFilterArea(!openFilterArea)}>Filter</button>
               <button onClick={() => dispatch(deleteItem(item._id))}>Del</button>
            </div>
            <div className="filter_area" style={{ display: openFilterArea ? 'block' : 'none' }}>
               <div className="single_filter">
                  <span>Blur</span>
                  <input onChange={e => dispatch(updateImgBlur(item._id, e.target.value))} type="range" name="Blur"
                     min="0" max="11" value={item.imgBlur}></input>
               </div>
               <div className="single_filter">
                  <span>Grayscale</span>
                  <input onChange={e => dispatch(updateImgGrayscale(item._id, e.target.value))} type="range" name="Blur"
                     min="0" max="100" value={item.imgGrayscale}></input>
               </div>
               <div className="single_filter">
                  <span>Contrast</span>
                  <input onChange={e => dispatch(updateImgContrast(item._id, e.target.value))} type="range" name="Blur"
                     min="0" max="200" value={item.imgContast}></input>
               </div>
            </div>
         </div>
      </div >
   );
};
