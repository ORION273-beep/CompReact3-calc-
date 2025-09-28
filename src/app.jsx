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
      const value = eval(input);
      if (Number.isFinite(value)) {
        setResult(value);
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
							{typeof result === 'number' && <div className={styles.result}>= {result}</div>}
							{error && <div className={styles.error}>{error}</div>}
						</div>
					</div>
						<ul className={styles['calc-list']}>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('1')}>1</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('2')}>2</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('3')}>3</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button-op']}onClick={() => append('+')}>+</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('4')}>4</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('5')}>5</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('6')}>6</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button-op']}onClick={() => append('-')}>-</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('7')}>7</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('8')}>8</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('9')}>9</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button-op']}onClick={() => append('*')}>*</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button']}onClick={() => append('0')}>0</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button-op']}onClick={compute}>=</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button-op']}onClick={clear}>C</button></li>
							<li className={styles['calc-item']}><button className={styles['calc-item-button-op']}onClick={() => append('/')}>/</button></li>
						</ul>
				</div>
	);
};


