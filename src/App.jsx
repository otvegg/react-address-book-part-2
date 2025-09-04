import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import ContactView from './components/ContactView';
import ContactForm from './components/ContactForm';
import { createContext } from 'react';
export const ApiContext = createContext();
export const ContactContext = createContext();

function App() {
    const baseUrl = 'https://boolean-uk-api-server.fly.dev/otvegg/'
    return (
        <BrowserRouter>
            <ApiContext.Provider value={{baseUrl}}>
                <Link to={'/'}>Go Dashboard</Link>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="contact/:id" element={<ContactView/>}/>
                    <Route path="contactForm" element={<ContactForm/>}/>
                </Routes>
            </ApiContext.Provider>
        </BrowserRouter>
    );
}

export default App;
