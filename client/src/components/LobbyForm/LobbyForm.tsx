import axios from 'axios';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import style from '../../app.module.scss';
import { ImgUpload } from '../ImgUpload/ImgUpload';
import { Text } from '../Text';
import styleForm from './LobbyForm.module.scss';

type IUser = {
  firstName: string;
  lastName: string;
  jobPosition: string;
};

export const LobbyForm: FC<LobbyFormProps> = ({ id, isCreator = true, gameId }) => {
  const [image, setImage] = useState<string>('');
  const [statusFail, setStatusFail] = useState(false);
  const [isObserver, setIsObserver] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>();

  const formSubmitHandler: SubmitHandler<IUser> = (data: IUser) => {
    if (isCreator) {
      axios
        .post('http://localhost:8888/api/games', {
          url: 'http://localhost:8888/api/games/',
          title: 'default_title',
        })
        .then(res =>
          axios
            .post('http://localhost:8888/api/users', {
              firstName: watch('firstName'),
              lastName: watch('lastName'),
              jobPosition: watch('jobPosition'),
              image: image,
              gameId: res.data._id,
              role: 'creator',
            })
        );
    } else {
      console.log(gameId);
      axios.post('http://localhost:8888/api/users', {
        firstName: watch('firstName'),
        lastName: watch('lastName'),
        jobPosition: watch('jobPosition'),
        image: image,
        gameId: gameId,
        role: isObserver ? 'observer' : 'member',
      });
    }
  };

  return (
    <form className={styleForm.form} id={id} onSubmit={handleSubmit(formSubmitHandler)}>
      {!isCreator && (
        <div className={styleForm.observerCnt__switcherCnt}>
          <h3 className={styleForm.observerCnt__switcherTitle}>Connect as Observer</h3>
          <label className={styleForm.observerCnt__switcher}>
            <input
              type="checkbox"
              onClick={() =>
                setIsObserver(state => {
                  return !state;
                })
              }
            />
            <span className={styleForm.observerCnt__slider}></span>
          </label>
        </div>
      )}
      <div className={styleForm.controlCnt}>
        <label htmlFor={'firstName'} className={style.inputContainer}>
          <div className={styleForm.titleCnt}>
            <Text textLvl="base" className={style.inputLabel}>
              Your first name:
            </Text>
            {errors.firstName && <span className={styleForm.error}>Wrong name.</span>}
          </div>
          <input
            className={style.inputField}
            id="firstName"
            type="text"
            defaultValue=""
            {...register('firstName', {
              required: true,
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Zа-яёА-ЯЁ]+$/u,
            })}
          />
        </label>

        <label htmlFor={'lastName'} className={style.inputContainer}>
          <div className={styleForm.titleCnt}>
            <Text textLvl="base" className={style.inputLabel}>
              Your last name(optional):
            </Text>
            {errors.lastName && <span className={styleForm.error}>Wrong last name.</span>}
          </div>
          <input
            className={style.inputField}
            type="text"
            {...register('lastName', {
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Zа-яёА-ЯЁ]+$/u,
            })}
          />
        </label>

        <label htmlFor={'jobPosition'} className={style.inputContainer}>
          <div className={styleForm.titleCnt}>
            <Text textLvl="base" className={style.inputLabel}>
              Your job position(optional):
            </Text>
            {errors.jobPosition && <span className={styleForm.error}>Wrong job position.</span>}
          </div>
          <input
            className={style.inputField}
            type="text"
            {...register('jobPosition', {
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Zа-яёА-ЯЁ]+$/u,
            })}
          />
        </label>
        <ImgUpload
          firstName={watch('firstName')}
          lastName={watch('lastName')}
          statusFail={statusFail}
          img={image}
          setImg={setImage}
          setStatusFail={setStatusFail}
        />
      </div>
    </form>
  );
};

interface LobbyFormProps {
  id?: string;
  gameId?: string;
  isCreator?: boolean;
}
