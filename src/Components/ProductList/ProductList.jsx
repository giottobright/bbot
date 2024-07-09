import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Guiness', price: '120 rub', description: 'a distinctive dark and creamy stout'},
    {id: '2', title: 'Maui Porter', price: '145 rub', description: 'a classic robust porter'},
    {id: '3', title: 'Heinekein', price: '130 rub', description: 'a full, balanced taste and a distinctive aroma of hops and malt'},
    {id: '4', title: 'Corona', price: '140 rub', description: 'a clean-tasting lager from Mexico'},
    {id: '5', title: 'Gorokhovskaya', price: '115 rub', description: 'a nice bright stout'},
    {id: '6', title: 'Spaten', price: '150 rub', description: 'a golden-colored, moderate-strength lager'},
    {id: '7', title: 'Coconout Cider', price: '160 rub', description: 'a beautiful Belgian fair trade white coconout sweet taste'},
    {id: '8', title: 'Stella', price: '155 rub', description: 'a Belgian pilsner beer'}
]


const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();


    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
