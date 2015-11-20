import { COUNTER_INCREMENT } from 'constants/counter';

export default {
  increment: () => ({ type : COUNTER_INCREMENT })
};

/*
This is our action creator. In HomeView.js line 29, we bound this to dispatch via bindActionCreators(), which means it will automatically dispatch the action when said action occurs.

This action is fired off in HomeView.js line 54 (onClick)
*/