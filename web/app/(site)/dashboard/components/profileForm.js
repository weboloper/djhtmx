"use client";
import React, { useState, useEffect } from "react";
import Avatar from "@/app/components/Avatar";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [bio, setBio] = useState(user.profile.bio);
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("bio", bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    // if (avatar) formData.set("profile.avatar", avatar);
    // formData.append("first_name", first_name);
    // formData.append("profile.bio", bio); // Nested profile data

    const res = await fetch(`/api/auth/update/`, {
      method: "POST",
      body: formData,
    });

    const updatedProfile = await res.json();
    if (res.ok) {
      dispatch({ type: "UPDATE_PROFILE", payload: updatedProfile });
      toast.success("Değişikler başarıyla kaydedildi.");
    }
    if (updatedProfile?.detail) toast.error(updatedProfile.detail);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-start pb-3 border-bottom">
          <Avatar user={user} size={60} />

          <div className="ms-sm-4 ms-2" id="img-section">
            <b>Profile Photo</b>
            <p>Accepted file type .png. Less than 1MB</p>

            <input
              type="file"
              id="avatarInput"
              name="avatar"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="py-2">
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="firstname">Adınız</label>
              <input
                className="form-control"
                id="nameInput"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="lastname">Soyadınız</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-12">
              <label htmlFor="bio">Hakkınızda</label>
              <textarea
                className="form-control"
                name="bio"
                id="bioInput"
                rows="3"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>
          </div>

          <div className="py-3 pb-4 border-bottom">
            <button type="submit" className="btn btn-primary ">
              Kaydet
            </button>
            {/* <LoadingButton
        isLoading={isLoading}
        classes="btn btn-primary "
        text="Değişiklikleri kaydet"
      ></LoadingButton> */}
          </div>
          <div className="d-sm-flex align-items-center pt-3" id="deactivate">
            <div>
              <b>Deactivate your account</b>
              <p>Details about your company account and password</p>
            </div>
            <div className="ms-auto">
              <button className="btn btn-danger">Deactivate</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
