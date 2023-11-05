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
  const [checkItems, setCheckedItems] = useState([]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const active = items.find((item) => item.id === event.active.id);
    setActive(active);
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      console.log(active?.id, over?.id);
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active?.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex ?? oldIndex);
      });
    }
    if (checkItems.includes(active.id)) {
      const data = checkItems.filter((item) => item !== active.id);
      setCheckedItems([...data]);
    } else {
      setCheckedItems([...checkItems, active.id]);
    }
    setActive(null);
  }
  const handleDeleteItem = () => {
    const filteredItems = items.filter((item) => !checkItems.includes(item.id));
    setItems([...filteredItems]);
  };

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
        <div className="container">
          <div className="header">
            {checkItems.length > 0 ? (
              <div className="flex justify-start gap-2 pl-5 py-[17px]">
                <input onClick={() => setCheckedItems([])} type="checkbox" defaultChecked />
                <p className="font-bold">{checkItems.length} File Selected</p>
              </div>
            ) : (
              <p className="py-[12px] title">Gallery</p>
            )}
            <button onClick={handleDeleteItem}>Delete files</button>
          </div>
          <div className="card_container">
            {items?.map((item, index) => <SortableItem checkItems={checkItems} key={item.id} i={index} item={item} />)}
            <div className="flex cursor-pointer flex-col justify-center items-center bg-slate-100 rounded-lg border border-dashed border-black h-[170px] md:h-[170px]">
              <span>
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M17.409 19c-.776-2.399-2.277-3.885-4.266-5.602A10.954 10.954 0 0 1 20 11V3h1.008c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3H6V1h2v4H4v7c5.22 0 9.662 2.462 11.313 7h2.096zM18 1v4h-8V3h6V1h2zm-1.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />{' '}
                  </g>
                </svg>
              </span>
              Add Image
            </div>
          </div>
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
