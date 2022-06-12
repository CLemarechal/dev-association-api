import * as React from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import ChangeView from '../function/ChangeView'


export default class AssociationMap extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            location: {
                lat: 0,
                lng: 0
            },
            address: ''
        }
    }

    
    componentDidMount(){
        this.setState({
            location: this.props.location,
            address: this.props.address,
        });
    }

    render(){
        
        let location = [this.state.location.lat, this.state.location.lng];
        let address = this.state.address;

        return (
            <MapContainer center={location} zoom={13} scrollWheelZoom={false}>
                <ChangeView center={location} zoom={13} /> 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                />
                <Marker position={location}>
                    <Popup>
                        <a>{address}</a>
                    </Popup>
                </Marker>
            </MapContainer>
        );
    }
}