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

// Hola Au Revior Salir

{
	/* <label htmlFor='answer1'>
    <input
        type='radio'
        name='answer'
        id='answer1'
        value='answer1'
    />
    Hola
</label>
<label htmlFor='answer2'>
    <input
        type='radio'
        name='answer'
        id='answer2'
        value='answer2'
    />
    Au Revior
</label>
<label htmlFor='answer3'>
    <input
        type='radio'
        name='answer'
        id='answer3'
        value='answer3'
    />
    Adios
</label>
<label htmlFor='answer4'>
    <input
        type='radio'
        name='answer'
        id='answer4'
        value='answer4'
    />
    Salir
</label> */
}
