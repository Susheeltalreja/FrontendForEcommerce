import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

import { useDispatch } from 'react-redux'
import {DeleteProduct, FetchProducts} from "../../ReduxStates/ProductStates/index";

import { toast } from 'sonner';

function AdminProductView({ product,setOpen, SetProductID, setProductData, setUploadImage }) {
    const dispatch = useDispatch();
    function DeleteProducts(id){
        dispatch(DeleteProduct(id)).then((data) => {
        if (data?.payload?.success) {
          toast.success(`${data?.payload?.message}`)
          dispatch(FetchProducts())
        } else {
          toast.error(`${data?.payload?.message}`)
        }
      })
    }
    return (
        <Card className="w-full max-w-sm mx-auto py-0">
            <div className=''>
                <div>
                    <img src={product.
                        ProductImage} alt={product.title} className='w-full rounded-t-lg object-cover h-[300px]' />
                </div>
                <CardContent className="w-full flex justify-center items-center flex-col">
                    <div className='flex justify-start flex-col items-start w-full'>
                        <h4 className='font-bold'>Name: {product.title}</h4>
                        <p className='text-gray-600 overflow-hidden w-full overflow-ellipsis whitespace-nowrap'>Desc: {product.description}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <h4 className={product.saleprice > 0 ? "line-through" : "font-bold"}>Rs. {product.price}</h4>
                        {
                            product.saleprice > 0 ? <h4>Rs. {product.saleprice}</h4> : ""
                        }
                        
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center w-full mb-2">
                    <Button className="cursor-pointer"
                    onClick={() => {
                        setOpen(true)
                        SetProductID(product?._id)
                        setProductData(product)
                        setUploadImage(product.ProductImage)
                    }}
                    >Edit</Button>
                    <Button className="cursor-pointer"
                    onClick={() => DeleteProducts(product?._id)}
                    >Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default AdminProductView