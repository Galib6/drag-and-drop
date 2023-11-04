import {
  DndContext,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { products } from '@lib/const/products';
import ProductContainer from '@modules/products/components/ProductContainer';
import { useCallback, useState } from 'react';

export interface IPorduct {
  id: string | number;
  img: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState(products);
  const [active, setActive] = useState<IPorduct>(null);
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
      <ProductContainer items={items} active={active} />
    </DndContext>
  );
};

export default App;
