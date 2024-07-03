import { useEffect, useState } from 'react'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
	const [quizData, setQuizData] = useState([])
	const [isClicked, setIsClicked] = useState(false)

	function handleStartBtn() {
		setIsClicked(!isClicked)
	}

	useEffect(() => {
		if (isClicked) {
			fetch(
				'https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple'
			)
				.then((response) => {
					if (!response.ok) {
						console.log(`HTTP error! Status: ${response.status}`)
					}
					return response.json()
				})
				.then((data) => {
					setQuizData(data.results)
				})
		}
	}, [isClicked])

	function renderQuizElements() {
		try {
			if (quizData.length > 0) {
				const quizElements = quizData.map((item, index) => {
					let answers = item.incorrect_answers
					if (answers.length <= 3) answers.push(item.correct_answer)
					return (
						<Quiz
							key={index}
							question={item.question}
							correctAnswer={item.correct_answer}
							answers={answers}
						/>
					)
				})

				return quizElements
			}
		} catch (error) {
			console.log('fetch operation failed, try again!')
		}
	}

	return (
		<main className='main'>
			{isClicked ? (
				<section className='quiz'>
					{renderQuizElements()}
					<section className='check-section'>
						<button className='check-btn'>Check answers</button>
					</section>
				</section>
			) : (
				<section className='start-quiz'>
					<h1>Quizzical</h1>
					<h2>An exercise to your brain ⚡!</h2>
					<button className='start-btn' onClick={handleStartBtn}>
						Start Quiz
					</button>
				</section>
			)}
		</main>
	)
}

export default App
