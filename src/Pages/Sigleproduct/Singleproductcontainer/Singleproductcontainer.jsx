import Heading from '../../../Utils/Heading/Heading';
import Sizebutton from '../../../Components/Sizebutton/Sizebutton';
import Colorbox from '../../../Components/Colorbox/Colorbox';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import './Singleproductcontainer.css'
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useCreateCartMutation } from '../../../Redux/apiSlice';



const Singleproductcontainer = ({ data: { product } }) => {
    console.log("aa", product);
    const { auth } = useAuth() 
    const [ createCart] = useCreateCartMutation()
    const [active, setActive] = useState(product?.gallery[0].imagePath)
    const [vari, setVari] = useState(0)
    const [pqtn, setPQtn] = useState(product.inventory[vari]?.quantity)
    let [qtn, setQtn] = useState(0)
    console.log(pqtn);

    const handleVari = (index)=>{
        setVari(index)
        setPQtn(product.inventory[index]?.quantity)
    }
    

    const handleIncrease = ()=>{
        console.log("aa");
        if (pqtn > qtn) {
            
            setQtn(++qtn)
        }
    }

    
    const handleDecrease = ()=>{
        console.log("bb");
        if (qtn) {
            
            setQtn(--qtn)
        }
    }

    const handleCreateCart = async()=>{
        const data = {
            user:auth._id, 
            product:product._id,
            inventory:product?.inventory[vari],
            quantity:qtn
            
        }

        const res = await createCart(data)
        
        
    }
    
    
    return (
        <section id='singleproduct-container'>
            <div className='container'>

                <div className='singleproduct-container-flex'>
                    <div className='singleproduct-container-images-box-flex'>
                        <div className='singleproduct-container-small-images-box-flex'>
                            <div className='r-flex'>
                                {
                                    product.gallery.map((img) =>
                                    (
                                        <div className='singleproduct-container-small-box' onClick={() => setActive(img.imagePath)}>
                                            <img src={img.imagePath} alt='not found' />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='singleproduct-container-big-images-box'>
                                <img src={active} alt="not found" />
                            </div>
                        </div>
                    </div>
                    <div className='singleproduct-container-contant-box'>
                        <Heading level='h2' text={product.title} className='singleproduct-container-contant-head' />
                        <Heading level='h4' text={
                            product.inventory[vari]?.discountPrice.typeOfDiscount ===
                            "amount"
                              ? product.inventory[vari]?.sellingPrice -  product.inventory[vari]?.discountPrice.price
                              : 
                                product.inventory[vari]?.sellingPrice - (product.inventory[vari]?.sellingPrice *
                                  product.inventory[vari]?.discountPrice.price) /
                                  100
                        } className='singleproduct-container-contant-price' />
                        <div>
                            <h2>quantity</h2>
                        <Heading level='h4' text={
                            product.inventory[vari]?.quantity
                           
                        } className='singleproduct-container-contant-price' />
                        </div>
                        <div className='singleproduct-conatiner-star-box-flex'>
                            <div className='singleproduct-container-star-box'>
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                                <FaRegStar />
                            </div>
                            <div className='singleproduct-container-reviews-box'>
                                {/* <Heading level='p' text={items.review} className='singleproduct-container-reviews-contant' /> */}
                            </div>
                        </div>
                        {/* <Heading level='p' text={items.description} className='singleproduct-container-details' /> */}
                        <div className='singleproduct-container-size-box'>
                            {/* <Heading level='p' text={items.size} className='singleproduct-container-size-box-head' /> */}
                            <div className='singleproduct-container-sixe-box-flex'>
                                {
                                    product.inventory.map((item, index)=>(
                                        <Sizebutton text={item.variation.size.sizename} className='singleproduct-container-sixe' onFun={()=>handleVari(index)} />
                                    ))
                                }
                            </div>
                        </div>
                        {/* <div className='singleproduct-container-color-box'>
                            <Heading level='p' text={items.color} className='singleproduct-container-color-box-head' />
                            <Colorbox />
                        </div> */}
                        <div className='singleproduct-container-cart-box-flex'>
                            <div className="singleproduct-container-cound-box-flex">
                                <button onClick={handleDecrease} > - </button>
                                <Heading level='p' text={qtn} className='singleproduct-container-cound' />
                                <button  onClick={handleIncrease}> + </button>
                            </div>
                            <div className="singleproduct-container-add-box">
                                <button className='singleproduct-container-add-cart-btn' onClick={()=>handleCreateCart()}>add to cart</button>
                            </div>
                            <div className="singleproduct-container-compare-box">
                                <button className='singleproduct-container-compare-btn'>+ compare</button>
                            </div>
                        </div>
                        <div className='singleproduct-mini-details-box'>
                            <div className="singleproduct-mini-contant-box-flex">
                                <Heading level='p' text='SKU   :' className='singleproduct-mini-contant-s' />
                                {/* <Heading level='p' text={items.sku} className='singleproduct-mini-contant-v' /> */}
                            </div>
                            <div className='singleproduct-mini-contant-box-flex'>
                                <Heading level='p' text='category  :' className='singleproduct-mini-contant-s' />
                                {/* <Heading level='p' text={items.category} className='singleproduct-mini-contant-v' /> */}
                            </div>
                            <div className='singleproduct-mini-contant-box-flex'>
                                <Heading level='p' text='tags  :' className='singleproduct-mini-contant-s' />
                                {/* <Heading level='p' text={items.tags} className='singleproduct-mini-contant-v' /> */}
                            </div>
                            <div className="singleproduct-mini-icon-box-flex">
                                <Heading level='p' text='share  :' className='singleproduct-mini-contant-s' />
                                <div className="singleproduct-mini-icon-flex">
                                    <Link to="facebook" className="singleproduct-mini-icon">
                                        <FaFacebookF />
                                    </Link>
                                    <Link to="linkdin" className="singleproduct-mini-icon">
                                        <FaLinkedinIn />
                                    </Link>
                                    <Link to="twiter" className="singleproduct-mini-icon">
                                        <FaTwitter />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Singleproductcontainer