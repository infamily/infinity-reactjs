export default {
  entering: {
    position: 'fixed',
    width: '0px',
    transform: 'translate(100%)'
  },
  entered: {
    // position: 'relative',
    transform: 'none',
    transition: 'width 250ms ease-in-out'
  },
  exiting: {
    position: 'fixed',
    transform: 'translate(0%)'
  },
  exited: {
    // position: 'relative',
    width: '0px',
    transform: 'translate(100%)',
    transition: 'width 250ms ease-in-out'
  }
};
