
export default function getDistanceFromLatLonInM(lat1:number, lon1:number, lat2:number, lon2: number) {
    function deg2rad(deg:number) {
        return deg * (Math.PI/180)
      }
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c * 1000; // Distance in m
    return d;
  }
  
