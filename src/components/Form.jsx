// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import Button from "./Button.jsx";
import styles from "./Form.module.css";
import useUrlPosition from "../hooks/useUrlPosition";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [mapLat,mapLng] = useUrlPosition();

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
const [emoji,setEmoji ]= useState();
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false);
const [geocodingError,setGeocodingError]= useState();
  useEffect(function (){
async function fetchCityData(){
  try{
    setGeocodingError("");
setIsLoadingGeocoding(true);
const res = await fetch (`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
const data = await res.json();
console.log(data);

if (!data.countryCode) throw new Error ('That doesnt seem to be a city. Click somewhere else');


setCityName(data.city || data.locality || "");
setCountry(data.countryName);
setEmoji(convertToEmoji(data.countryCode));

  }catch (err){
setGeocodingError(err.message);
  }finally{
    setIsLoadingGeocoding(false);
    
  }
}
  },[lat,lng]);

if (isLoadingGeocoding) return <Spinner/>;

  if (geocodingError) return <Message message={geocodingError}/>;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
       
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        
       
      </div>
    </form>
  );
}

export default Form;
