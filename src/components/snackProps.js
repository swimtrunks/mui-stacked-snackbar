

export const SNACK_PROPERTIES = [  
  {
    //this will use default styling to represent a base snackbar that will react to light and dark themes
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Info',
    description: 'This is the default styling and is compatiable with light and dark modes. It will display common notifcations ',
    fontColor: '',
    backgroundColor: '',
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Success',
    description: 'This is a success snackbar component',
    fontColor: 'black',
    backgroundColor: '#90EE90',
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Error',
    description: 'This is an error snackbar component',
    fontColor: 'white',
    backgroundColor: '#d9534f',
  },
  {
    id: Math.floor((Math.random() * 101) + 1),
    title: 'Warning',
    description: 'This is a warning snackbar component',
    fontColor: 'black',
    backgroundColor: '#f0ad4e',
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
    type: 'error',
    backgroundColor: '#d9534f',
    label: 'Error'
  },

  {
    id: 4,
    type: 'warning',
    backgroundColor: '#f0ad4e',
    label: 'Warning'
  },
];