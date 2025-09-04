import { ApiContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
const ContactView = () => {
    const { id } = useParams()
    const {baseUrl} = useContext(ApiContext)
    const [contact, setContact] = useState(null)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [editableContact, setEditableContact] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(baseUrl + "contact/" + id);
            const jsonData = await response.json();
            setContact(jsonData);
        };
        fetchData();
    }, [baseUrl, id])

    const handleUpdate = async () => {
        await fetch(baseUrl + "contact/" + id, {
            method: "PUT",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(editableContact)
        });
        setContact(editableContact);
        setUpdateStatus(false);
    };


    const toggleUpdate = () => {
        setUpdateStatus(!updateStatus);
        if (!updateStatus) {
            setEditableContact({ ...contact }); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableContact(values => ({
            ...values,
            [name]: value
        }));
    };


    const onDelete = async () => {
        await fetch(baseUrl+ "contact/" + id, {
            method:"DELETE", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            .then(res => res.json())
            .then(data => {
                if (data.ok == false) console.log("Error at post request")
                else {
                    navigate(`/`)
                }
            })
    }

    if (!contact) return <p>Loading contact...</p>;

    return (
    <div style={{ textAlign: 'center' }}>
        <img src={contact.profileImage} />
        <h2>{contact.firstName} {contact.lastName}</h2>
        <button onClick={toggleUpdate}>{updateStatus ? "Disable" : "Enable"} update fields</button>
        <div>
            {updateStatus ? (
                <>
                <label>Street*:</label>
                <input required={true} name="street" value={editableContact?.street || ''} onChange={handleChange} /><br/>
                <label>City*:</label>
                <input required={true} name="city" value={editableContact?.city || ''} onChange={handleChange} /><br/>
                <label>Email:</label>
                <input name="email" value={editableContact?.email || ''} onChange={handleChange} /><br/>
                <label>Favourite Colour:</label>
                <input name="favouriteColour" value={editableContact?.favouriteColour || ''} onChange={handleChange} /><br/>
                <label>Gender:</label>
                <input name="gender" value={editableContact?.gender || ''} onChange={handleChange} /><br/>
                <label>Job Title:</label>
                <input name="jobTitle" value={editableContact?.jobTitle || ''} onChange={handleChange} /><br/>
                <label>Latitude:</label>
                <input name="latitude" value={editableContact?.latitude || ''} onChange={handleChange} /><br/>
                <label>Longitude:</label>
                <input name="longitude" value={editableContact?.longitude || ''} onChange={handleChange} /><br/>
                <br />
                <button onClick={handleUpdate}>Submit update</button>
                </>
            ) : (
                <>
                <p><strong>Location:</strong> {contact.street}, {contact.city}</p>
                <p><strong>Email:</strong> {contact.email || "Not listed"}</p>
                <p><strong>Favourite colour:</strong> {contact.favouriteColour || "Not listed"}</p>
                <p><strong>Gender:</strong> {contact.gender || "Not listed"}</p>
                <p><strong>Job:</strong> {contact.jobTitle || "Not listed"}</p>
                <p><strong>Coordinates:</strong>  {contact.latitude ?  contact.latitude + " "+ contact.longitude : "Not listed"}</p>
                </>
            )}
            </div>
        {/* <div>
            <p><strong>Location:</strong> {contact.street}, {contact.city}</p>
            <p><strong>Email:</strong> {contact.email ? contact.email : "Not lsited"}</p>
            <p><strong>Favourite colour:</strong>{contact.favouriteColour ? contact.favouriteColour : "Not listed"}</p>
            <p><strong>Gender:</strong> {contact.gender ? contact.gender : "Not listed"}</p>
            <p><strong>Job:</strong> {contact.jobTitle ? contact.jobTitle : "Not listed"}</p>
            <p><strong>Coordinates:</strong> {contact.latitude ?  contact.latitude + " "+ contact.longitude : "Not listed"}</p>        
        </div> */}
        {(contact?.latitude && contact?.longitude)&&
            <MapContainer center={[contact.latitude, contact.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[contact.latitude, contact.longitude]}>
                    <Popup>
                    {contact.firstName} {contact.lastName}
                    </Popup>
                </Marker>
            </MapContainer> 
        }

        <button onClick={onDelete}>Delete contact</button>
    </div>
    );
};

export default ContactView;