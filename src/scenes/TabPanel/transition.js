export default {
  entering: {
    transform: 'translate(100%)'
  },
  entered: {},
  exiting: {},
  exited: {
    transition: 'transform 0.3s ease-out',
    transform: 'translate(100%)'
  }
};
