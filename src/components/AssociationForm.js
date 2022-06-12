import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default class AssociationForm extends React.Component  {
    
    constructor(props) {
        super(props)
        this.state = {
            searchType: 'NAME',
            searchText: '',
            errorText: '',
            searchTextLabel: 'Ex: La croix rouge'
        }
    }

    onSearchTyeChanged(event){
        let searchTextLabel = '';
        let searchType = event.target.value;

        if(searchType == 'NAME'){
            searchTextLabel = 'Ex: La croix rouge';
        }
        else if(searchType == 'RNA'){
            searchTextLabel = 'Ex: W9C1000188';
        }
        else if(searchType == 'SIRET'){
            searchTextLabel = 'Ex: 01234567890123';
        }

        this.setState({
            searchType: searchType,
            searchTextLabel: searchTextLabel,
            searchText: this.state.searchText,
            errorText: this.state.errorText
        });
    }

    onSearchTextChanged(event){
        let searchType = this.state.searchType;
        let searchText = event.target.value;
        let errorText = '';

        if(searchText == '' || searchText == null || searchText == undefined){
            errorText = '';
        }
        else if(searchType == 'RNA' && !searchText.match(/(w|W)[a-zA-Z 0-9]{9}/g)){
            errorText = 'Le fomat du numéro RNA est incorrect';
        }
        else if(searchType == 'SIRET' && !searchText.match(/[0-9]{14}/g)){
            errorText = 'Le fomat du numéro SIRET est incorrect';
        }

        this.setState({
            searchType: searchType,
            searchText: searchText,
            searchTextLabel: this.state.searchTextLabel,
            errorText: errorText
        });
    }

    onSearchBtnClick(){
        let isSearchTextEmpty = this.state.searchText == '' || this.state.searchText == null || this.state.searchText == undefined;
        let errorText = this.state.errorText;
        let searchType = this.state.searchType;

        if(isSearchTextEmpty && searchType == 'NAME'){
            errorText = 'Le nom de l\'association est requis';
        }
        else if(isSearchTextEmpty && searchType == 'RNA'){
            errorText = 'Le numéro RNA est requis';
        }
        else if(isSearchTextEmpty && searchType == 'SIRET'){
            errorText = 'Le numéro SIRET est requis';
        }

        if(!isSearchTextEmpty && errorText == '' && typeof(this.props.onSearch) == 'function'){
            this.props.onSearch(searchType, this.state.searchText)
        }

        this.setState({
            searchType: this.state.searchType,
            searchText: this.state.searchText,
            searchTextLabel: this.state.searchTextLabel,
            errorText: errorText
        });
    }

    render() {
        let searchType = this.state.searchType;
        let errorText = this.state.errorText;
        let searchTextLabel = this.state.searchTextLabel;

        return (
            <Box >
                <Typography gutterBottom component="div">
                    <Box fontWeight='fontWeightMedium' display='inline' sx={{ fontWeight: 'bold' }}>
                        Recherche
                    </Box>
                </Typography>
                <Box sx={{ mt: 3, mr: 1  }}  >
                    <FormControl sx={{ mr: 1 }} >
                        <InputLabel id="search-type-select-label" >Par</InputLabel>
                        <Select
                            labelId="search-type-select-label"
                            id="search-type-select"
                            value={searchType}
                            label="Par"
                            onChange={(event) => this.onSearchTyeChanged(event)}
                        >
                            <MenuItem value={'NAME'}>Nom</MenuItem>
                            <MenuItem value={'RNA'}>N° RNA</MenuItem>
                            <MenuItem value={'SIRET'}>N° Siret</MenuItem>
                        </Select>
                    </FormControl>
                        <TextField 
                            id="serach-field"
                            label={searchTextLabel}
                            variant="outlined"
                            error={errorText != ''}
                            helperText={errorText}
                            onChange={ (event) => this.onSearchTextChanged(event)} 
                        />   

                </Box>
                <Box sx={{ mt: 2 }} >
                    <Button
                        variant="contained"
                        onClick={() => { this.onSearchBtnClick('clicked');}}
                    >
                        Rechercher
                    </Button>    
                </Box>
            </Box>
        );
    }
}