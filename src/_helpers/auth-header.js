export const authHeader = () => {
    try {
        //const credential = JSON.parse(AsyncStorage.getItem('credential'));
        const credential = global.credential;
        if (credential && credential.token) {
            return { 'Content-Type': 'application/json', 'Authorization': 'Token ' + credential.token };
        } else {
            return {};
        }
    } catch (error) {
        console.log('Error retrieving data')
    }
};

export const authFormHeader = () => {
    try {
        const credential = global.credential;
        if (credential && credential.token) {
            return { 'Content-Type': 'multipart/form-data', 'Authorization': 'Token ' + credential.token };
        } else {
            return {};
        }
    } catch (error) {
        console.log('Error retrieving data')
    }
};