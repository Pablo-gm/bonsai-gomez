import React from 'react'
import Item from './Item';

function ItemList({items}) {

    const listItems = items.map((item) =>
        <Item key={item.id} item={item} />
    );
    return (
        <div className="p-5 mx-auto lg:max-w-7xl mt-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listItems}
        </div>
    )
}

export default ItemList