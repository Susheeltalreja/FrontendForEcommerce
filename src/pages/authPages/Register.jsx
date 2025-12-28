import FormComponent from '@/components/CommonComponents/formLogic'
import { registerFormInput } from '@/config'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

//Dispatch
import { useDispatch } from 'react-redux';
//Imort register user from redux slice auth slice
import {RegisterUser}  from '../../ReduxStates/authentication';
//Sonner => toast

import { toast } from 'sonner';

function Register() {
  const [formData, setFormData] = useState({
    UserName: "",
    UserEmail: "",
    UserPassword: ""
  });
  const disptach = useDispatch();
  const navigate = useNavigate();
  function Submit(e){
    e.preventDefault();
    console.log(formData)
    disptach(RegisterUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast.success(`${data.payload.message}`)
        navigate('/auth/otp', {
          state: {
            email : formData.UserEmail
          }
        });
      }else{
        toast.error(`${data.payload.message}`)
        console.log("ERROR");
      }
    });
  }
  return (
    <div className='w-full p-6'>
      <div className="text-center text-2xl font-bold">
        <h2>Sign Up</h2>
      </div>
      <FormComponent
      formType={registerFormInput}
      formData={formData}
      setFormData={setFormData}
      onSubmit={Submit}
      btnText="Register"
      ></FormComponent>
      <div className="text-center">
        <p>Already Have an account? <Link to="/auth/login" className='mx-1 font-bold hover:underline'>Login</Link> </p>
      </div>
    </div>
  )
}

export default Register