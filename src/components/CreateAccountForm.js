import React from 'react';

function CreateAccountForm() {
    return <div>
    <form className="" onSubmit={e => CreateAccountFunction(e)}>
        <label htmlFor="createEmail"> Email</label>
        <input type="email" name="createEmail" />
        <label htmlFor="createPassowrd">Password</label>
        <input type="password" name="createPassword" />
        <button>Submit</button>
    </form>
    </div>;
}

export default CreateAccountForm;

