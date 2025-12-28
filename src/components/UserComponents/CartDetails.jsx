import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { ArrowBigLeft, Handbag, Minus, Plus, Trash, X } from 'lucide-react'

import AuthImage from "../../images/authImage.jpg";
import { ButtonGroup } from '../ui/button-group';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutCart, DeleteItemInCart, FetchProductForCart, UpdateItemsInCart } from '@/ReduxStates/UserStates/UserCartState';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

function CartDetails({ openCart, setOpenCart }) {

    const { user } = useSelector(state => state.Auth)

    const { CartItems } = useSelector(state => state.Cart)
    const [total, setTotal] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const [address, setAddress] = useState("");
    console.log("Cart Items: ", CartItems);

    // console.log(user)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchProductForCart(user?.id));
    }, [user?.id])

    function IncreaseQuantity(id, currentQty) {
        let Increase = currentQty + 1;
        // console.log("id", id)
        // console.log("userid: ", user?.id);
        // console.log("Current Quantity: ", currentQty)
        // console.log("Increase Quantity: ", Increase)
        let Data = {
            UserId: user?.id,
            ProductId: id,
            quantity: Increase
        }
        dispatch(UpdateItemsInCart(Data)).then(() => dispatch(FetchProductForCart(user?.id)));
    }

    function DecreaseQuantity(id, currentQty) {
        let Decrease = currentQty - 1;
        // console.log("id", id)
        // console.log("userid: ", user?.id);
        // console.log("Current Quantity: ", currentQty)
        // console.log("Decrease Quantity: ", Decrease)
        let Data = {
            UserId: user?.id,
            ProductId: id,
            quantity: Decrease
        }
        dispatch(UpdateItemsInCart(Data)).then(() => dispatch(FetchProductForCart(user?.id)));
    }

    function HandleDelete(id) {
        let CartData = {
            UserId: user?.id,
            ProductId: id
        }
        dispatch(DeleteItemInCart(CartData)).then((e) => {
            if (e?.payload?.success) {
                dispatch(FetchProductForCart(user?.id));
                toast.success(`${e?.payload?.message}`)
            } else {
                toast.error(`${e?.payload?.message}`)
            }
        });
    }

    useEffect(() => {
        if (CartItems && CartItems.length > 0) {
            let total = 0;
            CartItems.map((e) => {
                total += (e.ProductId.saleprice > 0 && e.ProductId.saleprice != null ? e.ProductId.saleprice : e.ProductId.price) * e.quantity;
            });
            setTotal(total)
        } else {
            setTotal(0);
        }
    }, [CartItems])

    function handleCheckout() {
        if (CartItems && CartItems.length == 0) {
            toast.error("Cart is empty");
        } else {
            let data = {
                UserId: user?.id,
                totalAmount: total,
                address: address
            }
            dispatch(CheckoutCart(data)).then((e) => {
                if (e?.payload?.success) {
                    dispatch(FetchProductForCart(user?.id));
                    setOpenCart(false);
                    setCheckout(false);
                    toast.success(`${e?.payload?.message}`)
                } else {
                    toast.error(`${e?.payload?.message}`)
                }
            })
        }
    }

    return (
        <Sheet open={openCart} onOpenChange={setOpenCart}>
            <SheetContent side='right'>
                <SheetTitle>
                    {
                        !checkout ? (<div className="flex w-full p-4 gap-2">
                            <Handbag />
                            <span>
                                {CartItems.length} items
                            </span>
                        </div>) : (
                            <div className="flex w-full p-4 gap-2">
                                <Button variant="outline" onClick={() => setCheckout(false)}><ArrowBigLeft /></Button>
                            </div>
                        )
                    }
                    <hr />
                </SheetTitle>
                <div className="w-full p-3 h-[600px] overflow-auto space-y-3">
                    {
                        !checkout ? (CartItems && CartItems.length > 0 ? CartItems.map((items) => (
                            <div className="border w-full h-[130px] rounded-sm flex items-center justify-around" key={items?.ProductId?._id}>
                                <img src={items?.ProductId?.ProductImage} alt="" className='h-[100px] w-[25%] object-cover rounded-md' />
                                <div className="space-y-2">
                                    <div className="mt-4">
                                        <h3 className='font-bold text-lg'>{items?.ProductId?.title}</h3>
                                        <h3 className='text-sm text-gray-400'>{items?.ProductId?.category}</h3>
                                    </div>
                                    <ButtonGroup>
                                        <Button variant="outline" className="w-10" onClick={() => IncreaseQuantity(items?.ProductId?._id, items?.quantity)}>
                                            <Plus />
                                        </Button>
                                        <span className="px-4 py-1 border w-10">
                                            {items?.quantity}
                                        </span>
                                        <Button variant="outline" className="w-10" onClick={() => DecreaseQuantity(items?.ProductId?._id, items?.quantity)}>
                                            <Minus />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                                <div className="flex flex-col justify-end items-end gap-6">
                                    <h4>Rs. {(items?.ProductId?.saleprice > 0 && items?.ProductId?.saleprice != null ? items?.ProductId?.saleprice : items?.ProductId?.price) * items.quantity}</h4>
                                    <Button variant="outline" onClick={() => HandleDelete(items?.ProductId?._id)}>
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                        )) : "No products in Cart") : (
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input type="text" placeholder="Enter your address?" onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                        )
                    }
                </div>
                <div className="w-full px-4">
                    <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-bold">Total</h3>
                        <h3 className="text-lg font-bold">{total}</h3>
                    </div>
                    <Button className="w-full mb-2" onClick={() => {
                        checkout ? handleCheckout() : setCheckout(true)
                    }}>Checkout</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartDetails