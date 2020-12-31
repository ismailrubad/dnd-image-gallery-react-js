import React from 'react'
import { addItem } from '../redux'
import { useSelector, useDispatch } from 'react-redux'
import { ItemTypes } from '../utils/items';
import { useDrag } from 'react-dnd';

export default function MediaCard({ item }) {
   const dispatch = useDispatch()

   const [{ isDragging }, drag] = useDrag({
      item: {
         type: ItemTypes.CARD,
         mediaItem: item,
      },
      collect: monitor => ({
         isDragging: !!monitor.isDragging(),
      }),
   });

   return (
      <div
         ref={drag}
         style={{ opacity: isDragging ? '0.3' : '1' }}
         className="img_area">
         {
            item.url && <img width="200" src={require(`../assets/${item.url}`)} />
         }

      </div>
   )
}
