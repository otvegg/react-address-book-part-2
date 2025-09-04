import { useState, useEffect} from 'react'
import ContactList from './PeopleList';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from "../App";
import { useContext } from "react";



function Dashboard() {
    const url = 'contact'
    const navigate = useNavigate();

    const [contacts, setContacts] = useState([])
    const {baseUrl} = useContext(ApiContext)
    const [filter, setFilter] = useState(null)
    const [filteredContacts, setFilteredContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch(baseUrl + url);
        const jsonData = await response.json();
        setContacts(jsonData);
        };
        fetchData();
        
    }, [baseUrl]);

    useEffect(()=>{
        console.log("filter:",filter)
        if (filter) {
            const result = contacts.filter(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(filter.toLowerCase()))
            setFilteredContacts(result)
        } else setFilteredContacts(contacts)
    }, [filter, contacts])

    const handleClick = () => {
        navigate('/contactForm')
    }

    function handleChange(e) {
        const { value } = e.target
        setFilter(value)
    }

    return (
        <main>
        <section>
            <h2>Contacts <button onClick={handleClick}>Add contact</button></h2>
            <input 
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={filter}/>
            <ContactList contacts={filteredContacts}/>
        </section>
        </main>
    )
}

export default Dashboard