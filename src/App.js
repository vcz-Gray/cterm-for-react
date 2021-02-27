import logo from './logo.svg';
import './App.css';
import Terminal from './Terminal';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
			<Terminal props={{ email: 'zzz@zzz.zzz' }} />
		</div>
	);
}

export default App;
