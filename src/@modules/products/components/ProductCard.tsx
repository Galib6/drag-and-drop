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
      border: '1px solid gray',
      borderRadius: '10px',
      ...style,
    };

    return (
      <div className={`product_item ${!withOpacity ? 'dragging' : ''}`} ref={ref} style={inlineStyles} {...props}>
        <div className={`overlay  ${checkItems?.includes(item.id) ? 'block ' : 'hidden '}`}>
          <input
            onChange={() => {
              console.log('dd');
            }}
            checked={checkItems?.includes(item.id)}
            type="checkbox"
          />
        </div>
        <img className="object-cover h-full w-full" src={item.img} alt="" />
      </div>
    );
  },
);

ProductCard.displayName = 'Product Card';

export default ProductCard;
