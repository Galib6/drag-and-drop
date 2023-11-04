import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { products } from '@lib/const/products';
import ProductCard from '@modules/products/components/ProductCard';
import SortableItem from '@modules/products/components/SortableItem';
import React, { useCallback, useState } from 'react';

export interface IProduct {
  id: string | number;
  img: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState(products);
  const [active, setActive] = useState<IProduct>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const active = items.find((item) => item.id === event.active.id);
    setActive(active);
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    console.log(items);
    setActive(null);
  }

  const handleDragCancel = useCallback(() => {
    setActive(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="card_container">
          {items?.map((item, index) => <SortableItem key={item.id} i={index} item={item} />)}
        </div>
      </SortableContext>
      <DragOverlay
        adjustScale
        style={{
          transformOrigin: '0 0 ',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {active?.id ? <ProductCard item={active} withOpacity /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
