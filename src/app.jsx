import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [input, setInput] = useState('');
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	const append = (val) => {
		setInput((prev) => prev + val);
	};

	const compute = () => {
		try {
			const tokens = input.match(/(\d+\.?\d*|[+\-*/])/g) || [];
			if (tokens.length === 0) {
				setError('Некорректное выражение');
				return;
			}

			let numbers = [];
			let operators = [];
			for (let i = 0; i < tokens.length; i++) {
				if (i % 2 === 0) {
					numbers.push(parseFloat(tokens[i]));
				} else {
					operators.push(tokens[i]);
				}
			}
			if (numbers.length <= operators.length || !Number.isFinite(numbers[0])) {
				setError('Некорректное выражение');
				return;
			}

			let resultNumbers = [numbers[0]];
			let resultOperators = [];
			for (let i = 0; i < operators.length; i++) {
				if (operators[i] === '*' || operators[i] === '/') {
					const lastNum = resultNumbers.pop();
					const nextNum = numbers[i + 1];
					if (!Number.isFinite(nextNum)) {
						setError('Некорректное выражение');
						return;
					}
					if (operators[i] === '/' && nextNum === 0) {
						setError('Деление на ноль');
						return;
					}
					const result =
						operators[i] === '*' ? lastNum * nextNum : lastNum / nextNum;
					resultNumbers.push(result);
				} else {
					resultNumbers.push(numbers[i + 1]);
					resultOperators.push(operators[i]);
				}
			}

			let finalResult = resultNumbers[0];
			for (let i = 0; i < resultOperators.length; i++) {
				const nextNum = resultNumbers[i + 1];
				if (!Number.isFinite(nextNum)) {
					setError('Некорректное выражение');
					return;
				}
				finalResult =
					resultOperators[i] === '+'
						? finalResult + nextNum
						: finalResult - nextNum;
			}

			if (Number.isFinite(finalResult)) {
				setResult(finalResult);
				setError(null);
			} else {
				setError('Некорректное выражение');
			}
		} catch {
			setError('Ошибка вычисления');
		}
	};

	const clear = () => {
		setInput('');
		setResult(null);
		setError(null);
	};

	return (
		<div className={styles.container}>
			<h1>CALCULATOR</h1>
			<div className={styles.calc}>
				<div className={styles['calc-content']}>
					<div className={styles.input}>{input || '0'}</div>
					{typeof result === 'number' && (
						<div className={styles.result}>= {result}</div>
					)}
					{error && <div className={styles.error}>{error}</div>}
				</div>
			</div>
			<ul className={styles['calc-list']}>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('1')}
					>
						1
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('2')}
					>
						2
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('3')}
					>
						3
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button-op']}
						onClick={() => append('+')}
					>
						+
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('4')}
					>
						4
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('5')}
					>
						5
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('6')}
					>
						6
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button-op']}
						onClick={() => append('-')}
					>
						-
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('7')}
					>
						7
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('8')}
					>
						8
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('9')}
					>
						9
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button-op']}
						onClick={() => append('*')}
					>
						*
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button']}
						onClick={() => append('0')}
					>
						0
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button className={styles['calc-item-button-op']} onClick={compute}>
						=
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button className={styles['calc-item-button-op']} onClick={clear}>
						C
					</button>
				</li>
				<li className={styles['calc-item']}>
					<button
						className={styles['calc-item-button-op']}
						onClick={() => append('/')}
					>
						/
					</button>
				</li>
			</ul>
		</div>
	);
};
