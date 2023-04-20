import { Container, ContainerProps } from '@mui/material';
import React from 'react';

const ViewContainer: React.FC<ContainerProps> = ({ children, sx, ...props }: ContainerProps) => {
    return (
        <Container
            disableGutters
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                ...sx
            }}
            {...props}
            data-component='view'
        >
            {children}
        </Container>
    );
};

export default ViewContainer;
