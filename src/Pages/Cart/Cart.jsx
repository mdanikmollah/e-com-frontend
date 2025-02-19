import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../../Utils/Heading/Heading';
import { CiLocationOn } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import './Cart.css'
import { useCartQuery, usePayMutation } from '../../Redux/apiSlice';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';



const Cart = () => {
  const { auth } = useAuth() 
  const [ subTotal,setSubtotal ] = useState(0) 
  const [ orderData,setOrderData ] = useState([])
  const { data, isLoading } = useCartQuery(auth._id);
  const [pay] = usePayMutation()

  useEffect(()=>{
    if(!isLoading && data && data.cart){
      let total = 0;

      data.cart.forEach((item)=>{
        setOrderData((prev)=>[...prev,{product:item.product._id,inventory:item.inventory._id,quantity:item.quantity,price:item.inventory?.discountPrice.typeOfDiscount ===
          "amount"
            ? (item.inventory?.sellingPrice -  item.inventory?.discountPrice.price) * item.quantity
            : 
             ( item.inventory?.sellingPrice - (item.inventory?.sellingPrice *
                item.inventory?.discountPrice.price) /
                100)  * item.quantity }])
        const discountPrice = item.inventory?.discountPrice;
        const sellingPrice = item.inventory?.sellingPrice;
        const quantity = item.quantity;

        if(discountPrice?.typeOfDiscount === "amount"){
          total += (sellingPrice - discountPrice.price)* quantity;
        }else if(discountPrice?.typeOfDiscount === "parcentage"){
          total += (sellingPrice - (sellingPrice * discountPrice.price) / 100) * quantity;
        }
      });
      setSubtotal(total);
    }
    return ()=>{
      setOrderData([])
    }
    //console.log(data.cart);
    
  },[isLoading,data])

  const handlePay = async()=>{
    const user = auth.user
    console.log(auth);
    
    const data2 = {
      orderId:crypto.randomUUID(),
      total:subTotal,
      subTotal:subTotal,
      name:"anik",
      address:"Kodomtoly Dhaka",
      city:"Dhaka",
      district:"Dhaka",
      postcode:"1204",
      phone:"01456656454",
      email:"mdanik0178@gmail.com",
      shippingCost:"10",
      paymentType:"online",
      orderedProducts:orderData
    }
    const res = await pay(data2)
    console.log(res);
    window.location.href = res.data.url
  }
  
  return (
    <div id ='cart'>
      <div className='container'>
        <div className='cart-container-flex'>
          <div className='cart-item-box-flex'>
            {
              !isLoading && 
              data.cart.map((item , index)=>(
                <div className='cart-product-box-flex' key={index}>
                  <div className='cart-product-flex'>
                    <div className='cart-porduct-img-box'>
                      <img src={item.product.thumbnail.imagePath} alt="not found" />
                    </div>
                    <div className='cart-porduct-des-box'>
                      <Heading level='h3' text={item.product.title} className='cart-porduct-name'/>
                      <div className='cart-porduct-des-flex'>
                        <Heading level='h5' text={item.brand} className='cart-porduct-brand'/>
                        <Heading level='h5' text={item.color} className='cart-porduct-color'/>
                        <Heading level='h5' text={item.inventory.variation.size.sizename} className='cart-porduct-size'/>
                      </div>
                    </div>
                      <div className='cart-porduct-price-box'>
                        <Heading level='h3' text={item.inventory?.discountPrice.typeOfDiscount ===
                            "amount"
                              ? (item.inventory?.sellingPrice -  item.inventory?.discountPrice.price) * item.quantity
                              : 
                               ( item.inventory?.sellingPrice - (item.inventory?.sellingPrice *
                                  item.inventory?.discountPrice.price) /
                                  100)  * item.quantity }  className='cart-porduct-oldprice'/>
                        <div className='cart-porduct-price-icon-box-flex'>
                          <div className='cart-porduct-price-love-flex'>
                            <button className='cart-porduct-price-icon-btn'><CiHeart /></button>
                          </div>
                          <div className='cart-porduct-price-delet-flex'>
                            <button className='cart-porduct-price-icon-btn'><AiTwotoneDelete /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='cart-porduct-cound-box'>
                      <div className="cart-porduct-cound-box-flex">
                        <div className='cart-porduct-cound-btn-box'>
                          <button className='cart-porduct-cound-btn'> - </button>
                        </div>
                        <Heading level= 'p' text={item.quantity} className='cart-porduct-cound'/>
                        <div className='cart-porduct-cound-btn-box'>
                          <button className='cart-porduct-cound-btn'> + </button>
                        </div>
                      </div>
                    </div>
                </div>
              ))
            }
          </div>
          <div className='cart-payment-box'>
              <Heading level='h4' text='Location' className='cart-payment-location'/>
              <div className='cart-address-box-flex'>
                <CiLocationOn className='location-icon' />
                <Heading level='p' text='Add Shipping Address' className='cart-payment-address'/>
              </div>
              <hr/>
              <div className='cart-order-box'>
                <Heading level='h3' text='Order Summary' className='cart-order-summary'/>
                <div className='cart-order-item-flex'>
                  <Heading level='h4' text='subtotal' className='cart-order-item'/>
                  <Heading level='h4' text={subTotal} className='cart-order-item-price'/>
                </div>
                <div className='cart-order-item-flex'>
                  <Heading level='h4' text='Shipping Fee' className='cart-order-item'/>
                  <Heading level='h4' text='0' className='cart-order-item-price'/>
                </div>
                <div className='cart-payment-input-box-flex'>
                  <div className='cart-payment-input-box'>
                    <input className='cart-payment-input' placeholder='Enter Voucher Code' type="text" />
                  </div>
                  <div className='cart-payment-btn-box'>
                    <button className='cart-payment-btn'>apply</button>
                  </div>
                </div>
                <div className='cart-order-total-flex'>
                  <Heading level='h4' text='total' className='cart-order-total'/>
                  <Heading level='h4' text={subTotal} className='cart-order-total-price'/>
                </div>
              </div>
              <div className='cart-product-checkout-btn-box'>
                <button className='cart-product-checkout-btn' onClick={handlePay}>proceed to checkout ({subTotal})</button>
                {/* <Link to={`${import.meta.env.VITE_API_BASE_URL}/pay`} lassName='cart-product-checkout-btn'>proceed to checkout {subTotal}</Link> */}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart