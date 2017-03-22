import React from 'react';
import Bridge from '../../../components/Bridge';

export default class AddTodo extends React.Component {
    render () {
        return (
          <div>
            <input type='text' ref='input' />
            <button
              onClick={(e) => this.handleClick(e)}
            >
          Add
        </button>
          </div>
        );
    }

    handleClick (e) {
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
        Bridge.bridgeCall('test', 'aaa');
    }
}

AddTodo.propTypes = {
    onAddClick: React.PropTypes.func.isRequired
};
