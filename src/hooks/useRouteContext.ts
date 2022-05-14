import { useContext } from 'react';
import RouteContext from '../context/RouteContext';

const useRouteContext = () => useContext(RouteContext);

export default useRouteContext;
