import { useEffect, useState } from 'react'
import Quiz from './components/Quiz.jsx'
import he from 'he'
import _ from 'lodash'
import './App.css'

function App() {
	/* State to hold quiz data */
	const [quizData, setQuizData] = useState([])
	const [isClicked, setIsClicked] = useState(false)
	/* State to hold the selected answers */
	const [selectedAnswers, setSelectedAnswers] = useState([])
	const [isHidden, setIsHidden] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	function handleStartBtn() {
		setIsClicked(!isClicked)
	}

	/* fetch the data (Side effect) with useEffect */
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

	/* Handle the radio input change */
	function handleChange(question, event) {
		let selectedAnswer = event.target.value
		setSelectedAnswers((prevSelectedAnswers) => [
			...prevSelectedAnswers,
			{
				[he.decode(question)]: he.decode(selectedAnswer),
			},
		])
	}

	/* Collect correct answers in an array */
	function getCorrectAnswers() {
		let correctAnswersArr = quizData.map((item) => ({
			[he.decode(item.question)]: he.decode(item.correct_answer),
		}))
		return correctAnswersArr
	}

	/* Calculate number of questions correctly answered */
	function getNumberOfCorrectAnswers() {
		let correctAnswers = getCorrectAnswers()
		let userEnteredAnswers = selectedAnswers
		console.log(correctAnswers, userEnteredAnswers)

		let equalCount = 0

		if (correctAnswers.length === userEnteredAnswers.length) {
			for (let i = 0; i < correctAnswers.length; i++) {
				if (
					JSON.stringify(Object.values(correctAnswers[i])) ===
					JSON.stringify(Object.values(userEnteredAnswers[i]))
				) {
					equalCount++
				}
			}
			return equalCount
		}
	}

	/* Handle Check answers & Play again buttons */
	function handleCheckBtn() {
		getNumberOfCorrectAnswers()
		setIsHidden(!isHidden)
		setIsSubmitted(!isSubmitted)
	}

	function handlePlayBtn() {
		setIsClicked(!isClicked)
	}

	/* render Quiz components */
	function renderQuizElements() {
		try {
			if (quizData.length > 0) {
				const quizElements = quizData.map((item, index) => {
					let answers = item.incorrect_answers
					if (answers.length <= 3) answers.push(item.correct_answer)
					return (
						<Quiz
							key={index + 1}
							questionId={index + 1}
							question={item.question}
							answers={answers}
							correctAnswer={item.correct_answer}
							handleChange={(event) =>
								handleChange(item.question, event)
							}
							isSubmitted={isSubmitted}
						/>
					)
				})

				return quizElements
			}
		} catch (error) {
			console.log('fetch operation failed, try again!', error)
		}
	}

	return (
		<main className='main'>
			{isClicked ? (
				<section className='quiz'>
					{renderQuizElements()}
					<section
						className={
							isHidden ? 'check-section hidden' : 'check-section'
						}
					>
						<button className='check-btn' onClick={handleCheckBtn}>
							Check answers
						</button>
					</section>
					<section
						className={
							isHidden
								? 'result-section'
								: 'result-section hidden'
						}
					>
						<h2>
							You scored {getNumberOfCorrectAnswers()}/
							{getCorrectAnswers().length} correct answers
						</h2>
						<button className='play-btn' onClick={handlePlayBtn}>
							Play again
						</button>
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

{
	/* <section className='quiz'>
	{renderQuizElements()}
	<section
		className={
			isHidden ? 'check-section hidden' : 'check-section'
		}
	>
		<button className='check-btn' onClick={handleCheckBtn}>
			Check answers
		</button>
	</section>
	<section
		className={
			isHidden ? 'result-section' : 'result-section hidden'
		}
	>
		<h2>
			You scored {getNumberOfCorrectAnswers()}/
			{getCorrectAnswers().length} correct answers
		</h2>
		<button className='play-btn' onClick={handlePlayBtn}>
			Play again
		</button>
	</section>
</section> */
}
