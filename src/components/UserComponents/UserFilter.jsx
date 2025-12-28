import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'


const options = {
    category: [
        {
            id: "men",
            label: "Men",
        },
        {
            id: "Women",
            label: "Women",
        },
        {
            id: "kids",
            label: "Kids",
        },
        {
            id: "accessories",
            label: "Accessories",
        },
        {
            id: "footwear",
            label: "Footwear",
        },
    ],
    brand: [
        {
            id: "nike",
            label: "Nike",
        },
        {
            id: "adidas",
            label: "Adidas",
        },
        {
            id: "puma",
            label: "Puma",
        },
        {
            id: "levis",
            label: "Levi's",
        },
        {
            id: "zara",
            label: "Zara",
        },
    ],
}


function UserFilter({ HandleFilter, filter }) {
    return (
        <Fragment>
            <div className="flex flex-col h-100 px-4 rounded-lg">
                <div className="border-b h-16 flex items-center">
                    <span className='font-bold text-lg'>Filters</span>
                </div>
                <div className="">
                    {
                        Object.keys(options).map((ObjectOptions, i) =>
                            <div className="" key={i}>
                                <h4 className='font-bold text-lg mt-2'>{ObjectOptions}</h4>
                                <div className='grid  gap-2'>
                                    {
                                        options[ObjectOptions].map(itemsOfOptions =>
                                            
                                            <Label key={itemsOfOptions.id} className="font-normal">
                                                <Checkbox
                                                checked={filter?.[ObjectOptions]?.includes(itemsOfOptions.id) || null}
                                                onCheckedChange={(e) => HandleFilter(ObjectOptions, itemsOfOptions.id)}
                                                />
                                                {itemsOfOptions.label}
                                            </Label>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default UserFilter