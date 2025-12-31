import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const API_BASE_URL = "http://127.0.0.1:8000";

const Profile = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     FETCH PROFILE
  ========================== */
  useEffect(() => {
    if (!auth?.access) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/user/profile/`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        });

        const profile = res.data.profile;

        setUser(profile);
        setFormData(profile);
        setPreview(
          profile.profile_photo
            ? `${API_BASE_URL}${profile.profile_photo}`
            : null
        );
      } catch (err) {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth, logout, navigate]);

  /* =========================
     INPUT HANDLER
  ========================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_photo" && files?.[0]) {
      setFormData((prev) => ({ ...prev, profile_photo: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* =========================
     UPDATE PROFILE
  ========================== */
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "profile_photo") {
          // append ONLY if user selected a new image
          if (formData.profile_photo instanceof File) {
            data.append("profile_photo", formData.profile_photo);
          }
        } else {
          if (formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
          }
        }
      });

      const res = await axios.patch(
        `${API_BASE_URL}/auth/user/profile/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const profile = res.data.profile;

      setUser(profile);
      const { profile_photo, ...rest } = profile;
      setFormData(rest);
      setPreview(
        profile.profile_photo ? `${API_BASE_URL}${profile.profile_photo}` : null
      );
      setEditMode(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  console.log(formData.profile_photo);


  /* =========================
     SAFE GUARDS
  ========================== */
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Profile not found</p>;

  /* =========================
     UI
  ========================== */
  return (
    <div className="sign-back min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <Link
          to="/"
          className="text-gray-700 font-semibold flex items-center gap-1"
        >
          <ArrowBackIcon /> Back
        </Link>

        <h2 className="text-2xl font-bold my-4 text-center">My Profile</h2>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-4">
          <img
            src={
              preview ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {!editMode ? (
          <>
            <div className="space-y-2 text-gray-800">
              <p>
                <b>Username:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email || "N/A"}
              </p>
              {/* <p>
                <b>Phone:</b> {user.phone_number || "N/A"}
              </p> */}
              <p>
                <b>First Name:</b> {user.first_name || "N/A"}
              </p>
              <p>
                <b>Last Name:</b> {user.last_name || "N/A"}
              </p>
              <p>
                <b>Address:</b> {user.address || "N/A"}
              </p>
              <p>
                <b>Pincode:</b> {user.pincode || "N/A"}
              </p>
              <p>
                <b>State:</b> {user.state || "N/A"}
              </p>
              <p>
                <b>Country:</b> {user.country || "N/A"}
              </p>
              <p>
                <b>DOB:</b> {user.date_of_birth || "N/A"}
              </p>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode || ""}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              placeholder="State"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              placeholder="Country"
              className="w-full border p-2 rounded"
            />
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input type="file" name="profile_photo" accept="image/*" />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-full bg-gray-400 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        )}

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
