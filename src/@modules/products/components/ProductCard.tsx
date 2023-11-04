import { Checkbox } from 'antd';
import { HTMLAttributes, forwardRef } from 'react';
import { IProduct } from 'src/pages';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
  i?: string | number;
  item?: IProduct;
  active?: IProduct;
  checkItems?: any;
};

const ProductCard = forwardRef<HTMLDivElement, ItemProps>(
  ({ item, active, withOpacity, isDragging, style, i, checkItems, ...props }, ref) => {
    const inlineStyles = {
      opacity: isDragging ? '0.2' : '1',
      transformOrigin: '0 0',
      height: '100%',
      width: '100%',
      gridRowStart: i === 0 ? 'span 2' : null,
      gridColumnStart: i === 0 ? 'span 2' : null,
      cursor: isDragging ? 'grabbing' : 'grab',
      backgroundSize: 'cover',
      backgroundColor: 'white',
      overflow: 'hidden',
      backgroundPosition: 'center',
      borderRadius: '10px',
      boxShadow: isDragging
        ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
        : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      ...style,
    };

    // console.log(checkItems, item.id);

    // console.log(checkItems?.includes(item.id as number));

    return (
      <div className="product_item" ref={ref} style={inlineStyles} {...props}>
        <div className="overlay ">
          <Checkbox checked className="checkbox"></Checkbox>
        </div>
        <img className="object-cover h-full w-full" src={item.img} alt="" />
      </div>
    );
  },
);

ProductCard.displayName = 'Product Card';

export default ProductCard;
