import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OtpResend, OtpVerify } from '@/ReduxStates/authentication';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function OtpVerificationForm() {
    const lengthOfInputs = 4;

    const InputsRef = useRef([]);

    const [otp, setOtp] = useState("");

    const location = useLocation();

    if(!location.state){
        return <Navigate to="/auth/login"></Navigate>
    }


    const email = location.state.email;

    console.log(email);

    function handleChange(ele, index){
        const value = ele.target.value.slice(0, 1);

        const OtpArray = otp.split("");
        OtpArray[index] = value;
        let ConvertOtp = OtpArray.join("");
        setOtp(ConvertOtp);

        if(value && index < lengthOfInputs - 1){
            console.log("Hello")
            InputsRef.current[index + 1].focus();
        }

    }

    function hanldeKeyDown(e, index){
        // console.log(e.key, "events")
        if(e.key === "Backspace" && index > 0 && !otp[index]){
                InputsRef.current[index - 1].focus();
        }
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function HandleOtpVerify(){
        const data = {
            UserEmail: email,
            OTP: otp
        }
        dispatch(OtpVerify(data)).then((output) => {
            if(output?.payload?.success){
                toast.success(output?.payload?.message);
                navigate("/auth/login")
            }else{
                toast.error(output?.payload?.message);
            }
        });
    }

    function ResendOtpWithEmail(e){
        e.preventDefault();
        const emails = {
            UserEmail: email
        }
        dispatch(OtpResend(emails)).then((event) => {
            if(event?.payload?.success){
                toast.success(event?.payload?.message);
            }else{
                toast.error(event?.payload?.message);
            }
        });
    }

    console.log(otp, "OTP");

    return (
        <div className='px-4 flex flex-col gap-4'>
            <div className="flex gap-2">
                {
                    Array.from({ length: lengthOfInputs }).map((_,index) => (
                        <Input
                        key={index}
                        className="w-[50px] text-center"
                        maxLength={1}
                        ref={(element) => InputsRef.current[index] = element}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => hanldeKeyDown(e, index)}
                        />
                    ))
                }
            </div>
            <a onClick={ResendOtpWithEmail} className='cursor-pointer'>Resend Otp?</a>
                <Button onClick={HandleOtpVerify} className="cursor-pointer">Verify</Button>
        </div>
    )
}

export default OtpVerificationForm