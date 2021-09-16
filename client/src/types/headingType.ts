export enum HeadingActionType {
  SET_HEADING = 'SET_HEADING',
}

export interface Heading {
  _id: string;
  heading: string;
  gameId: string;
}

export interface DefaultHeadingState {
  heading: Heading;
  error: string | null;
}

interface SetHeadingAction {
  type: HeadingActionType.SET_HEADING;
  payload: Heading;
}

export type HeadingActions = SetHeadingAction;
