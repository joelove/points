import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import createBlock from 'react-bem-builder';
import { Link } from 'react-router-dom';

import { RouteConfig } from '../config';
import { PlayerActions } from '../actions';

class AddPlayerContainer extends Component {
  static propTypes = {
    block: PropTypes.func,
  }

  static defaultProps = {
    block: createBlock('add-player'),
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { addPlayer } = this.props;
    addPlayer(event.target.name.value);
  }

  render() {
    const { block } = this.props;

    return (
      <div className={block()}>
        <form onSubmit={this.onSubmit}>
          <input name="name" autoFocus />
          <button type="submit">Add</button>
        </form>
        <Link to={RouteConfig.SCORES}>Back</Link>
      </div>
    )
  }
}

export default connect(
  ({ players }) => ({
    players,
  }), {
    ...PlayerActions,
  },
)(AddPlayerContainer);
