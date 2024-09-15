"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

const Avatar = ({ user, size }) => {
  const [imageError, setImageError] = useState(false);

  // Function to handle image error
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      {imageError ? (
        <Image
          src="/img/default-avatar.png"
          width={size}
          height={size}
          className={styles.avatar}
          alt={user?.username + " avatar"}
        />
      ) : (
        <Image
          src={user?.profile.avatar || "/img/default-avatar.png"}
          width={size}
          height={size}
          className={styles.avatar}
          alt={user?.username + " avatar"}
          onError={handleImageError}
        />
      )}
    </>
  );
};

export default Avatar;
