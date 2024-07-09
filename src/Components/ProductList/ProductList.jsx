import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Guiness', price: 120, description: 'a distinctive dark and creamy stout'},
    {id: '2', title: 'Maui Porter', price: 145, description: 'a classic robust porter'},
    {id: '3', title: 'Heinekein', price: 130, description: 'a full, balanced taste and a distinctive aroma of hops and malt'},
    {id: '4', title: 'Corona', price: 140, description: 'a clean-tasting lager from Mexico'},
    {id: '5', title: 'Gorokhovskaya', price: 115, description: 'a nice bright stout'},
    {id: '6', title: 'Spaten', price: 150, description: 'a golden-colored, moderate-strength lager'},
    {id: '7', title: 'Coconout Cider', price: 160, description: 'a beautiful Belgian fair trade white coconout sweet taste'},
    {id: '8', title: 'Stella', price: 155, description: 'a Belgian pilsner beer'}
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
    }, [])

    useEffect(()  =>  {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

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
