export const transitionStyles = {
  entering: {
    position: 'absolute',
    width: '0px',
    transform: 'translate(100%)'
  },
  entered: {
    // position: 'relative',
    transform: 'none',
    transition: 'transform, width 250ms ease-in-out'
  },
  exiting: {
    position: 'absolute',
    transform: 'translate(0%)'
  },
  exited: {
    // position: 'relative',
    width: '0px',
    transform: 'translate(100%)',
    transition: 'transform, width 250ms ease-in-out'
  }
};
