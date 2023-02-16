import {useState, useMemo, useCallback, useRef} from "react";
import { MapContainer, TileLayer,Marker, Popup,} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import {useDispatch, useSelector} from "react-redux"
import {setLocation, setSenderLocationLatLng} from "../redux/reducers/locationSlice"
import L from 'leaflet';
import '../App.css'
import { notification } from 'antd';

const dragSenderMarker = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});


const Map = ()=> {
    const {senderLocationLatLng} = useSelector(state=> state.location)
    const {lat, lng} = senderLocationLatLng
    const dispatch = useDispatch()

    const center = {
      lat: 27.68564550564005,
      lng: 85.3445145828365,
    }

    const geoCodeLatLng = async (lat, lng)=> {    
      const resp = await fetch  (`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.REACT_APP_MAP_API_KEY}`)
      const data = await resp.json()
      // console.log(data.features[0].properties.formatted, "abc")
      dispatch(setLocation(data.features[0].properties.formatted))


    }
    
  function DraggableMarker() {

    const {senderLocationLatLng,} = useSelector(state=> state.location)
    const dispatch = useDispatch()
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)


    const eventHandlers = useMemo(
      (e) => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            const latLngObj = {
              lat: marker.getLatLng().lat,
               lng: marker.getLatLng().lng
              }
            dispatch(setSenderLocationLatLng(latLngObj))
            geoCodeLatLng(marker.getLatLng().lat, marker.getLatLng().lng)

          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
    
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={senderLocationLatLng.lat ? senderLocationLatLng : center}
        icon={dragSenderMarker}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span >
            This marker is draggable
          </span>
        </Popup>
      </Marker>
    )
  }

  return(
      <>
      <MapContainer  center={lat ? [lat, lng] : [ 27.68564550564005,85.3445145828365]} zoom={10} scrollWheelZoom={false}
                style={{ height: "60vh", width:"40vw" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
             <DraggableMarker/> 
   </MapContainer>
    </>
  )
  }
  export default Map