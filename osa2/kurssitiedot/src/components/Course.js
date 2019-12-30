import React from 'react'

const Header = ({ text }) => (
	<h2>{text}</h2>
)

const Part = ({ name, exercises }) => (
	<p>{name} {exercises}</p>
)

const Content = ({ parts }) => (
	parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
)
	
const Total = ({ parts }) => {
	const totalParts = parts.reduce(((a, b) => a + b.exercises),0)
	return (
		<p><strong>Total of {totalParts} exercises</strong></p>
	)
}

const Course = ({ course }) => (
	<>
		<Header text={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</>
)

export default Course