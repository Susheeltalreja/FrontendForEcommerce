import FormComponent from '@/components/CommonComponents/formLogic'
import { ForgetPasswordForm2 } from '@/config'
import { ForgetPassword } from '@/ReduxStates/authentication';
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

function ForgetPasswordF2() {

    const location = useLocation();
    const email = location.state.UserEmail;
    // console.log(email);

    const [password, setPassword] = useState({
        UserPassword: "",
        cpassword: "",
        UserEmail: email
    })
    console.log(password)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function HandleForgetPassword(e){
        e.preventDefault();
        dispatch(ForgetPassword(password)).then((data) => {
            if(data?.payload?.success){
                toast.success(`${data?.payload?.message}`);
                navigate("/auth/login");
            }else{
                toast.error(`${data?.payload?.message}`);
            }
        })
    }

  return (
    <Fragment>
        <div className="w-96 px-4">
            <FormComponent
            formType={ForgetPasswordForm2}
            formData={password}
            setFormData={setPassword}
            onSubmit={HandleForgetPassword}
            btnText={"Update"}
            ></FormComponent>
        </div>
    </Fragment>
  )
}

export default ForgetPasswordF2