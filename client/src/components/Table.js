import React from 'react';
import Recipient from './Recipient'
const Table = (data) => {
    const {data: contacts} = data;
    return (
        <table>
            <thead>
                <tr>
                    <th><input type='checkbox'></input></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company name</th>
                    <th>Role</th>
                    <th>Forecast</th>
                    <th>Recent activity</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, key) => (
                    <tr key={key}>
                        <td><input type='checkbox'></input></td>
                        <td><Recipient image={contact.photo} name={contact.name}/></td>
                        <td>{contact.email}</td>
                        <td>{contact.companyName}</td>
                        <td>{contact.role}</td>
                        <td>{contact.forecast}</td>
                        <td>{contact.recentActivity}</td>
                    </tr>
                )
                )}
            </tbody>
        </table>
    )
   
}
export default Table;