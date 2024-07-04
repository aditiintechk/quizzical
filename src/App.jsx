import { useEffect, useState } from 'react'
import Quiz from './components/Quiz.jsx'
import he from 'he'
import './App.css'

function App() {
	// const [quizData, setQuizData] = useState([])
	const [quizData, setQuizData] = useState([
		{
			type: 'multiple',
			difficulty: 'easy',
			category: 'Entertainment: Japanese Anime &amp; Manga',
			question:
				'In the anime &quot;My Hero Academia&quot;, which character is shown with the ability to manipulate gravity?',
			correct_answer: 'Uraraka',
			incorrect_answers: ['Bakugo', 'Deku', 'Asui '],
		},
		{
			type: 'multiple',
			difficulty: 'easy',
			category: 'Entertainment: Japanese Anime &amp; Manga',
			question:
				'Which anime heavily features music from the genre &quot;Eurobeat&quot;?',
			correct_answer: 'Initial D',
			incorrect_answers: [
				'Wangan Midnight',
				'Kino no Tabi',
				'Cowboy Bebop',
			],
		},
		{
			type: 'multiple',
			difficulty: 'easy',
			category: 'Entertainment: Japanese Anime &amp; Manga',
			question: 'What was Ash Ketchum&#039;s second Pokemon?',
			correct_answer: 'Caterpie',
			incorrect_answers: ['Charmander', 'Pikachu', 'Pidgey'],
		},
		{
			type: 'multiple',
			difficulty: 'easy',
			category: 'Entertainment: Japanese Anime &amp; Manga',
			question:
				'The characters of &quot;Log Horizon&quot; are trapped in what game?',
			correct_answer: 'Elder Tale',
			incorrect_answers: ['Sword Art Online', 'Tower Unite', 'Yggdrasil'],
		},
		{
			type: 'multiple',
			difficulty: 'easy',
			category: 'Entertainment: Japanese Anime &amp; Manga',
			question:
				'Which Pok&eacute;mon and it&#039;s evolutions were banned from appearing in a main role after the Episode 38 Incident?',
			correct_answer: 'The Porygon Line',
			incorrect_answers: [
				'The Pikachu Line',
				'The Elekid Line',
				'The Magby Line',
			],
		},
	])

	const [isClicked, setIsClicked] = useState(false)
	const [selectedAnswers, setSelectedAnswers] = useState([])
	const [isHidden, setIsHidden] = useState(false)

	// function handleStartBtn() {
	// 	setIsClicked(!isClicked)
	// }

	// useEffect(() => {
	// 	if (isClicked) {
	// 		fetch(
	// 			'https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple'
	// 		)
	// 			.then((response) => {
	// 				if (!response.ok) {
	// 					console.log(`HTTP error! Status: ${response.status}`)
	// 				}
	// 				return response.json()
	// 			})
	// 			.then((data) => {
	// 				setQuizData(data.results)
	// 			})
	// 	}
	// }, [isClicked])

	// function handleChange() {
	// 	console.log('hi')
	// }

	function handleChange(question, event) {
		let selectedAnswer = event.target.value
		setSelectedAnswers((prevSelectedAnswers) => [
			...prevSelectedAnswers,
			{
				[he.decode(question)]: he.decode(selectedAnswer),
			},
		])
	}

	// console.log(selectedAnswers)

	function getCorrectAnswers() {
		let correctAnswersArr = quizData.map((item) => ({
			[he.decode(item.question)]: he.decode(item.correct_answer),
		}))
		return correctAnswersArr
	}

	// console.log(getCorrectAnswers())

	function getNumberOfCorrectAnswers() {
		let correctAnswers = getCorrectAnswers()
		let userEnteredAnswers = selectedAnswers

		let equalCount = 0

		// console.log(correctAnswers, userEnteredAnswers)

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

	function handleCheckBtn() {
		getNumberOfCorrectAnswers()
		setIsHidden(!isHidden)
	}

	function handlePlayBtn() {
		setIsClicked(!isClicked)
	}

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
							handleChange={(event) =>
								handleChange(item.question, event)
							}
						/>
					)
				})

				return quizElements
			}
		} catch (error) {
			console.log('fetch operation failed, try again!', error)
		}
	}
	// {isHidden ? 'check-section hidden' : 'check-section'}
	// {isHidden ? 'play-section' : 'play-section hidden'}

	return (
		<main className='main'>
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
			</section>
		</main>
	)
}

export default App

{
	/* <main className='main'>
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
</main> */
}
