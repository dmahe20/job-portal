import React, { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Routes/Routes';
import { Toaster } from 'react-hot-toast';
import { DarkModeContext } from './contexts/DarkModeTheme'; // Import DarkModeContext
import Switch from 'react-switch'; // Import react-switch

function App() {
  // Access dark mode context and its toggle function
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div style={{ 
      backgroundColor: darkMode ? '#333' : 'white', 
      color: darkMode ? 'white' : 'black',
      minHeight: '100vh', // Ensures the container fills the entire viewport
      transition: 'background-color 0.3s, color 0.3s' // Add smooth transition
    }}>
      {/* Your content */}
      <RouterProvider router={router} />
      <Toaster />

      {/* Toggle switch */}
      <div style={{ display:'flex',justifyContent: 'center',alignItems: 'center', marginTop: '20px' }}>
        <span style={{ marginRight: '10px' }}>Dark Mode</span>
        <Switch
          onChange={toggleDarkMode} // Call toggleDarkMode when switch is toggled
          checked={darkMode} // Set the checked state based on darkMode
          offColor="#ddd" // Color when switch is off
          onColor="#222" // Color when switch is on
        />
      </div>
    </div>
  );
}

export default App;
