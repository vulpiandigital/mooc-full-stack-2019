import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {

	return (
		<button onClick={handleClick}>{text}</button>
	)
}

const Statistic = ({ text, value }) => (
	<tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({ feedback }) => {
	let all = feedback[0]+feedback[1]+feedback[2]
	if ( all > 0 ) {
		return (
			<>
				<h2>Statistics</h2>
				<table>
					<tbody>
						<Statistic text="Good" value={feedback[0]} />
						<Statistic text="Neutral" value={feedback[1]} />
						<Statistic text="Bad" value={feedback[2]} />
						<Statistic text="All" value={all} />
						<Statistic text="Average" value={(feedback[0]-feedback[2])/all} />
						<Statistic text="Positive" value={(feedback[0]/all)*100+'%'} />
					</tbody>
				</table>
			</>
		)
	} else {
		 return <p>No feedback given</p>
	}
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	return (
		<div>
			<h1>Give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text="Good :)" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="Neutral :|" />
			<Button handleClick={() => setBad(bad + 1)} text="Bad :(" />
			<Statistics feedback={[good,neutral,bad]} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));