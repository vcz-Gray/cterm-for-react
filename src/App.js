import logo from './logo.svg';
import './App.css';
import Terminal from './Terminal';

function App() {
	return (
		<div className='App'>
			<Terminal props={{ email: 'zzz@zzz.zzz' }} />
		</div>
	);
}

export default App;
