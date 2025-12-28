import React from 'react'
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../ui/select';
import { Textarea } from '../ui/textarea';

function FormComponent({ formType, formData, setFormData, btnText, onSubmit }) {

  function rendorInput(inputs) {
    let inputFeature = null;
    const inputValue = formData[inputs.name] || "";
    switch (inputs.componentType) {
      case "input":
        inputFeature = (
          <Input
            name={inputs.name}
            id={inputs.name}
            type={inputs.type}
            placeholder={inputs.placeholder}
            onChange={(element) => (
              setFormData({
                ...formData,
                [inputs.name]: element.target.value
              })
            )}
            value={inputValue}
          ></Input>
        )
        break;
      case "select":
        inputFeature = (
          <Select
            onValueChange={(element) => (
              setFormData({
                ...formData,
                [inputs.name]: element
              })
            )}
            value={inputValue}
            
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={inputs.placeholder}></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {inputs.options && inputs.options.length > 0 ?
                inputs.options.map((inputOptions) => (
                  <SelectItem key={inputOptions.id} value={inputOptions.id}>{inputOptions.label}</SelectItem>
                )) : null}
            </SelectContent>
          </Select>
        )
        break;
      case "textarea":
        inputFeature = (
          <Textarea
            name={inputs.name}
            id={inputs.name}
            placeholder={inputs.placeholder}
            onChange={(element) => (
              setFormData({
                ...formData,
                [inputs.name]: element.target.value
              })
            )}
            value={inputValue}
          ></Textarea>
        )
        break;
    }
    return inputFeature;
  }

  return (
    <form onSubmit={onSubmit} method='post'>
      <div className="flex flex-col gap-1">
        {formType.map((inputType) => (
          <div className='grid w-full gap-1.5' key={inputType.name}>
            <label>{inputType.label}</label>
            {rendorInput(inputType)}
          </div>
        ))}
        <button className='w-full rounded-3xl bg-black text-white p-1 my-2 cursor-pointer'>{btnText || "Submit"}</button>
      </div>
    </form>
  )
}

export default FormComponent