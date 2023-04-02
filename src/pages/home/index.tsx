import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default () => {
	const Navigate = useNavigate();
	useEffect(()=>{
		if(!sessionStorage.getItem('login')) {
			Navigate("/login");
		}
	},[])
	return (
		<>
			home
		</>
	)
}
