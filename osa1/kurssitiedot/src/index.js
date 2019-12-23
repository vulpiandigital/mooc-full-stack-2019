import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
	return (
		<>
			<h1>{props.course}</h1>
		</>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</div>
	)
}

const Total = (props) => {
	let excercises = 0;
	props.parts.forEach(value => {
		excercises += value.excercises;
	})
	return (
		<p>Number of excercises {excercises}</p>
	)
}

const Part = (props) => {
	return (
		<p>{props.part.name} {props.part.excercises}</p>
	)
}


const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				excercises: 10
			},
			{
				name: 'Using props to pass data',
				excercises: 7
			},
			{
				name: 'State of a component',
				excercises: 14
			}
		]
	}
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));