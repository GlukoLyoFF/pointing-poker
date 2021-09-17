import { Dispatch } from 'redux';
import { Heading, HeadingActions, HeadingActionType } from '../../types/headingType';

export const setHeading = (heading: Heading) => {
  return (dispatch: Dispatch<HeadingActions>) => {
    dispatch({ type: HeadingActionType.SET_HEADING, payload: heading });
  };
};
