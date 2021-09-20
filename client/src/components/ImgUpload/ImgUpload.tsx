import { Button } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { InputField } from '../InputField';
import { Text } from '../Text';
import styles from './ImgUpload.module.scss';
import { Avatar } from '../Avatar/Avatar';

export const ImgUpload: FC<ImgUploadProps> = ({
  img,
  setImg,
  statusFail,
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
                120,
                120,
                ext[1],
                120,
                0,
                uri => {
                  setImg(uri as string);
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
          readOnly
        />
        {statusFail && (
          <span className={styles.error}>
            The image must be in .svg .jpeg .jpg .png .gif format.
          </span>
        )}
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
  statusFail: boolean;
  setImg: (val: string) => void;
  setStatusFail: (val: boolean) => void;
}