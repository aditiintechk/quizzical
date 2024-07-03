import { useEffect, useState } from 'react'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
	const [questions, setQuestions] = useState([])

	// useEffect(() => {
	// 	fetch(
	// 		'https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple'
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => setQuestions(data))
	// }, [])

	// console.log(questions)

	// function handleStartBtn() {
	// 	setQuestions(['hi'])
	// }

	return (
		<main>
			{/* {questions.length > 0 ? (
				<section className='quiz'>
					<h1>Quiz questions here!</h1>
				</section>
			) : (
				<section className='start-quiz'>
					<h1>Quizzical</h1>
					<h2>An exercise to your brain ⚡!</h2>
					<button className='start-btn'>Start Quiz</button>
				</section>
			)} */}

			<Quiz />
			<Quiz />
			<Quiz />
			<Quiz />
			<Quiz />
			<section className='check-section'>
				<button className='check-btn'>Check answers</button>
			</section>
		</main>
	)
}

export default App
