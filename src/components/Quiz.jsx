import he from 'he'

export default function Quiz(props) {
	const { question, correctAnswer, answers } = props

	const answerInputs = answers.map((eachAnswer, index) => {
		return (
			<label htmlFor={`answer${index + 1}`}>
				<input
					type='radio'
					name='answer'
					id={`answer${index + 1}`}
					value={`answer${index + 1}`}
				/>
				{he.decode(eachAnswer)}
			</label>
		)
	})

	return (
		<div className='quiz-question'>
			<p className='question'>{he.decode(question)}</p>
			<fieldset className='multiple-choice'>{answerInputs}</fieldset>
		</div>
	)
}
