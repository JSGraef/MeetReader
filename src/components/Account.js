import React from 'react';

const Account = (props) => {
    if(props.user === undefined)
        return <h4>Couldn't find user</h4>;

    return (
        <pre>
            {JSON.stringify(props.user, null, 4)}
        </pre>
    )}

export default Account;