import React from 'react';
import Card from './card';

const CardBlock = ({items, title, shop, grid }) => {
    const renderCards = () => {
        return items?
        Object.keys(items).map((key)=>{
            return <Card key={items[key]._id} item={items[key]} grid = {grid}>
            </Card>
        }):null
    }


    return(
        <div className={shop ? 'card_block_shop' : 'card_block'}>
            <div className={shop ? '':'container'}>
                {
                    title ? 
                    <div className="title">{title}</div>
                    :null
                }
                <div style={{
                    display:'flex',
                    flexWrap:'wrap'
                }}> 
                    { renderCards()}
                </div>
            </div>
        </div>
    )

}

export default CardBlock;