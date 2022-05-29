import { useEffect, useState } from 'react'

function useMediaQuery(query) {

    const [isMatching, setIsMatching] = useState(false);

    let mediaQuery = window.matchMedia(`(max-width: ${query})`);



    function checkQuery(e) {   
        if(e.matches){
            setIsMatching(true); 
        }
        else {
            setIsMatching(false);
        }
    }

    mediaQuery.addEventListener('change', checkQuery);

    useEffect(()=>{
        if(mediaQuery.matches){
            setIsMatching(true);
        }
    },[])

    return isMatching
}
export default useMediaQuery