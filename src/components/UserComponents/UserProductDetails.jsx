import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarHalfIcon, StarIcon } from 'lucide-react'
import { Input } from '../ui/input'

function UserProductDetails({ Open, setOpen, product }) {
    return (
        <Dialog open={Open} onOpenChange={setOpen}>
            <DialogContent className="min-w-[50vw]">
                <div className="grid grid-cols-2 gap-6">
                    <div className="min-w-full">
                        <img src={product?.ProductImage} alt={product?.title} className='min-h-[500px] object-cover min-w-[50%] rounded-lg' />
                    </div>
                    <div className="">
                        <div className="">
                            <h3 className='text-2xl text-foreground'>{product?.title}</h3>
                            <p>{product?.description}</p>
                            <div className="">
                                <h3 className={`${product?.saleprice && product?.saleprice != 0 ? "line-through" : ""} text-[16px] font-bold`}>Rs. {product?.price}</h3>
                                {
                                    product?.saleprice && product?.saleprice != 0 ? <h3 className="text-[16px] font-bold">Rs. {product?.saleprice}</h3> : ""
                                }
                                <div className="flex items-center">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                <h3>(400)</h3>
                                </div>
                            </div>
                            <div className="">
                                <Button className="w-full cursor-pointer">Add to cart</Button>
                            </div>
                        </div>
                        <div className="mt-5 space-y-2 overflow-auto h-[300px]">
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-2 rounded-lg flex justify-between w-full items-center">
                                <Avatar>
                                    <AvatarFallback>ST</AvatarFallback>
                                </Avatar>
                                <div className="w-[50%]">
                                    <h3>Susheel Kumar</h3>
                                    <p className='overflow-hidden w-full overflow-ellipsis whitespace-nowrap text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius eum reprehenderit, saepe, voluptas quasi nam exercitationem minus doloribus dolores officia facere consequatur rem voluptates consectetur tempore ex voluptatum pariatur alias.</p>
                                </div>
                                <div className="flex">
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarIcon className='w-5 h-5 fill-black'></StarIcon>
                                    <StarHalfIcon className='w-5 h-5 fill-black'></StarHalfIcon>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-3 gap-2">
                            <Input />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserProductDetails