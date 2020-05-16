import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react';
import { User } from '../../@types/user.interfaces';
import ProfilePlaceholder from './../../assets/images/profile-icon.png';
import Button from '../button/button.component';
import './update-profile-modal.styles.scss';
import CenterInput from '../center-input/center-input.component';
import useForm from '../../effects/useForm.effect';
import { isEmpty } from '../../utils/validations';
import CrossIcon from '../icons/cross/cross.compnent';
import UpdateIcon from '../icons/update/update.component';

interface Props {
  user: User;
  isOpen: boolean;
  closeModal: () => void;
}

export default function UpdateProfileModal ({
  user,
  isOpen,
  closeModal
}: Props): ReactElement{
  const [ image, setImage ] = useState<{
    value: string | undefined;
    error: string;
    file?: File;
  }>({
    value: user.profilePic,
    error: ''
  });

  const [ enableUpdate, setEnableUpdate ] = useState(false);

  const [ data, handleChange, handleSubmit, submitErrors ] = useForm(
    {
      username: {
        value: user.username,
        error: '',
        validation: (value: string) => isEmpty('Username', value)
      },
      fullname: {
        value: user.fullname
      },
      status: {
        value: user.status
      }
    },
    () => {}
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file.type.includes('image')) {
      setImage((prev) => ({ ...prev, error: 'Invalid image type' }));
      return;
    }
    const tempUrl = URL.createObjectURL(file);

    setImage({
      value: tempUrl,
      error: '',
      file
    });
  };

  useEffect(
    () => {
      if (
        image.value !== user.profilePic ||
        data.fullname.value !== user.fullname ||
        data.username.value !== user.username ||
        data.status.value !== user.status
      ) {
        setEnableUpdate(true);
      } else {
        setEnableUpdate(false);
      }
    },
    [ data, image, user ]
  );

  const { username, fullname, status } = data;

  return (
    <div className={`update-profile-modal-overlay${!isOpen ? '--hide' : ''}`}>
      <form className="update-profile-modal" onSubmit={handleSubmit}>
        <CrossIcon
          className="update-profile-modal__close"
          size={3}
          onClick={closeModal}
        />
        <div className="update-profile-modal__image">
          <img src={image.value || ProfilePlaceholder} alt="profile pic" />
          <input
            id="file-profile-pic"
            type="file"
            name="profilePic"
            onChange={handleFileChange}
          />
          <label htmlFor="file-profile-pic">
            <UpdateIcon size={2.5} />
          </label>
        </div>

        <div className="update-profile-modal__content">
          <CenterInput
            value={username.value}
            error={username.error}
            onChange={handleChange}
            label="Username"
            name="username"
          />
          <CenterInput
            value={fullname.value}
            onChange={handleChange}
            label="Fullname"
            name="fullname"
          />
          <CenterInput
            value={status.value}
            onChange={handleChange}
            label="Status"
            name="status"
            useTextarea
          />
          <span className="update-profile-modal__content__error">
            {submitErrors}
          </span>
          <Button disabled={!enableUpdate}>Update Profile</Button>
        </div>
      </form>
    </div>
  );
}
