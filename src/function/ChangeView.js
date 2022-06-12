import { useMap } from 'react-leaflet/hooks'

//Comme les propriétés du composant MapContainer ne changent pas 
//quand on modifie le State on doit passer par une fonction pour mettre à jour le centre de la carte  
export default function ChangeView({ center, zoom }) {
    const map = useMap();

    map.setView(center, zoom);

    return null;
}