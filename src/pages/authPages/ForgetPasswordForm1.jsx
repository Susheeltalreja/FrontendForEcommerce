import FormComponent from '@/components/CommonComponents/formLogic'
import { ForgetPasswordForm1 } from '@/config'
import { FindUser } from '@/ReduxStates/authentication';
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function ForgetPasswordF1() {

  const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function CheckUser(e) {
    e.preventDefault();
    dispatch(FindUser(inputData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(`${data?.payload?.message}`);
        navigate("/auth/update", {
          state: {
            UserEmail: inputData.UserEmail
          }
        })
      } else {
        toast.error(`${data?.payload?.message}`);
      }
    })
  }

  return (
    <Fragment>
      <div className="w-96 px-4">
        <FormComponent
          formType={ForgetPasswordForm1}
          formData={inputData}
          setFormData={setInputData}
          onSubmit={CheckUser}
          btnText={"Submit"}
        >
        </FormComponent>
      </div>
    </Fragment>
  )
}

export default ForgetPasswordF1