import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { FC } from 'react';
import ProductCard, { ItemProps } from './ProductCard';

const SortableItem: FC<ItemProps> = (props) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <ProductCard ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners} />
  );
};

export default SortableItem;
