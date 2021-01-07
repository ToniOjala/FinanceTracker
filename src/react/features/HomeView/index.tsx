import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideDateSelection } from '../../slices/dateSelection';

const HomeView = (): JSX.Element => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(hideDateSelection());
  }, [])

  return (
    <div>
      <h3>Home</h3>
    </div>
  )
}

export default HomeView
