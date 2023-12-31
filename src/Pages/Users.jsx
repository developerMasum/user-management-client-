import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../redux/userSlice";
import axios from "axios";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        dispatch(getUser(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://http://localhost:5000/delete/${id}`)
      .then((res) => {
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
      <div className="text-center mt-5 mb-5 mx-auto">
        <Link to={"/add-user"}>
          {" "}
          <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Add user +++{" "}
          </button>{" "}
        </Link>
      </div>

      <h3 className="text-2xl font-semibold my-4">
      
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">

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
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    
                      view
                    </button>
                  </td>
                </Link>
                <td>
                <Link to={`/add-user/${user.id}`}>
                  {" "}
                 
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Edit
                    </button>
                 
                </Link>
</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                  Delete
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
