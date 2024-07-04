import he from 'he'
import shuffle from 'lodash/shuffle'
import { useState, useEffect } from 'react'

export default function Quiz(props) {
	const {
		question,
		questionId,
		answers,
		correctAnswer,
		handleChange,
		isSubmitted,
	} = props

	let styles = {}
	const [shuffledAnswers, setShuffledAnswers] = useState([])

	useEffect(
		function () {
			setShuffledAnswers(shuffle(answers))
		},
		[question]
	)

	// const shuffledAnswers = shuffle(answers)
	const answerInputs = shuffledAnswers.map((eachAnswer) => {
		if (isSubmitted && he.decode(eachAnswer) === correctAnswer) {
			styles = {
				backgroundColor: '#94d7a2',
				border: '1px solid #94d7a2',
			}
		} else if (isSubmitted && he.decode(eachAnswer) !== correctAnswer) {
			styles = {
				backgroundColor: '#F8BCBC',
				border: '1px solid #F8BCBC',
			}
		}

		return (
			<div key={eachAnswer} className='radio-input'>
				<input
					type='radio'
					name={`answer-${questionId}`}
					id={he.decode(eachAnswer)}
					value={he.decode(eachAnswer)}
					onChange={handleChange}
				/>
				<label htmlFor={he.decode(eachAnswer)} style={styles}>
					{he.decode(eachAnswer)}
				</label>
			</div>
		)
	})

	return (
		<div className='quiz-question'>
			<p className='question'>{he.decode(question)}</p>
			<fieldset className='multiple-choice'>{answerInputs}</fieldset>
		</div>
	)
}
