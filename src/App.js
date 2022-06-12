import * as React from 'react';

import AssociationTable from './components/AssociationTable';
import AssociationForm from './components/AssociationForm';
import AssociationMap from './components/AssocationMap';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchType: '',
      searchText: '',
      location: {
        lat: 0,
        lng: 0
      },
      showMap: false
    }
  }

  onSearch(searchType, searchText) {
    this.setState({
      searchType: searchType,
      searchText: searchText,
      showMap: false
    })
  }

  onAddressClick(location, address) {
    this.setState({
      location: location,
      address: address,
      showMap: true
    })
  }

  hideMap() {
    this.setState({
      showMap: false
    })
  }

  render() {
    let searchType = this.state.searchType;
    let searchText = this.state.searchText;
    let location = this.state.location;
    let showMap = this.state.showMap;
    let address = this.state.address;

    return (
      <div>
        <Grid container spacing={2} sx={{ p: 3, bgcolor: 'grey.300', height: '100%' }} >
          <Grid item xs={4}>
            <Item>
              <AssociationForm onSearch={(searchType, searchText) => this.onSearch(searchType, searchText)} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <AssociationTable searchType={searchType} searchText={searchText} onAddressClick={(location, address) => this.onAddressClick(location, address)} />
            </Item>
          </Grid>
        </Grid>

        <Dialog open={showMap} onClose={() => this.hideMap()} fullWidth maxWidth="md">
            <DialogTitle>Carte</DialogTitle>
            <DialogContent>
                <AssociationMap location={location} address={address} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.hideMap()}>Ok</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}