import { Button } from '@mui/material';
import React from 'react';

interface IShowAnalysisButtonProps {
    onClick: () => void
}


const ShowAnalysisButton = ({ onClick }: IShowAnalysisButtonProps) => {
    return <Button onClick={onClick}>Analyise!</Button>
}

export default ShowAnalysisButton;