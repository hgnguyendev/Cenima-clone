import './App.css';
import 'swiper/css';
import { LayoutDefault } from './DefaultLayout/LayoutDefault';
import { AllPage } from './routes/AllPage';
function App() {
    return (
        <div className="App">
           <LayoutDefault>
              <AllPage />
           </LayoutDefault>
        </div>
    );
}

export default App;
