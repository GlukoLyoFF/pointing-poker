import { socket } from 'core/api/socket.service';
import { useTypeSelector } from 'core/hooks/useTypeSelector';
import { IUser } from 'core/types/get200Types';
import React from 'react';
import { AppModal } from './Modal';
import { Text } from 'core/components/Text';
import { Dialog, DialogTitle } from '@material-ui/core';
import { sendVoteForPlayer } from 'core/api/users.service';
import { Roles } from 'core/types/roleType';
import { Message } from 'core/types/socketMessageType';

const defaultLocalState = {
  isOpen: false,
  who: null,
  target: null,
};

export const KickVotingModal: React.FC = (): JSX.Element => {
  const { currentUser } = useTypeSelector(state => state.currentUser);
  const [localState, setlocalState] = React.useState<{
    isOpen: boolean;
    who: IUser | null;
    target: IUser | null;
  }>(defaultLocalState);

  const socketStartVoting = ({
    payload,
  }: {
    event: string;
    payload: { player: IUser; target: IUser };
  }): void => {
    if (
      (currentUser.userId !== payload.player._id && currentUser.role !== Roles.observer) ||
      currentUser.userId === payload.target?._id
    ) {
      setlocalState({ isOpen: true, who: payload.player, target: payload.target });
    }
  };

  const socketStopVoting = () => {
    setlocalState(defaultLocalState);
  };

  const handleSubmit = () => {
    if (localState.target) {
      sendVoteForPlayer({
        gameId: currentUser.gameId,
        playerId: currentUser.userId,
        targetId: localState.target?._id,
        vote: true,
      });
      setlocalState({ ...localState, isOpen: false });
    }
  };

  const handleCancel = () => {
    if (localState.target) {
      sendVoteForPlayer({
        gameId: currentUser.gameId,
        playerId: currentUser.userId,
        targetId: localState.target?._id,
        vote: false,
      });
      setlocalState({ ...localState, isOpen: false });
    }
  };

  React.useEffect(() => {
    socket.on(Message.StartVotingByPlayerMsg, socketStartVoting);
    socket.on(Message.FinishVotingByPlayerMsg, socketStopVoting);

    return () => {
      socket.off(Message.StartVotingByPlayerMsg, socketStartVoting);
      socket.off(Message.FinishVotingByPlayerMsg, socketStopVoting);
    };
  });

  const targetName = localState.target
    ? `${localState.target.firstName} ${localState.target.lastName}`
    : '';
  const whoName = localState.who ? `${localState.who.firstName} ${localState.who.lastName}` : '';

  return (
    <>
      {currentUser.userId === localState.target?._id ? (
        <Dialog open={localState.isOpen}>
          <DialogTitle>
            <Text textLvl="subtitle">Kick</Text>
          </DialogTitle>
          <Text textLvl="base">
            <Text textLvl="base" isHighlight={true}>
              {whoName}
            </Text>{' '}
            started a vote to remove you from the game.
          </Text>
        </Dialog>
      ) : (
        <AppModal
          title={`Kick player`}
          isShow={localState.isOpen}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        >
          <Text textLvl="base">
            <Text textLvl="base" isHighlight={true}>
              {`${whoName} `}
            </Text>
            want to kick member
            <Text textLvl="base" isHighlight={true}>
              {` ${targetName}`}
            </Text>
            . Do you agree with it?
          </Text>
        </AppModal>
      )}
    </>
  );
};
