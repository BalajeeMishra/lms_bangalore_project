export function validateError(values) {
    let errors= {};
    if(!values.email) {
        errors.email = 'Please enter email!';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if(!values.password) {
        errors.password = 'Please enter password!';
    }
    return errors;
}