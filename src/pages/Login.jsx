import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const [pinError, setPinError] = useState("");
  const [anyError, setAnyError] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  //   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, pin, mobileNumber, email } = data;

    setAnyError("");
    setPinError("");

    if (pin.length > 5 || pin.length < 5) {
      setPinError("Pin length must be 5 numbers");
      return;
    } else {
      const userDetail = {
        name,
        pin,
        mobileNumber,
        email,
      };
      console.log({ userDetail });
      const user = await axiosSecure.post("/register", userDetail);

      console.log(user.data);

      if (user.data.insertedId) {
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name}, You user request is pending for admin approvel!`,
          showConfirmButton: false,
          timer: 3000,
        });
        // navigate("/");
      }
    }
  };

  return (
    <div className='bg-[#F2F3F3] bg-cover flex items-center justify-center min-h-screen'>
      <div className='relative min-h-[calc(100vh-100px)] max-w-xl px-20 py-5 mx-auto bg-white border rounded-lg shadow'>
        <Link to='/' className='absolute left-1 top-1 border rounded-full p-2'>
          <IoHomeOutline className='text-2xl text-purple-600' />
        </Link>

        <div className='flex flex-col items-center justify-center mb-2'>
          <img
            className='size-12 mb-2'
            src='https://i.ibb.co/K9mK4hh/taka-1.png'
            alt=''
          />
          <h2 className='text-2xl font-bold text-gray-800'>
            Sign in your account
          </h2>
          <p className='text-gray-600 font-medium'>
            Please enter detail below to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='block mb-1 text-base font-semibold text-gray-900'
            >
              Your Email / Phone Number
            </label>
            <input
              type='email'
              id='email'
              {...register("email", { required: true })}
              className='shadow-sm bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
              placeholder='Enter email / phone number'
            />
            {errors.email && (
              <span className='text-red-600 font-medium'>
                Your email is required
              </span>
            )}
          </div>

          <div className='mb-2'>
            <label
              htmlFor='pin'
              className='block mb-1 text-base font-semibold text-gray-900'
            >
              5-digit PIN (must be number)
            </label>
            <input
              type='number'
              id='pin'
              {...register("pin", { required: true })}
              className='shadow-sm bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
              placeholder='Enter secure pin'
            />
            {errors.pin && (
              <span className='text-red-600 font-medium'>
                Your pin is required
              </span>
            )}
            <p className='text-red-600 font-medium'>{pinError}</p>
          </div>

          <button
            type='submit'
            className='w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2'
          >
            <span className='w-max mx-auto'>Sign In</span>
          </button>
        </form>

        <p className='mt-2'>
          New here? Please
          <Link to='/register' className='ml-2 font-semibold'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
