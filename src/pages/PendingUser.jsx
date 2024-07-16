import { useQuery } from "@tanstack/react-query";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const user = true;

const PendingUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingUsers = [], refetch } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-users");
      return res.data;
    },
  });

  const makeUser = async (user) => {
    const res = await axiosSecure.patch(`/make-user/${user._id}`);

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user?.name} is an admin now!`,
        showConfirmButton: false,
        timer: 1999,
      });
    }
  };

  return (
    <div className='mt-5 w-[90%] mx-auto p-6 bg-white  rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 '>All Pending Users ....... </h2>
      <table className='min-w-full bg-white '>
        <thead>
          <tr>
            <th className='px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              #
            </th>
            <th className='px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              Email
            </th>

            <th className='px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user, index) => (
            <tr key={index} className='hover:bg-gray-100'>
              <td className='px-4 py-2 border-b border-gray-200'>
                {index + 1}
              </td>
              <td className='px-4 py-2 border-b border-gray-200'>
                {user?.name}
              </td>
              <td className='px-4 py-2 border-b border-gray-200'>
                {user?.email}
              </td>

              <td className='px-4 py-2 border-b border-gray-200'>
                {user?.status}
              </td>
              <td className='px-4 py-2 border-b border-gray-200'>
                <div className='flex space-x-2'>
                  {user?.status === "approved" ? (
                    ""
                  ) : (
                    <button
                      onClick={() => makeUser(user)}
                      className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                    >
                      Approve User
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingUser;
