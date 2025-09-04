import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '../App';


function ContactForm() { // , onHire
    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: ""
    })

    const {baseUrl} = useContext(ApiContext)
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target
        setInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log("Form submitted with:", info);
        await fetch(baseUrl+"contact", {
            method:"POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "firstName": info.firstName,
                "lastName": info.lastName,
                street: info.street,
                city: info.city
            })}
            ).then(res => res.json())
            .then(data => {
                if (data.ok == false) console.log("Error at post request")
                else {
                    navigate(`/contact/${data.id}`)
                }
            })
        
    }

    return (
        <div>
            <h3>Add a new contact!</h3>
            <form onSubmit={handleSubmit}>
                <label>First name*</label>
                <input
                required={true}
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={info.firstName}
                />
                <br/>
                <label>Last name*</label>
                <input
                required={true}
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={info.lastName}
                />
                <br/>
                <label>Street name*</label>
                <input
                required={true}
                type="text"
                id="street"
                name="street"
                onChange={handleChange}
                value={info.street}
                />
                <br/>
                <label>City name*</label>
                <input
                required={true}
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                value={info.city}
                />
                <br/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default ContactForm