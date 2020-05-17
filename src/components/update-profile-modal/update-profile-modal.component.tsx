import React, {
  ReactElement,
  useState,
  ChangeEvent,
  useEffect,
  useRef
} from 'react';
import { User } from '../../@types/user.interfaces';
import ProfilePlaceholder from './../../assets/images/profile-icon.png';
import Button from '../button/button.component';
import './update-profile-modal.styles.scss';
import CenterInput from '../center-input/center-input.component';
import useForm from '../../effects/useForm.effect';
import { isEmpty } from '../../utils/validations';
import CrossIcon from '../icons/cross/cross.compnent';
import UpdateIcon from '../icons/update/update.component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IUpdateUserPayload } from '../../redux/user/user.actions';
import { fetchApi } from '../../redux/fetch/fetch.actions';
import { GlobalState } from '../../redux/root-reducer';
import Loading from '../loading/loading.component';

interface Props {
  user: User;
  isOpen: boolean;
  isFetching?: boolean;
  error?: string;
  closeModal: () => void;
  updateUser: (data: IUpdateUserPayload['data']) => void;
}

function UpdateProfileModalPlain ({
  user,
  isOpen,
  closeModal,
  updateUser,
  isFetching,
  error
}: Props): ReactElement{
  const haveUpdated = useRef(false);
  const [ image, setImage ] = useState<{
    value: string | undefined;
    error: string;
    file?: File;
  }>({
    value: user.profilePic,
    error: ''
  });

  useEffect(
    () => {
      if (haveUpdated.current && !isFetching && !error) {
        closeModal();
        haveUpdated.current = false;
      }
    },
    [ error, isFetching, closeModal ]
  );

  const [ enableUpdate, setEnableUpdate ] = useState(false);

  const [ data, handleChange, handleSubmit, submitErrors, setData ] = useForm(
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
    () => {
      if (!enableUpdate) return;
      const obj: IUpdateUserPayload['data'] = {};
      if (image.value !== user.profilePic) obj.profilePic = image.file;
      if (data.status.value !== user.status) obj.status = status.value;
      if (data.username.value !== user.username) obj.username = username.value;
      if (data.fullname.value !== user.fullname) obj.fullname = fullname.value;

      updateUser(obj);
      haveUpdated.current = true;
    }
  );

  useEffect(
    () => {
      setImage({
        value: user.profilePic,
        error: ''
      });
      setData((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          value: user.username,
          error: ''
        },
        fullname: {
          ...prev.fullname,
          value: user.fullname
        },
        status: {
          ...prev.status,
          value: user.status
        }
      }));
    },
    [ user, setData, isOpen ]
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
        <div
          className={`update-profile-modal__loading${isFetching
            ? ''
            : '--hide'}`}>
          <Loading />
        </div>
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
            {error || submitErrors}
          </span>
          <Button type="submit" disabled={!enableUpdate}>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = ({
  fetchController: { isFetching, errors }
}: GlobalState) => ({
  isFetching: isFetching.UPDATE_USER,
  error: errors.UPDATE_USER
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUser: (user: IUpdateUserPayload['data']) =>
    dispatch(fetchApi({ name: 'UPDATE_USER', data: user }))
});

const UpdateProfileModal = connect(mapStateToProps, mapDispatchToProps)(
  UpdateProfileModalPlain
);
export default UpdateProfileModal;
