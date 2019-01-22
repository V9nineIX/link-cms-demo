import React, {Component} from 'react';
import * as util from '../utils/utils';
import { Redirect } from "react-router-dom";

export default function withAuth (WrappedComponent) {

  class Authentication extends Component {

    render () {
      if (!util.isLogin()) {
        return <Redirect to="/login"/>
      }

      return <WrappedComponent { ...this.props }/>
    }
  }

  return Authentication;
}