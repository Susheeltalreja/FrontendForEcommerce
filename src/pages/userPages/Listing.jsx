import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import UserFilter from '@/components/UserComponents/UserFilter'
import UserProductDetails from '@/components/UserComponents/UserProductDetails'
import UserProductView from '@/components/UserComponents/UserProductView'
import { FetchAllProductsForUser, FindProductDetails } from '@/ReduxStates/UserStates/UserProductState'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const config = [
  {
    id: "Price lowtohigh",
    label: "Price: Low to High"
  },
  {
    id: "Price highttolow",
    label: "Price: High to Low"
  },
  {
    id: "OrdersA to Z",
    label: "Orders: A to Z"
  },
  {
    id: "OrdersZ to A",
    label: "Orders: Z to A"
  },
]

function CreateSearchParams(filter){
  const queryString = [];
  for(const [key, value] of Object.entries(filter)){
    if(Array.isArray(value) && value.length > 0){
      const params = value.join(",");
      queryString.push(`${key}=${params}`)
    }
  }
  return queryString.join("&")
}

function UserProducts() {

  const { productList, ProductDetails } = useSelector(st => st.UserProducts);

  const [filter, setFilter] = useState({});

  const [sort, setSort] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAllProductsForUser({filter, sort}));
  }, [dispatch, filter, sort])



  function handleSort(value){
    setSort(value)
  }
  function HandleFilter(Section, Options){
    let newOptions = {...filter};
    if(!newOptions[Section]){
      newOptions[Section] = [Options];
    }else{
      let index = newOptions[Section].indexOf(Options);
      if(index === -1){
        newOptions[Section].push(Options);
      }else{
        newOptions[Section].splice(index, 1)
      }
    }
    setFilter(newOptions);
    sessionStorage.setItem("filters", JSON.stringify(newOptions));
  }

  function handleProductDetails(id){
    dispatch(FindProductDetails(id));
  }

  useEffect(() => {
    setSort("Price lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [])
  
  useEffect(() => {
    const buildQuery = CreateSearchParams(filter)
    setSearchParams(new URLSearchParams(buildQuery));
  }, [filter])

  useEffect(() => {
    if(ProductDetails != null){
      setOpen(true)
    }
  }, [ProductDetails])

  return (
    <Fragment>
      <div className="w-full grid gap-4 p-4 md:p-6 md:grid-cols-[300px_1fr] grid-cols-1">
        <UserFilter filter={filter} HandleFilter={HandleFilter}/>
        <div className="w-full flex flex-col rounded-xl">
          <div className="flex justify-between items-center border-b h-16 px-4">
            <h4 className='font-bold text-xl'>All Products</h4>
            <div className="flex gap-2 items-center">
              <h4>Products: {productList.length}</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDownIcon />
                    <span>Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] mr-6">
                  <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSort}
                  >
                    {
                      config && config.length > 0 ? config.map(options =>
                        <DropdownMenuRadioItem
                        value={options.id}
                        className="" key={options.id}>
                          {
                            options.label
                          }
                        </DropdownMenuRadioItem>
                      ) : null
                    }
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2'>
            {
              productList && productList.length > 0 ? 
              (
                productList.map((items, i) => <UserProductView key={i} product={items} handleProductDetails={handleProductDetails}/>)
              ) : ("null")
            }
          </div>
        </div>
        <UserProductDetails Open={open} setOpen={setOpen} product={ProductDetails} />
      </div>
    </Fragment>
  )
}

export default UserProducts