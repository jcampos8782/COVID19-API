import {createSelector} from 'reselect';

import {
  getFacts
} from '../../selectors';

export const getSipOrderDate = createSelector(
  [getFacts],
  facts => facts ? new Date(facts.sipOrderDate) : null
)
