import { useEffect, useState } from 'react'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
	const [quizData, setQuizData] = useState([])
	const [isClicked, setIsClicked] = useState(false)

	function handleStartBtn() {
		setIsClicked(!isClicked)
	}

	console.log(isClicked)

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

	function getAnswersArray() {
		try {
			if (quizData.length > 0) {
				let quizArr = quizData[0]
				console.log('correct answer', quizArr.correct_answer)
				console.log('incorrect answers', quizArr.incorrect_answers)
				let answers = quizArr.incorrect_answers
				answers.push(quizArr.correct_answer)
				return answers
			}
		} catch (error) {
			console.log('there was a problem')
		}
	}

	getAnswersArray()

	return (
		<main>
			{isClicked ? (
				<section className='quiz'>
					<Quiz />
					{/* <Quiz />
					<Quiz />
					<Quiz />
					<Quiz /> */}
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
