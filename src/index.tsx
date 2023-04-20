import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './style/fonts';

// Render app in root element

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
