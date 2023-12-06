const regexPattern = /^(?=.*[A-Z])(?!.*\s)(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+]).{6,}$/;

export const validEmail = new RegExp(
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
 );
 export const validPassword = new RegExp(regexPattern);

 export const validFirstName = new RegExp(/^[A-Za-z]+$/);

 export const validLastName = new RegExp(/^[A-Za-z '-]+$/i );

 export const validMovieName = new RegExp(/^.+$/);