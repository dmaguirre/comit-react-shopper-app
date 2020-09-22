import React from 'react'

export default function Login(props) {
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <label>Username
                <input value={props.username} onChange={props.handleChangeUsername} />
            </label>
            <label>Password
                <input type="password" value={props.password} onChange={props.handleChangePassword} />
            </label>

            <button onClick={props.handleClick}>Submit</button>
        </form>
    )
}
