export const transitionStyles = {
  entering: {
    width: '0px',
    transform: 'translate(100%)',
  },
  entered: {
    transform: 'none',
    transition: 'transform, width 250ms ease-in-out',
  },
  exiting: {
    transform: 'translate(0%)',
  },
  exited: {
    width: '0px',
    transform: 'translate(100%)',
    transition: 'transform, width 250ms ease-in-out',
  },
}