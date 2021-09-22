import { Button } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { InputField } from 'core/components/InputField';
import { Text } from 'core/components/Text';
import styles from './ImgUpload.module.scss';
import { Avatar } from 'core/components/avatar/Avatar';
import axios from 'axios';

export const ImgUpload: FC<ImgUploadProps> = ({
  img,
  setImg,
  setStatusFail,
  firstName,
  lastName,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const label = (text: string) => <Text textLvl="base">{text}</Text>;

  const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const selectedFile = target.files[0];
      if (selectedFile) {
        const ext = selectedFile.name.match(/\.([^.]+)$/) ?? '';
        setFileName(selectedFile.name);
        if (ext !== null) {
          switch (ext[1].toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
              Resizer.imageFileResizer(
                selectedFile,
                100,
                100,
                ext[1],
                100,
                0,
                uri => {
                  setImg(uri as string);
                  axios
                    .post('http://localhost:8888/api/users', {
                      firstName: 'Fred',
                      lastName: 'Flintstone',
                      jobPosition: 'dev',
                      image: uri,
                      gameId: 'fdfsdfsdfsd',
                      role: 'creator',
                    })
                    .then();
                },
                'base64',
              );
              setStatusFail(false);
              break;
            default:
              setStatusFail(true);
              setFileName('');
              setImg('');
          }
        }
      }
    }
  };

  return (
    <>
      <div className={styles.addImageCnt}>
        <InputField
          type="text"
          name="imageLabel"
          value={fileName}
          labelText={label('Image:')}
          onChange={setFileName}
          //readOnly
        />
        <Button className={styles.addPicBtn} color="primary" variant="contained" component="label">
          Upload File
          <input id="file" type="file" name="file" hidden onChange={fileChangedHandler} />
        </Button>
      </div>
      <label className={styles.avaLabel} htmlFor="file">
        <Avatar name={firstName} lastName={lastName} img={img} />
      </label>
    </>
  );
};

interface ImgUploadProps {
  img: string;
  firstName: string;
  lastName: string;
  setImg: (val: string) => void;
  setStatusFail: (val: boolean) => void;
}
