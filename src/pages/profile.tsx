import React, { FormEvent, useRef, useState } from "react";
import { usePage } from "@/hooks/usePage";
import { auth, db, storage } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthUser, useSetAuthUser } from "@/atoms/useAuthUser";
import { doc, updateDoc } from "firebase/firestore";

import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import SettingIcon from "@/Icons/settingIcon";
import UploadIcon from "@/Icons/uploadIcon";
import FlashMessage from "@/components/flashMessage";
import { useFlashMessage } from "@/hooks/useFlashMessage";

const Profile = () => {
  const { toHome } = usePage();
  const authUser = useAuthUser();
  const setAuthUser = useSetAuthUser();
  const { flashState, messageState } = useFlashMessage(10000);
  const [image, setImage] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const updateUserProfile = async (
    uid: string,
    displayName: string,
    photoURL: string
  ) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { displayName, photoURL });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const { uid, email } = authUser!;
    setLoading(true);
    if (image && name && uid && email) {
      const imageRef = ref(storage, `avaters/${uid}_${image.name}`);
      await uploadBytes(imageRef, image);
      await getDownloadURL(imageRef)
        .then(async (url) => {
          await updateProfile(auth.currentUser!, {
            displayName: name,
            photoURL: url,
          })
            .then(() => {
              setAuthUser({ displayName: name, photoURL: url, email, uid });
            })
            .then(async () => await updateUserProfile(uid, name, url))
            .then(() =>
              toHome(uid, {
                title: "Success",
                status: "success",
                text: "Setting profile succeeded.",
              })
            );
        })
        .finally(() => setLoading(false));
    } else if (!image && name && uid && email && authUser?.photoURL!) {
      await updateProfile(auth.currentUser!, {
        displayName: name,
      })
        .then(() => {
          setAuthUser({
            displayName: name,
            photoURL: authUser.photoURL,
            email,
            uid,
          });
        })
        .then(
          async () => await updateUserProfile(uid, name, authUser.photoURL!)
        )
        .then(() =>
          toHome(uid, {
            title: "Success",
            status: "success",
            text: "Setting profile succeeded.",
          })
        )
        .finally(() => setLoading(false));
    } else {
      alert(
        "User name and Profile image is a required contents to start chatting"
      );
      setLoading(false);
    }
  };

  return (
    <>
      {flashState && <FlashMessage {...messageState!} />}
      <Form
        title="Setting Profile"
        onSubmit={onSubmit}
        startIcon={<SettingIcon title />}
      >
        <Avatar
          size={60}
          state={image}
          setState={setImage}
          header={false}
          profile
        />

        {authUser?.displayName ? (
          <Input
            label="Name"
            placeholder="Your Name"
            required
            ref={nameRef}
            defaultValue={authUser.displayName}
          />
        ) : (
          <Input label="Name" placeholder="Your Name" required ref={nameRef} />
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          height="52px"
          margin="20px 0 20px"
          startIcon={<UploadIcon />}
          disabled={loading}
        >
          Update profile
        </Button>
      </Form>
    </>
  );
};

export default Profile;
