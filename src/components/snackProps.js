// import successIcon from './../check.svg';
// import errorIcon from './../error.svg';
// import infoIcon from './../info.svg';
// import warningIcon from './../warning.svg';

export const TOAST_PROPERTIES = [  
  {
    //this will use default styling to represent a base snackbar that will react to light and dark themes
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Info',
    description: 'This is an info toast component',
    fontColor: '',
    backgroundColor: '',
    // icon: infoIcon
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Success',
    description: 'This is a success toast component',
    fontColor: 'black',
    backgroundColor: '#90EE90',
    // icon: successIcon
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Danger',
    description: 'This is an error toast component',
    fontColor: 'white',
    backgroundColor: '#d9534f',
    // icon: errorIcon
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Warning',
    description: 'This is a warning toast component',
    fontColor: 'black',
    backgroundColor: '#f0ad4e',
    // icon: warningIcon
  }
];

export const BUTTON_PROPS = [  
  {
    id: 1,
    type: 'info',
    backgroundColor: '#F0F7FF',
    label: 'Info'
  },
  {
    id: 2,
    type: 'success',
    className: 'success',
    backgroundColor: '#90EE90',
    label: 'Success'
  },
  {
    id: 3,
    type: 'danger',
    backgroundColor: '#d9534f',
    label: 'Danger'
  },

  {
    id: 4,
    type: 'warning',
    backgroundColor: '#f0ad4e',
    label: 'Warning'
  },
];