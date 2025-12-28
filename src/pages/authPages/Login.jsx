import FormComponent from '@/components/CommonComponents/formLogic'
import { loginFormInputs } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

//Import from redux auth state
import { LoginUser } from '../../ReduxStates/authentication/index';

//Import from react redux
import { useDispatch } from 'react-redux';

import { toast } from 'sonner';

function Login() {
  const [formData, setFormData] = useState({
    UserEmail: "",
    UserPassword: ""
  });
  const dispatch = useDispatch();
  function Submit(e){
    e.preventDefault();
    dispatch(LoginUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast.success(`${data?.payload?.message}`);
      }else{
        toast.error(`${data?.payload?.message}`);
      }
    });
  }
  return (
    <div className='w-full p-6'>
      <div className="text-center text-2xl font-bold">
        <h2>Sign In</h2>
      </div>
      <FormComponent
      formType={loginFormInputs}
      formData={formData}
      setFormData={setFormData}
      onSubmit={Submit}
      btnText="Sign In"
      ></FormComponent>
      <div className="flex justify-between items-center">
        <p>Not Have an account? <Link to="/auth/register" className='mx-1 font-bold hover:underline'>Register</Link> </p>
        <p>Forget Password? <Link to="/auth/forget" className='mx-1 font-bold hover:underline'>Click</Link> </p>
      </div>
    </div>
  )
}

export default Login