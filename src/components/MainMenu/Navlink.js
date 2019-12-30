import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { setActiveLink, setCategory } from '../../Redux/Store/Actions/menuAction'
import {
  setShowPollDetails
} from '../../Redux/Store/Actions/questionsAction'
import { withRouter } from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import SelectLogin from '../Login/SelectLogin'
import { Nav } from 'react-bootstrap'

import '../Styl/Menu.scss'

class Navlink extends Component {
  handleClick = () => {
    this.props.setActiveLink(this.props.label)
    this.props.setShowPollDetails(false)
    return this.props.navClick ? this.props.navClick() : null
  }

  render () {
    const { path, label, icon, eventKey, login } = this.props
    let showLogin;
    if (this.props.location.pathname === '/error') {
      showLogin = 'block'
    } else if (login && this.props.userLoggedIn.id) {
      showLogin = 'none'
    }


    return (
      <Nav.Item className='navItemContainer' style={ { display: showLogin } }>
        { login ? (
          <SelectLogin { ...this.props } />
        ) : (
            <Nav.Link
              eventKey={ eventKey }
              to={ path }
              className={
                this.props.activeLink === this.props.label ? 'selected' : null
              }
              // disabled={disable}
              onClick={ this.handleClick }
            >
              { label }&nbsp;
            <FontAwesome name={ icon } />
            </Nav.Link>
          ) }
      </Nav.Item>
    )
  }
}

Navlink.propTypes = {
  icon: PropTypes.string,
  activeLink: PropTypes.string
}

Navlink.defaultProps = {
  icon: `${ '' }`
}

const mapStateToProps = state => {
  return {
    activeLink: state.menu.activeLink
  }
}

export default connect(mapStateToProps, {
  setActiveLink,
  setCategory,
  setShowPollDetails
})(withRouter(Navlink))
