import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users').then(value => setUsers(value.data.users))

    }, [])

    return (
        <div>
            <h2>Users:</h2>
            {users.map(user => <div key={user._id}>{user.name} -- {user.email}</div>)}

        </div>
    );
};

export {App};