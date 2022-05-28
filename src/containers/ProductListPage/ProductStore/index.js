import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';
import { Card } from '../../../components/UI/Card';
import './style.css';
import { MaterialButton } from '../../../components/MaterialUI';
/**
* @author
* @function ProductStore
**/

export const ProductStore = (props) => {
    const product = useSelector(state => state.product);
    const priceRange = {
        under5k: 500,
        under10k: 1000,
        under15k: 1500,
        under20k: 2000,
        under30k: 2500,
      };
    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${props.match.params.slug} under ${priceRange[key]}`}
                            headerRight={
                                <MaterialButton
                                    title={"VIEW ALL"}
                                    style={{
                                        width: "150px",
                                        height: "30px"
                                    }}
                                    bgColor="#75E6DA"
                                    fontSize="10px" />
                            }
                            style={{ width: 'calc(100%-40%)', margin: '20px' }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map((product) =>
                                        <a
                                            href={`/${product.slug}/${product._id}/p`}
                                            style={{
                                                display: "block",
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                            className="productContainer"
                                        >
                                            <div className='productImgContainer'>
                                                <img
                                                    src={generatePublicUrl(product.productPictures[0].img)}
                                                    alt="" />
                                            </div>
                                            <div className='productInfo'>
                                                <div style={{ margin: '5px' }}>{product.name}</div>
                                                <div className='productPrice'><BiRupee />{product.price}</div>
                                            </div>
                                        </a>
                                    )
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </>
    )

}