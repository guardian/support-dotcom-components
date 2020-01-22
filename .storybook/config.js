import { configure } from '@storybook/react';

// Automatically import all stories inside Components folder
configure(require.context('../src/components', true, /\.stories\.tsx?$/), module);
