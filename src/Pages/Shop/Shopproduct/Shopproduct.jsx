import { useEffect, useState } from "react";
//import Psbutton from "../../../Components/Psbutton/Psbutton";
import { useProductsQuery } from "../../../Redux/apiSlice";
import Heading from "../../../Utils/Heading/Heading";
import "./Shopproduct.css";
import { Link } from "react-router-dom";
import "react-pagination-with-dots/dist/index.css";
import Pagination  from "react-pagination-with-dots";

const Shopproduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sort, setSort] = useState('priceLowToHigh');
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading } = useProductsQuery({
    currentPage,
    category,
    subCategory,
    sort,
    quantity,
  });
  useEffect(() => {
    if (!isLoading) {
      console.log(data.data);
      
    }
  }, [data,isLoading]);
  return (
    
    <section id="shopproduct">
      <div className="container">
        <div className="shopproduct-contant-wrapper">
          <div className="shopproduct-images-container-flex">
            {!isLoading &&
              data.data.products.map((items) => (
                <Link to={`/singleproduct/${items.slug}`} key={items._id} >
                  <div className="shopproduct-img-container">
                    <div className="shopproduct-img-box">
                      <img src={items.thumbnail.imagePath} alt="not found" />
                    </div>
                    <div className="shopproduct-image-contant-box">
                      <Heading
                        level="h4"
                        text={items.title}
                        className="shopproduct-name"
                      />
                      {/* <Heading
                        level="h5"
                        text={items.pera}
                        className="shopproduct-pera"
                      /> */}
                      <div className="shopproduct-price-box-flex">
                        <Heading
                          level="h5"
                          text={
                            items.inventory[0]?.discountPrice.typeOfDiscount ===
                            "amount"
                              ? items.inventory[0]?.sellingPrice -  items.inventory[0]?.discountPrice.price
                              : 
                                items.inventory[0]?.sellingPrice - (items.inventory[0]?.sellingPrice *
                                  items.inventory[0]?.discountPrice.price) /
                                  100
                          }
                          className="shopproduct-newprice"
                        />
                        <Heading
                          level="h5"
                          text={items.inventory[0]?.sellingPrice}
                          className="shopproduct-oldprice"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* <div className="shopproduct-ps-box-flex">
          <Psbutton text="1" />
          <Psbutton text="2" />
          <Psbutton text="3" />
          <Psbutton text="next" />
        </div> */}
        {
        !isLoading && (
        <Pagination
          totalPages={Number(data.data.total)} // from api
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          breakLabel={"..."}
          limit={data.data.baselimit}
        />
        )}
      </div>
    </section>
  );
};

export default Shopproduct;
