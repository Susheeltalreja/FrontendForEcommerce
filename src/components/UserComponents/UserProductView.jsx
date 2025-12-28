import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemsInCart, FetchProductForCart } from '@/ReduxStates/UserStates/UserCartState'
import { toast } from 'sonner'

function UserProductView({ product, handleProductDetails }) {

    const {user} = useSelector(state => state.Auth)

    const dispatch = useDispatch();

    function HandleCart(id){
        // console.log("User Id: ", user?.id);
        // console.log("PRODUCT ID: ", id)
        // console.log('Quanytity: ', 1)
        // console.log(" i am working ");
        let data = {
            UserId: user?.id,
            ProductId: id,
            quantity: 1
        }
        dispatch(AddItemsInCart(data)).then((after) => {
             if(after?.payload?.success){
                dispatch(FetchProductForCart(user?.id));
                toast.success(`${after?.payload?.message}`);
            }else{
                 toast.error(`${after?.payload?.message}`)
             }   
        })
    }

    return (
        <Card className="p-0">
            <div className="" onClick={() => handleProductDetails(product?._id)}>
                <div className="relative">
                    <img src={product.ProductImage} className='w-full h-[300px] rounded-t-lg object-cover' alt={product.title} />

                    { 
                        product.saleprice && product.saleprice != 0 ? <Badge className="absolute top-2 right-2 text-[14px]" variant="destructive">Sale</Badge> : ''
                    }

                </div>
                <CardContent>
                    <h3 className='text-xl font-bold'>{product.title}</h3>
                    <div className="flex justify-between items-center w-full">
                        <h3 className='text-gray-500'>{product.category}</h3>
                        <h3 className='text-gray-500'>{product.brand}</h3>
                    </div>
                    <div className="flex justify-end items-center w-full gap-2">
                        <h3 className={`${product.saleprice && product.saleprice != 0 ? "line-through" : ""} text-[16px] font-bold`}>Rs. {product.price}</h3>
                        {
                            product.saleprice && product.saleprice != 0 ? <h3 className="text-[16px] font-bold">Rs. {product.saleprice}</h3> : ""
                        }
                    </div>
                    <p className='text-gray-500 overflow-hidden w-full overflow-ellipsis whitespace-nowrap'>
                        {product.description}
                    </p>
                </CardContent>
            </div>
                <CardFooter>
                    <Button className="w-full mt-2 mb-2" onClick={() => HandleCart(product?._id)}>Add To Cart</Button>
                </CardFooter>
        </Card>
    )
}

export default UserProductView