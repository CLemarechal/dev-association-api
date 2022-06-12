export function fetchAddressLocation(adress){
    return fetch('https://api-adresse.data.gouv.fr/search/?q=' + adress.replace(' ', '+'))
        .then(response => response.json())
        .then((data) => {
            if(data.features.length == 0){
                return null;
            }

            return {
                lat: data.features[0].geometry.coordinates[1],
                lng: data.features[0].geometry.coordinates[0]
            };
        });
}