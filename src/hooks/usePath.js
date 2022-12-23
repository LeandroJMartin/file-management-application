import { useContext } from 'react';
import PathContext from '../context/path_context';

export default function usePath() {
    return useContext(PathContext)
}
