import React,{useState,useRef} from "react";
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import { useSelector } from "react-redux";
import 'leaflet/dist/leaflet.css'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const Map = () =>{

    const selected = useSelector(state=>state.Members.Selected)
    const [position,setPosition] = useState([10.0320776, 77.4816581]);

    // const [center,setCenter] = useState([PersonalDetail.location.lat, PersonalDetail.location.long]);
    const MapRef = useRef(null);
    return(
        <div className="h-[70vh] w-full p-5 flex flex-col gap-5">
            <h1 className="text-primary text-xl md:text-2xl font-semibold">Location</h1>
            <MapContainer center={position} className="h-full w-full rounded-md" zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup>
                        Location of {selected.personName}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map