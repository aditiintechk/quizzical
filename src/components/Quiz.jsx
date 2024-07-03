export default function Quiz() {
	return (
		<div className='quiz-question'>
			<p className='question'>How would one say goodbye in Spanish?</p>
			<fieldset className='multiple-choice'>
				<label htmlFor='answer1'>
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
				</label>
			</fieldset>
		</div>
	)
}

// Hola Au Revior Salir
