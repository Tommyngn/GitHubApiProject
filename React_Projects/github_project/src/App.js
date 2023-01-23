import GithubProvider from './Shared/Context/GithubProvider';
import LandingPage from './Pages/LandingPage/LandingPage';
import './App.css';

function App() {
  return (
    <div>
      <GithubProvider>
        <LandingPage />
      </GithubProvider>
    </div>
  );
}

export default App;
