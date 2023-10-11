import  { useEffect, useState } from 'react'
import axios from "axios";
// CUSTOM HOOKS 

// BASE API 
axios.defaults.baseURL = "https://opentdb.com";

const useAxios = ({url}) => {

    const [response, setResponse] = useState(null);
    const [error, seterror] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect used for redering the function after it is instructed to work.
    useEffect(() => {
        const fetchData= () =>{
            axios
            .get(url)
            .then((res)=>setResponse(res.data))
            .catch((err)=>seterror(err))
            .finally(()=>setLoading(false));
        };
        fetchData();
    }, [url]);
    

    return { response, error, loading };
}

export default useAxios