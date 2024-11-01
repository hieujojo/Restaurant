import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { GET_PROFILE_USE, UPDATE_USER_ENDPOINT } from '@/utils/constants/endpoints';
interface UserDetails {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  img: string;
}
const Profile = () => {


  const [details, setDetails] = useState<UserDetails>();
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedImage, setSelectedImage] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedGender, setUpdatedGender] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(GET_PROFILE_USE, {
          withCredentials: true,
        });
        setDetails(res.data);

        setUpdatedName(res.data.name);
        setUpdatedEmail(res.data.email);
        setUpdatedGender(res.data.gender);
        setUpdatedPhone(res.data.phone);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile()

  }, []);
  const handleEditProfileClick = () => {
    if (details) {
      setIsEditing(true);
      setSelectedImage(details.img || '');
    }
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSave = async () => {
    if (!details) return;

    const updatedDetails = {
      ...details,
      name: updatedName,
      email: updatedEmail,
      gender: updatedGender,
      phone: updatedPhone,
      img: selectedImage || details.img,
    };

    try {
      const response = await axios.put(UPDATE_USER_ENDPOINT(details._id),
        updatedDetails, {
        withCredentials: true,
      }
      );

      setDetails(updatedDetails);
      localStorage.setItem("user", JSON.stringify({ details: updatedDetails }));

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Layout>
      <div className="relative top-[110px] bg-black min-h-screen container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/2 p-5">
          <h1 className="text-center text-2xl text-[#C9AB81]">Profil personnel</h1>
          <div className="mt-5 ml-[25%] text-white h-[100%] w-[60%] justify-items-center">
            {details?.img ? (
              <img src={details.img || "Not specified"} alt="Profile" />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-20">
          {/* Hiển thị thông tin */}
          <div className="flex items-center my-4">
            <label htmlFor="name" className="block text-lg font-medium text-[#C9AB81] w-1/3">Name:</label>
            <div className="w-2/3 ml-[-40px]">
              <span id="name" className="h-10 text-[#f9f9f8] rounded pl-2">
                {details?.name || "Not specified"}
              </span>
              <div className="border-b border-[#C9AB81] mt-1"></div>
            </div>
          </div>

          <div className="flex items-center my-4">
            <label htmlFor="email" className="block text-lg font-medium text-[#C9AB81] w-1/3">Email:</label>
            <div className="w-2/3 ml-[-40px]">
              <span id="email" className="h-10 text-[#f9f9f8] rounded pl-2">
                {details?.email || "Not specified"}
              </span>
              <div className="border-b border-[#C9AB81] mt-1"></div>
            </div>
          </div>

          <div className="flex items-center my-4">
            <label htmlFor="gender" className="block text-lg font-medium text-[#C9AB81] w-1/3">Gender:</label>
            <div className="w-2/3 ml-[-40px]">
              <span id="gender" className="h-10 text-[#f9f9f8] rounded pl-2">
                {details?.gender || "Not specified"}
              </span>
              <div className="border-b border-[#C9AB81] mt-1"></div>
            </div>
          </div>

          <div className="flex items-center my-4">
            <label htmlFor="phone" className="block text-lg font-medium text-[#C9AB81] w-1/3">Phone:</label>
            <div className="w-2/3 ml-[-40px]">
              <span id="phone" className="h-10 text-[#f9f9f8] rounded pl-2">
                {details?.phone || "Not specified"}
              </span>
              <div className="border-b border-[#C9AB81] mt-1"></div>
            </div>
          </div>

          <div className="mt-10">
            <button onClick={handleEditProfileClick}
              className="my-[10px] bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-[90%]">
              Edit Profile
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="flex absolute top-10 left-0 w-full h-full bg-black min-h-screen bg-opacity-90 flex justify-center items-center z-50">
            <div className="  Update_Profile   border-[2px] border-[#C9AB81] bg-black min-h-screen p-5 w-[70%]">
              <div className="flex top-0 justify-between mb-[5px]">
                <h1 className="text-center text-2xl text-[#C9AB81]">Update Profile </h1>
                <button onClick={handleCloseClick}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex mt-[2%] mb-[2%]">
                <div className="left-0 ">
                  {selectedImage && (
                    <div className="mt-4">
                      <img src={selectedImage} alt="Selected" className="w-[300px] h-[300px]" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-2 p-2 bg-gray-800 text-white"
                  />
                </div>

                <form className="ml-[10%] right-0 w-[40%]  " onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}>
                  <div className="flex items-center my-8">
                    <label htmlFor="update_name" className="block text-lg font-medium text-[#C9AB81] w-1/3">Name:</label>
                    <input
                      type="text"
                      id="update_name"
                      name="update_name"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      placeholder="Your name"
                      className="w-2/3 h-10 border border-gray-300 rounded pl-2"
                    />
                  </div>
                  <div className="flex items-center my-8">
                    <label htmlFor="update_email" className="block text-lg font-medium text-[#C9AB81] w-1/3">Email:</label>
                    <input
                      type="email"
                      id="update_email"
                      name="update_email"
                      value={updatedEmail}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-2/3 h-10 border border-gray-300 rounded pl-2"
                    />
                  </div>
                  <div className="flex items-center my-8">
                    <label htmlFor="update_gender" className="block text-lg font-medium text-[#C9AB81] w-1/3">Gender:</label>
                    <input
                      type="text"
                      id="update_gender"
                      name="update_gender"
                      value={updatedGender}
                      onChange={(e) => setUpdatedGender(e.target.value)}
                      placeholder="Your gender"
                      className="w-2/3 h-10 border border-gray-300 rounded pl-2"
                    />
                  </div>
                  <div className="flex items-center my-8">
                    <label htmlFor="update_phone" className="block text-lg font-medium text-[#C9AB81] w-1/3">Phone:</label>
                    <input
                      type="text"
                      id="update_phone"
                      name="update_phone"
                      value={updatedPhone}
                      onChange={(e) => setUpdatedPhone(e.target.value)}
                      placeholder="Your phone"
                      className="w-2/3 h-10 border border-gray-300 rounded pl-2"
                    />
                  </div>
                  <div className="flex justify-end mt-10">
                    <button onClick={handleCloseClick}
                      className="mx-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                      Close
                    </button>
                    <button type="submit"
                      className="mx-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
