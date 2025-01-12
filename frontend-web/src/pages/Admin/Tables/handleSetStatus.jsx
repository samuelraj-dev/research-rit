// import axios from "axios";
// import { toast } from "react-toastify";

// export const handleSetStatus = async (id, type) => {
//     try {
//       const response = await axios.patch(`http://localhost:5000/api/research-papers/set-status/${id}/${type}`, {}, {
//         withCredentials: true,
//       });

//       if (response.status == 204) {
//         toast.success(`status updated to ${type}`);
//       } else {
//         toast.error(`failed to update status`)
//       }
//     } catch (error) {
//       toast.error(`failed to update status`)
//       console.log(error)
//     }
// }