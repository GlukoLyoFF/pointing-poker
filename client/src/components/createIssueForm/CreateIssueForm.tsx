import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postNewIssue, updateIssueById } from '../../core/api/issues.service';
import { Dialog } from '@material-ui/core';
import { AppButton } from '../Button';
import { Text } from '../Text';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './CreateIssueForm.module.scss';
import styleInput from '../../app.module.scss';

type FormValues = {
  title: string;
  link: string;
  priority: string;
  gameId: string;
};

export const CreateIssueForm: React.FC<ModalProps> = ({
  id,
  flagEdit,
  flagCreate,
  isShow,
  handleSubmitFrom,
  handleCancel,
}): JSX.Element => {
  let title = '';

  if (flagEdit) {
    title = 'Edit issue';
  } else if (flagCreate) {
    title = 'Create issue';
  }
  const dialogLabel = `${title.toLocaleLowerCase().split(' ').join('-')}-dialog-title`;
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const [getPriority, setPriority] = useState('Low');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPriority(event.target.value as string);
  };

  const handleSubmitCreateIssue = handleSubmit(data => {
    postNewIssue(data).then(() => {
      handleSubmitFrom();
    });
  });

  const handleSubmitEditIssue = handleSubmit(data => {
    updateIssueById(id, data).then(() => {
      handleSubmitFrom();
    });
  });

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isShow}
        onClose={handleCancel}
        aria-labelledby={dialogLabel}
        style={{ paddingTop: '20px' }}
      >
        <Text textLvl="title" isBold={true} id={dialogLabel}>
          {title}
        </Text>
        <form onSubmit={flagCreate ? handleSubmitCreateIssue : handleSubmitEditIssue}>
          <div className={styles.formBox}>
            <label htmlFor="title" className={styleInput.inputContainer}>
              <Text textLvl="base" className={styleInput.inputLabel}>
                Title:
              </Text>
              <input className={styleInput.inputField} id="title" {...register('title')} />
            </label>
            <br />
            <label htmlFor="link" className={styleInput.inputContainer}>
              <Text textLvl="base" className={styleInput.inputLabel}>
                Link:
              </Text>
              <input className={styleInput.inputField} {...register('link')} />
            </label>
            <br />
            <div>
              <Text textLvl="base">Priority: </Text>
              <Select
                value={getPriority}
                {...register('priority')}
                onChange={event => {
                  handleChange(event);
                }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Middle">Middle</MenuItem>
                <MenuItem value="Hight">Hight</MenuItem>
              </Select>
            </div>
            <br />
          </div>
          <div className={styles.btnBox}>
            <AppButton
              isSubmit={true}
              name="Yes"
              color="blue"
              onClickHandler={() => {
                setValue('gameId', '123');
              }}
            />
            <AppButton name="No" color="white" onClickHandler={handleCancel} />
          </div>
        </form>
      </Dialog>
    </>
  );
};

interface ModalProps {
  id: string;
  flagEdit: boolean;
  flagCreate: boolean;
  isShow: boolean;
  handleSubmitFrom: () => void;
  handleCancel: () => void;
}
