export const loadState = () => {
  try {
    const serializedState =   localStorage.getItem('state_if')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    throw (error)
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state_if', serializedState)
  } catch (error) {
    throw (error)
  }
}
