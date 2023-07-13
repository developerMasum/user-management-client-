import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { addUser, updateUser } from "../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  console.log('from add',id);

  const newUpdatedUser = useSelector((state) => state.users.users.find(u => u.id === id));
  console.log('from add', newUpdatedUser);


  const onSubmit = (data) => {
    const name = data.name;
    const id = data.id;
    const email = data.email;
    const number = data.phoneNumber;
    console.log(data);
    axios
      .post("http://localhost:5000/newUser", { id, name, email, number })
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const OnUpdateSubmit = (data)=>{
    const name = data.name;
    const id = data.id;
    const email = data.email;
    const number = data.phoneNumber;
    console.log(data);
    axios
    .put(`http://localhost:5000/update/${id}`, { name, email, number })
    .then((res) => {
      dispatch(newUpdatedUser(res.data));
      navigate("/");
    })
    .catch((err) => console.log(err));
  }  
  return (
   <>
   {
    id ?  <form onSubmit={handleSubmit(OnUpdateSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="id" className="text-sm font-medium text-gray-700">
          ID
        </label>
        <input
          type="text"
          id="id"
          defaultValue={newUpdatedUser.id}
          {...register("id", { required: true })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.id && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          defaultValue={newUpdatedUser.name}
          {...register("name", {
            required: true,
            pattern: /^[A-Za-z]/i,
          })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && errors.name.type === "required" && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        {errors.name && errors.name.type === "pattern" && (
          <span className="text-red-500 text-sm">
            Name should not contain numbers
          </span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          defaultValue={newUpdatedUser.email}
          {...register("email", {
            required: true,
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
          })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && errors.email.type === "required" && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span className="text-red-500 text-sm">Invalid email address</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          defaultValue={newUpdatedUser.number}
          {...register("phoneNumber", {
            required: true,
            pattern: /^[0-9]{10}$/i,
          })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.phoneNumber && errors.phoneNumber.type === "required" && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
          <span className="text-red-500 text-sm">
            Phone number should be 10 characters
          </span>
        )}
      </div>

     
        <button
        type="submit"
        className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Update
      </button>
    </form>
     : 
     
     <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
     <div className="mb-4">
       <label htmlFor="id" className="text-sm font-medium text-gray-700">
         ID
       </label>
       <input
         type="text"
         id="id"
         {...register("id", { required: true })}
         className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />
       {errors.id && (
         <span className="text-red-500 text-sm">This field is required</span>
       )}
     </div>

     <div className="mb-4">
       <label htmlFor="name" className="text-sm font-medium text-gray-700">
         Name
       </label>
       <input
         type="text"
         id="name"
         {...register("name", {
           required: true,
           pattern: /^[A-Za-z]/i,
         })}
         className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />
       {errors.name && errors.name.type === "required" && (
         <span className="text-red-500 text-sm">This field is required</span>
       )}
       {errors.name && errors.name.type === "pattern" && (
         <span className="text-red-500 text-sm">
           Name should not contain numbers
         </span>
       )}
     </div>

     <div className="mb-4">
       <label htmlFor="email" className="text-sm font-medium text-gray-700">
         Email
       </label>
       <input
         type="email"
         id="email"
         {...register("email", {
           required: true,
           pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
         })}
         className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />
       {errors.email && errors.email.type === "required" && (
         <span className="text-red-500 text-sm">This field is required</span>
       )}
       {errors.email && errors.email.type === "pattern" && (
         <span className="text-red-500 text-sm">Invalid email address</span>
       )}
     </div>

     <div className="mb-4">
       <label
         htmlFor="phoneNumber"
         className="text-sm font-medium text-gray-700"
       >
         Phone Number
       </label>
       <input
         type="tel"
         id="phoneNumber"
         {...register("phoneNumber", {
           required: true,
           pattern: /^[0-9]{10}$/i,
         })}
         className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />
       {errors.phoneNumber && errors.phoneNumber.type === "required" && (
         <span className="text-red-500 text-sm">This field is required</span>
       )}
       {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
         <span className="text-red-500 text-sm">
           Phone number should be 10 characters
         </span>
       )}
     </div>

    
       <button
       type="submit"
       className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
     >
       Submit
     </button>
   </form>
   }
   
   
   </>
  );
};

export default AddUsers;
