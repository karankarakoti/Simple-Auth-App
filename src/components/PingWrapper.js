import React, { useEffect, useState } from "react";

import Loader from "components/Loader";
import PingError from "components/PingError";
import { apiConfig } from "config";
import Axios from "utils/axios";

const PingWrapper = ({
  children
}) => {

  const [ loading, setLoading ] = useState(true);
  const [ ping, setPing ] = useState(false);

  useEffect(() => {
    async function ping() {
      try {
        const { data } = await Axios.get(apiConfig.API_BASE_URL+"/ping");
        setPing(data?.success);        
      }catch(e) {
        setPing(false);
      }      
      setLoading(false);      
    }
    ping();    
  }, []);

  return (
    <>
      {loading ? <Loader/> : ping ? children : <PingError/>}
    </>    
  )
}

export default PingWrapper;