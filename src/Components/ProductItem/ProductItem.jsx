import React from 'react'
import Button from '../Button/Button'
import './ProductItem.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }



  return (
    // <div className={'product'}>
    //     <div className={'img'}/>
    //     <div className={'title'}>{product.title}</div>
    //     {/* <div className={'description'}>{product.description}</div> */}
    //     <div className={'price'}>
    //         <span>Стоимость: <b>{product.price}</b></span>
    //     </div>
    //     <Button className={'add-btn'} onClick={onAddHandler}>
    //         Добавить в корзину
    //     </Button>
    // </div>
    <Card className="product-card" sx={{ width: 345, height: 400 }}>
    <CardActionArea className='card-desc'>
        <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.description}
            </Typography>
        </CardContent>
    </CardActionArea>
    <CardActions>
        <Button className={'add-btn'} onClick={onAddHandler}>
            Добавить в корзину
        </Button>
    </CardActions>
</Card>
    
  )

}

export default ProductItem;