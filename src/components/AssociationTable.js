import * as React from 'react';
import { fetchAssociationList} from '../function/FetchAssociationList';
import { fetchAddressLocation } from '../function/FetchAddressLocation';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, frFR } from '@mui/x-data-grid';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const theme = createTheme(frFR);


export default class AssociationTable extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      pageNumber: 0,
      totalPage: 1,
      dataIsLoaded: false,
      currentPage: 1 
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.searchType == this.props.searchType && prevProps.searchText == this.props.searchText){
      return;
    }
    
    return this.updateAssociationList();
  }

  setPage(newPage){
    return this.updateAssociationList(newPage + 1);
  }

  updateAssociationList(pageNumber = 1, pageSize = 10){
      return fetchAssociationList(this.props.searchType, this.props.searchText, pageNumber, pageSize)
        .then(result => {
          this.setState({
            data: result.data,
            pageNumber: result.pageNumber - 1,
            totalPage: result.totalPage,
            dataIsLoaded: true
          });
        });
  }

  onGoToAdress(address){
    if(typeof(this.props.onAddressClick) != 'function'){
      return;
    }
    
    return fetchAddressLocation(address)
      .then((location) => {
        if(location != null){
          this.props.onAddressClick(location, address);
        }
      })
  }

  render() {
    let data = this.state.data;
    let rowCount = this.state.totalPage;
    let page = Number(this.state.pageNumber);
    let pageSize = 10;

    let columns = [
      { field: 'id', headerName: 'Id', width: 100 ,flex :1  },
      { field: 'name', headerName: 'Nom', width: 200 ,flex :2},
      { field: 'address', headerName: 'Adresse',  minWidth: 200,flex : 3  },
      { field: 'email', headerName: 'Email', width: 150,flex :1 },
      { field: 'phone', headerName: 'Télephone', width: 150 ,flex :1},
      { 
        field: 'website',
        headerName: 'Site web',
        width: 200,
        renderCell:(params) => { return(<a href={params.row.website || ''} target="_blank">{params.row.website || ''}</a>) }
      },
      { field: 'siret', headerName: 'Siret', width: 100,flex :1 },      
      {
        field: 'isAddressValid',
        headerName: 'Localiser',
        renderCell: (params) => !(params?.row?.isAddressValid ?? false) ? (<div></div>) : (
          <IconButton aria-label="goToAdress" size="small" onClick={() => { this.onGoToAdress(params.row.address) }}>
            <AddLocationIcon fontSize="inherit" />
          </IconButton>
        ),
      },
    ]

    return (
      <Box sx={{ width: '100%'}}>
        <Typography gutterBottom component="div">
            <Box fontWeight='fontWeightMedium' display='inline' sx={{ fontWeight: 'bold' }}>
                Résultats
            </Box>
        </Typography>
        
        <ThemeProvider theme={theme}>
          <DataGrid
            autoHeight
            rows={data}
            rowCount={rowCount}
            rowsPerPageOptions={[10]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            onPageChange={(newPage) => this.setPage(newPage)}
            columns={columns}
          />
        </ThemeProvider>;
      </Box>
    );
  }
  
}


