import {Outlet , Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AdminRoute = () =>{
    const { donorInfo } = useSelector((state) => state.auth );
    return donorInfo && donorInfo.isAdmin?(
        <Outlet/>
    ):(
        <Navigate to='/login' replace/>
    );
}
export default AdminRoute;