import { Container, useTheme } from '@mui/material';
import Workspace from './Workspace';

/**
 * Defines the layout of the app.
 */
const AppLayout: React.FC<React.HTMLProps<HTMLElement>> = ({
    children
}: React.HTMLProps<HTMLElement>) => {
    const theme = useTheme();
    const minWidth = theme.breakpoints.values.xs;

    return (
        <Container
            disableGutters
            sx={{
                minHeight: '100vh',
                minWidth,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Workspace sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </Workspace>
        </Container>
    );
};

export default AppLayout;
