import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button';
import axios from 'axios';
import { Spinner } from '../ui/spinner';

function ImageUpload({ SelectImage, setSelectImage, UploadImage, setUploadImage, setIsLoading, isLoading }) {

    const inputRef = useRef("");

    function handleImageOnSelect(e) {
        console.log(e.target.files);
        const selectImage = e.target.files?.[0];
        if (selectImage) return setSelectImage(selectImage);
    }
    function RemoveImage() {
        setSelectImage("");
        setUploadImage("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }
    function HandleDragOver(e) {
        e.preventDefault();
    }
    function HandleDrop(e) {
        e.preventDefault();
        const DropSelectedImage = e.dataTransfer.files?.[0];
        if (DropSelectedImage) return setSelectImage(DropSelectedImage);
    }

    //Function to hold the logic of generate the url of image

    async function ImageUploadOnCloudinary() {
        if (!SelectImage) {
            return console.log("Image is not selected yet");
        }
        setIsLoading(true);
        const data = new FormData();
        data.append("ProductImage", SelectImage);
        const response = await axios.post("http://localhost:5000/products/generate-url", data);
        console.log(response);
        if (response?.data.success) {
            setUploadImage(response?.data.GenerateUrl.url)
        }
        console.log(UploadImage)
        setIsLoading(false);
    }

    useEffect(() => {
        if (!UploadImage && SelectImage != null) {
            ImageUploadOnCloudinary();
        }
    }, [SelectImage])

    return (
        <div className="flex flex-col gap-2">
            <Label>Image Upload</Label>
            <div onDragOver={HandleDragOver} onDrop={HandleDrop} className="h-32 border-2 border-gray-400 border-dashed rounded-lg">
                <Input type="file" id="image" className="hidden" ref={inputRef} onChange={handleImageOnSelect}></Input>
                {!SelectImage ?
                    (<Label htmlFor="image" className="flex justify-center items-center h-32 flex-col gap-2 cursor-pointer">
                        {
                            UploadImage && !SelectImage ?
                                <img src={UploadImage}
                                className='h-32 w-full rounded-xl object-cover'
                                />
                                : <div className='flex flex-col justify-center items-center gap-2'>
                                    <UploadCloudIcon size="50" />
                                    Drag & Drop or Click to select the image
                                </div>
                        }
                    </Label>) :

                    isLoading ?

                        (
                            <div className="flex justify-center items-center w-full h-32">
                                <Spinner className="size-8" />
                            </div>
                        )
                        :
                        (<div className="flex justify-between items-center p-4 h-32 gap-2">
                            <FileIcon size="30" />
                            <h4 className='font-bold'>{SelectImage.name}</h4>
                            <Button className="cursor-pointer" variant="ghost" onClick={RemoveImage}>
                                <XIcon />
                            </Button>
                        </div>)
                }
            </div>
        </div>
    )
}

export default ImageUpload