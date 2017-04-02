import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import createBlock from 'react-bem-builder';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { RouteConfig } from '../config';

class ScoresContainer extends Component {
  static propTypes = {
    block: PropTypes.func,
  }

  static defaultProps = {
    block: createBlock('scores'),
  }

  render() {
    const { block, players } = this.props;

    return (
      <div className={block()}>
        <table className={block('list')}>
          <thead>
            <tr className={block('row')}>
              <th className={block('header')}>Name</th>
              <th className={block('header')}>Played</th>
              <th className={block('header')}>Points</th>
            </tr>
          </thead>
          <tbody>
            {map(players, ({ id, name, points, played }) => (
              <tr key={id} className={block('row')}>
                <td className={block('column')}>{name}</td>
                <td className={block('column')}>{played}</td>
                <td className={block('column')}>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to={RouteConfig.ADD_PLAYER}>Add Player</Link>
      </div>
    )
  }
}

export default connect(
  ({ players }) => ({
    players,
  }),
)(ScoresContainer);
