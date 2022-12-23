import { useContext } from 'react';
import AuthContext from '../context/user_context';

export default function useAuth() {
    return useContext(AuthContext)
}
