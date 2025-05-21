import { XConfig } from '@ng-nest/ui/core';

export const NgNestConfig: XConfig = {
  components: {
    pagination: {
      space: '0.8rem'
    },
    table: {
      rowHeight: 38
    },
    dialog: {
      width: '28rem'
    },
    switch: {
      size: 'small'
    }
  },
  theme: {
    colors: { primary: '#4096ff' },
    vars: {
      borderRadius: '0.25rem',
      borderSmallRadius: '0.125rem'
    }
  }
};
