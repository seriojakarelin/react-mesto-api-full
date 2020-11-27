const jwt = localStorage.getItem('jwt');

export const config = {
    url: 'http://localhost:3001/', 
    headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }};
