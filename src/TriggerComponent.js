import React, { Component } from 'react'
import styles from './component.css'
import bulb from './bulb.png';

export default class TriggerComponent extends Component {
  render () {
    return (
      <div className={styles.trigger}> <img src={bulb} alt="Logo" /> </div>
    )
  }
}
