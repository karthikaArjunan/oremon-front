import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions';
import { Layout } from '../../components/Layout';
import {
  IoIosArrowForward,
  IoIosStar,
  IoMdCart
} from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../components/MaterialUI';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import { addToCart } from '../../actions';

/**
* @author
* @function ProductDetailsPage
**/

export const ProductDetailsPage = (props) => {

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    console.log(productId)
    const payload = {
      params: {
        productId,
      }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  return (
    <Layout>
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {
              product.productDetails.productPictures.map((thumb, index) =>
                <div className="thumbnail">
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              )
            }
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={generatePublicUrl(product.productDetails.productPictures[0].img)} alt={`${product.productDetails.productPictures[0].img}`} />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#00FF00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  window.location.href = `/cart`;
                  props.history.push(`/cart`);
                }}
              />
            </div>
          </div>
        </div>
        <div>

          
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            
            <div className="flexRow priceContainer">
              <span className="price"><BiRupee />{product.productDetails.price}</span>
              
            </div>
            <div>
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
                }}>Description</span>
                <span style={{
                  fontSize: '12px',
                  color: '#212121',
                }}>{product.productDetails.description}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )

}
