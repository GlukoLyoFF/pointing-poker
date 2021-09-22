import axios from 'axios';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import style from '../../app.module.scss';
import { ImgUpload } from '../ImgUpload/ImgUpload';
import { Text } from '../Text';
import styleForm from './LobbyForm.module.scss';

export const LobbyForm: FC<LobbyFormProps> = ({ id, isCreator = true, gameId }) => {
  const [image, setImage] = useState<string>('');
  const [statusFail, setStatusFail] = useState(false);
  const [isObserver, setIsObserver] = useState(false);

  return (
    <form className={styleForm.form} id={id} onSubmit={() => {}}>
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
          </div>
          <input className={style.inputField} id="firstName" type="text" defaultValue="" />
        </label>
        <label htmlFor={'lastName'} className={style.inputContainer}>
          <div className={styleForm.titleCnt}>
            <Text textLvl="base" className={style.inputLabel}>
              Your last name(optional):
            </Text>
          </div>
          <input className={style.inputField} type="text" />
        </label>
        <label htmlFor={'jobPosition'} className={style.inputContainer}>
          <div className={styleForm.titleCnt}>
            <Text textLvl="base" className={style.inputLabel}>
              Your job position(optional):
            </Text>
          </div>
          <input className={style.inputField} type="text" />
        </label>
        <ImgUpload
          firstName={'firstName'}
          lastName={'lastName'}
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
