import { useEffect } from "react";
import { GrUpdate, GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from '../redux/userSlice'
import axios from "axios";

 



const Users = () => {

  const dispatch = useDispatch();
  const users = useSelector(state=>state.users.users)
  console.log(users);

  useEffect(()=> {
    const fetchData = async() => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            dispatch(getUser(response.data));
        } catch(err) {
            console.log(err)
        }
    }
    fetchData();
   
}, [])



    const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-for-toy.vercel.app/order/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your order has been deleted.", "success");

              const remaining = orders.filter((order) => order._id !== id);
              setOrders(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
     
      <div className="text-center mt-5 mb-5 mx-auto">
     <Link to={'/add-user'}> <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Add user +++ </button> </Link>

      </div>

      <h3 className="text-2xl font-semibold my-4">
        {/* Total users: {users.length} */}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-red-500 text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td> {user.name}</td>
                <Link to={`view-user/${user.id}`}>
                  {" "}
                  <td>
                    <button className="btn  btn-outline btn-sm bg-green-500">
                      {/* <GrView className="text-white" /> */}
                      viiew
                    </button>
                  </td>
                </Link>

                <Link to={`/add-user/${user.id}`}>
                  {" "}
                  <td>
                    <button className="btn btn-circle btn-outline btn-sm bg-green-500">
                      <GrUpdate className="text-white" />
                    </button>
                  </td>
                </Link>

                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-circle btn-outline btn-sm bg-red-500"
                  >
                    <MdDelete className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;