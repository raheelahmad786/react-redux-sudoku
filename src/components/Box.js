import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { inputValue } from '../actions/grid';

const pallet = {
	'0': '#ffffff', // Box 1
	'30': '#ffffff', // Box 2
	'60': '#ffffff', // Box 3
	'3': '#ffffff', // Box 4
	'33': '#ffffff', // Box 5
	'63': '#ffffff', // Box 6
	'6': '#ffffff', // Box 7
	'36': '#ffffff', // Box 8
	'66': '#ffffff', // Box 9
};

const getBoxColor = (row, col) => {
	let rowGroup = row - (row % 3); // uppermost row index of the box
	let colGroup = (col - (col % 3)) * 10; // leftmost col index of the box * 10
	/*
		r\c| 0   30   60
		----------------
		 0 | 0   30   60
		 3 | 3   33   63
		 6 | 5   36   66
	*/ 
	return pallet[rowGroup + colGroup];
};

/* Box Component */

const Box = React.createClass({
	componentWillMount() {
		const {val} = this.props;
		this.setState({isFixed: val ? true : false});
	},
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.val !== this.props.val;
	},
	handleChange(e){
		const {row, col, store} = this.props;
		const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const val = parseInt(e.target.value);
		const isDeleted = e.target.value === '';

		if (range.indexOf(val) > -1 || isDeleted) {
			store.dispatch(inputValue(row, col, isDeleted ? 0 : val));
		}
	},
	render() {
		const {row, col, val, isSolved} = this.props;
		const {isFixed} = this.state;
		const input = (
			<input
				ref='input'
				style={{backgroundColor: getBoxColor(row, col)}}
				className={isFixed ? 'fixed' : isSolved ? 'result' : ''}
				disabled={isFixed || isSolved}
				value={val ? val : ''}
				onChange={this.handleChange}
			/>
		);

		return (
			<td>
				{
					isSolved ?
					(
						<ReactCSSTransitionGroup
							transitionName='solved'
							transitionAppear={true}
							transitionEnterTimeout={200}
							transitionLeaveTimeout={200}							
							transitionAppearTimeout={200}
						>
							{input}
						</ReactCSSTransitionGroup>
					) :
					input
				}
			</td>
		);
	}
});

export default Box;
