import {Outlet , Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PrivateRoute = () =>{
    const { donorInfo } = useSelector((state) => state.auth );

    return donorInfo ? <Outlet/> : <Navigate to = "/login" replace/>
}
export default PrivateRoute;