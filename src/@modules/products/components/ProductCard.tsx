import { HTMLAttributes, forwardRef } from 'react';
import { IProduct } from 'src/pages';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  i?: string | number;
  item?: IProduct;
  active?: IProduct;
  checkItems?: any;
};

const ProductCard = forwardRef<HTMLDivElement, ItemProps>(
  ({ item, active, withOpacity, style, i, checkItems, ...props }, ref) => {
    const inlineStyles = {
      opacity: withOpacity ? '1' : '1',
      transformOrigin: '0 0',
      height: '100%',
      width: '100%',
      gridRowStart: i === 0 ? 'span 2' : null,
      gridColumnStart: i === 0 ? 'span 2' : null,
      // cursor: withOpacity ? 'grabbing' : 'grab',
      backgroundSize: 'cover',
      backgroundColor: 'white',
      overflow: 'hidden',
      backgroundPosition: 'center',
      borderRadius: '10px',
      boxShadow: withOpacity
        ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
        : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      transform: withOpacity ? 'scale(1.05)' : 'scale(1)',
      ...style,
    };

    return (
      <div className="product_item" ref={ref} style={inlineStyles} {...props}>
        <div className={`overlay  ${!withOpacity && checkItems?.includes(item.id) ? 'block' : 'hidden '}`}>
          <input checked={checkItems?.includes(item.id)} type="checkbox" />
        </div>
        <img className="object-cover h-full w-full" src={item.img} alt="" />
      </div>
    );
  },
);

ProductCard.displayName = 'Product Card';

export default ProductCard;
