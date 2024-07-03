import he from 'he'

export default function Quiz(props) {
	const { question, questionId, answers, handleChange } = props

	const answerInputs = answers.map((eachAnswer, index) => {
		return (
			<div key={eachAnswer} className='radio-input'>
				<input
					type='radio'
					name={`answer-${questionId}`}
					id={he.decode(eachAnswer)}
					value={he.decode(eachAnswer)}
					onChange={handleChange}
				/>
				<label htmlFor={he.decode(eachAnswer)}>
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
