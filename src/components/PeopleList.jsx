import { Link } from "react-router-dom"

function ContactList(props) {
  const { contacts } = props

  return (
    <ul>
      {contacts.map((contact, index) => (
        <li key={index}>
            <Link to={`contact/${contact.id}`} >
                <h3>{contact.firstName} {contact.lastName}</h3>
            </Link>
        </li>
      ))}
    </ul>
  )
}

export default ContactList