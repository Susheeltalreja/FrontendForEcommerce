import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { Fragment, useEffect, useState } from 'react'
import AuthImage from "../../images/authImage.jpg"
import { Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCompletInformation, UpdateStatusOfOrders } from '@/ReduxStates/AdminStates/CheckoutSlice';
import { toast } from 'sonner';
function UserAccounts() {
  const [open, setOpen] = useState(false);
  const [getData, setGetData] = useState(null);
  const dispatch = useDispatch();
  const [Viewdata, setViewData] = useState([]);
  const { completeOrderInfo } = useSelector(state => state.Checkout);
  const { user } = useSelector(state => state.Auth);

  useEffect(() => {
    dispatch(GetCompletInformation())
  }, [])
  console.log(user)
  useEffect(() => {
    setViewData(completeOrderInfo.filter((i) => i?.UserId?._id === user.id));
  }, [])
  console.log("Info", Viewdata)
  return (
    <Fragment>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[500px]">
          <DialogHeader>
            <DialogTitle>
              Products Details (id #{getData?._id})
            </DialogTitle>
          </DialogHeader>
          <div className=" space-y-2">
            <h1 className=''>Items ({getData?.CartItems?.filter((items) => items?.Status === "pending" || items?.Status === "Complete").length})</h1>

            <div className="grid grid-cols-1 gap-2 h-[300px] overflow-auto">
              {
                getData?.CartItems?.map((items) => (
                  <div className="border w-full h-20 flex items-center justify-between px-4 py-2">
                    <div className="">
                      <img src={items?.ProductId?.ProductImage} alt="" className='h-15 rounded-xl object-cover w-[80%]' />
                    </div>
                    <div className="grid w-[50%]">
                      <div className="flex justify-between items-center">
                        <h1 className='font-bold text-lg'>{items?.ProductId?.title}</h1>
                        <h2 className='font-light text-sm'>{items?.ProductId?.price}</h2>
                      </div>
                      <div className="flex justify-between items-center">
                        <h1 className='font-light text-sm'>{items?.ProductId?.category}</h1>
                        <h2 className='font-light text-sm'>Qty: {items?.quantity}</h2>
                      </div>
                    </div>
                    {
                      items?.Status === "pending" ? (<span className='px-2 bg-yellow-500 py-1 rounded-lg text-white'>Pending</span>) : (items?.Status === "Complete") ? (<span className='px-2 bg-green-500 py-1 rounded-lg text-white'>Complete</span>) : (<span className='px-2 bg-red-500 py-1 rounded-lg text-white'>Cancel</span>)
                    }
                  </div>
                ))
              }
            </div>
            <div className="flex justify-between items-center w-full">
              <h1 className='font-bold text-lg'>Total</h1>
              <h1 className='font-bold text-lg'>{getData?.CartItems?.filter((items) => items?.Status === "pending" || items?.Status === "Complete").reduce((total, item) => total + item?.ProductId?.price * item?.quantity, 0)}</h1>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-2 grid-cols-1 p-10">
        {
          Viewdata && Viewdata.length > 0 ?
            Viewdata.map((detail, i) => (
              <div className="border h-20 flex justify-between items-center px-4">
                <h1>Id #{i + 1}</h1>
                <h2>{detail?.UserId?.UserName}</h2>
                <p className='overflow-hidden w-[20%] whitespace-nowrap overflow-ellipsis'>{detail?.address}</p>
                <p>{detail?.Status}</p>
                <p>{detail?.Payment}</p>
                <p>{detail?.purchaseAt.split("T")[0]}</p>
                <Button onClick={() => { setGetData(detail); setOpen(true) }}>View Details</Button>
              </div>
            )) : "no orders available"
        }
      </div>
    </Fragment>
  )
}

export default UserAccounts
