import React, { useEffect } from 'react'
import Singleproductnav from './Signleproductnav/Singleproductnav'
import Singleproductcontainer from './Singleproductcontainer/Singleproductcontainer'
import Singleproductdescription from './Singleproductdescription/Singleproductdescription'
import Singlerelatedproduct from './Singlerelatedproduct/Singlerelatedproduct'
import { useParams } from 'react-router-dom'
import { useSingleProductQuery } from '../../Redux/apiSlice'

const Singleproduct = () => {
  const { slug } = useParams()
  const { data, isLoading } = useSingleProductQuery(slug)
  useEffect(()=>{
    console.log(data);
    
  },[data])
  return (
    <>
      <Singleproductnav />
      {
        !isLoading ?
          <>
            <Singleproductcontainer data={data} /> <Singleproductdescription /> <Singlerelatedproduct />
          </> : "loading..."
      }


    </>
  )
}

export default Singleproduct