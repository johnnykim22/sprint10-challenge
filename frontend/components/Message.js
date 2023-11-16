import React from 'react'
import { connect } from 'react-redux'

export const Message = (props) => {
  return <div id="message">{props.message}</div>
}

const mapStateToProps = (state) => {
 
  return {
    message: state.message
  }
}

export default connect(mapStateToProps, {})(Message)