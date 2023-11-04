import { DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '@modules/products/components/SortableItem';
import React from 'react';
import { IProduct } from 'src/pages';
import Grid from './Grid';
import Item from './Item';

interface IProps {
  items: IProduct[];
  active: IProduct;
}

const ProductContainer: React.FC<IProps> = ({ active, items }) => {
  return (
    <>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={5}>{items?.map((item, index) => <SortableItem key={item.id} i={index} item={item} />)}</Grid>
      </SortableContext>
      <DragOverlay
        adjustScale
        style={{
          transformOrigin: '0 0 ',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {active?.id ? <Item item={active} withOpacity /> : null}
      </DragOverlay>
    </>
  );
};

export default ProductContainer;
