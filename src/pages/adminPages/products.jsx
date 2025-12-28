import FormComponent from '@/components/CommonComponents/formLogic';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ClipboardList } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react'

import { addProductsFormElements } from '@/config';
import ImageUpload from '@/components/AdminComponents/imageUpload';
import { useDispatch, useSelector } from 'react-redux';

import { AddProduct, FetchProducts, UpdateProducts } from "../../ReduxStates/ProductStates/index";

import { toast } from 'sonner';

import AdminProductView from "../../components/AdminComponents/AdminProductView";

const initialState = {
  ProductImage: "",
  brand: "",
  category: "",
  description: "",
  price: 0,
  saleprice: 0,
  title: "",
  totalStock: 0
}

function AdminProducts() {
  const [open, setOpen] = useState(false);
  const [ProductData, setProductData] = useState(initialState);

  const [SelectImage, setSelectImage] = useState("");
  const [UploadImage, setUploadImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { productList } = useSelector(state => state.AdminProducts)

  const [ProductID, SetProductID] = useState(null);

  const dispatch = useDispatch();


  function onSubmit(e) {
    e.preventDefault();

    const payloadStructure = {
      ProductImage: UploadImage,
      brand: ProductData.brand,
      category: ProductData.category,
      description: ProductData.description,
      price: ProductData.price,
      saleprice: ProductData.saleprice,
      title: ProductData.title,
      totalStock: ProductData.totalStock
    }

    if (ProductID) {
      dispatch(UpdateProducts({
        id: ProductID,
        formData: payloadStructure
      })).then((data) => {
        if (data?.payload?.success) {
          toast.success(`${data?.payload?.message}`)
          dispatch(FetchProducts())
          setProductData("");
          setSelectImage("");
          setUploadImage("");
          setOpen(false);
        } else {
          toast.error(`${data?.payload?.message}`)
        }
      })
    } else {
      dispatch(AddProduct({
        ...ProductData,
        ProductImage: UploadImage
      })).then((data) => {
        if (data?.payload?.success) {
          toast.success(`${data?.payload?.message}`)
          dispatch(FetchProducts())
          setProductData("");
          setSelectImage("");
          setUploadImage("");
          setOpen(false);
        } else {
          toast.error(`${data?.payload?.message}`)
        }
      })
    }
  }

  useEffect(() => {
    dispatch(FetchProducts())
  }, [dispatch])

  // console.log(ProductData);
  // console.log(productList);
  return (
    <Fragment>
      <div className="w-full flex justify-end">
        <Button onClick={() => setOpen(true)} className="cursor-pointer">Add New Product</Button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
        {
          productList && productList.length > 0 ?

            productList.map((item) => <AdminProductView
              setOpen={setOpen}
              SetProductID={SetProductID}
              setProductData={setProductData}
              setUploadImage={setUploadImage}
              product={item} />)

            : "No product Found"
        }
      </div>
      <Sheet open={open} onOpenChange={
        () => {
          setOpen()
          setUploadImage(null)
          setProductData("")
        }
      }>
        <SheetContent side='right' className="w-96 p-5 overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <div className="flex gap-2 items-center">
                <ClipboardList />
                <h1 className='font-bold text-2xl'>Add Product Form</h1>
              </div>
            </SheetTitle>
          </SheetHeader>

          <ImageUpload
            SelectImage={SelectImage}
            setSelectImage={setSelectImage}
            UploadImage={UploadImage}
            setUploadImage={setUploadImage}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />

          <FormComponent
            formType={addProductsFormElements}
            formData={ProductData}
            setFormData={setProductData}
            btnText="Add"
            onSubmit={onSubmit}
          >
          </FormComponent>

        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts