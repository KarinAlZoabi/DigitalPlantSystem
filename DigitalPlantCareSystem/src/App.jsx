import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { COLORS } from './styles/colors';
import { userPlants } from './UserPlantData';
import { useParams } from 'react-router-dom';

// Component Imports
import UserDashboard from './components/userDashboard';
import PlantDetails from './components/plantDetails';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${COLORS.backgroundGreen};
    font-family: 'Poppins', sans-serif;
  }
`;

// Wrapper to find the plant data based on URL ID
function PlantDetailsWrapper() {
  const { id } = useParams();
  const plant = userPlants.find(p => p.id === id);
  return plant ? <PlantDetails userPlant={plant} /> : <div>Plant not found</div>;
}

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* Dashboard is your home page */}
          <Route path="/" element={<UserDashboard />} />
          
          {/* Details page for specific plants */}
          <Route path="/plant/:id" element={<PlantDetailsWrapper />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;