export  function fetchAssociationList(searchType, searchText, pageNumber = 1, pageSize = 10) {
    return new Promise((resolve, reject) => {    
        if((searchType ?? '') == ''){
            return reject('Le type de recherche n\'est pas spécifié');
        }
        if((searchText ?? '') == ''){
            return reject('Le texte de la recherche n\'est pas spécifié');
        }

        let apiSearchType = "";
        switch(searchType)
        {
            case "NAME": 
                apiSearchType = 'full_text'
                break;
            case "RNA": 
                apiSearchType = 'id'
            break;
            case "SIRET": 
                apiSearchType = 'siret'
                break;
            default: 
                apiSearchType = 'full_text'
                break;
        }

        let url = 'https://entreprise.data.gouv.fr/api/rna/v1/{0}/{1}?page={2}&per_page={3}';
        url = url.replace('{0}', apiSearchType)
                .replace('{1}', searchText)
                .replace('{2}', pageNumber.toString())
                .replace('{3}', pageSize.toString());

        return fetch(url)
            .then(response => response.json())
            .then(
                (responseApi) => {
                    let totalResult = typeof(responseApi.total_result) == 'undefined' ? 1 : responseApi.totalResult;

                    var associationList = {
                        pageNumber : responseApi?.page ?? 0,//page
                        totalPage : responseApi?.total_pages ?? 1, //total_pages
                        totalResult: (
                            typeof(responseApi.total_result) == 'undefined' &&
                            typeof(responseApi.association) == 'undefined'
                        ) ? 0 : totalResult ,
                        data: null
                    }

                    let data = responseApi.association;
                    if(searchType != "NAME"){
                        data = [responseApi.association];
                    }
                    
                    associationList.data = data.map((association) => {
                        let fullAdress = (association.adrs_numvoie ?? '') + ' ' + 
                            (association.adresse_type_voie ?? '') + ' ' + 
                            (association.adresse_libelle_voie ?? '') + ' ' + 
                            (association.adresse_distribution ?? '') + ' ' + 
                            (association.adresse_code_postal ?? '') + ' ' + 
                            (association.adresse_libelle_commune ?? '');
                       

                        return {
                            id: association.id, // id
                            name: association.titre, // champ titre
                            email: association.email,
                            phone: association.telephone,
                            website: association.site_web,
                            siret: association.siret,
                            maj: association.derniere_maj, //date dernière maj
                            address: fullAdress.trim(),
                            isAddressValid: (association.adresse_libelle_voie ?? '') != ''
                                && (association.adresse_code_postal ?? '') != ''
                                && (association.adresse_libelle_commune ?? '') != ''
                         }
                    });
                    resolve(associationList);
                },                
                (e) => {

                }
            );
    })
}