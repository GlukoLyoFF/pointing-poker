import { Dispatch } from 'redux';
import { Heading, HeadingAction, HeadingActionType } from '../../core/types/headingType';

export const setHeading = (heading: Heading) => {
  return (dispatch: Dispatch<HeadingAction>) => {
    dispatch({ type: HeadingActionType.SET_HEADING, payload: heading });
  };
};
