import { Box, BoxProps, CircularProgress, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface ViewProps extends BoxProps {
    headline?: string | ReactNode;
    subtitle?: string;
    hideHeadline?: boolean;
    isLoading?: boolean;
}

/**
 * The View layout component sits inside the Workspace and contains Widgets
 */
const View: React.FC<ViewProps> = ({
    headline,
    subtitle,
    hideHeadline = false,
    isLoading = false,
    children,
    sx,
    ...props
}: ViewProps) => {
    let elHeadline = null;

    if (!hideHeadline) {
        let title;

        if (typeof headline == 'string') {
            title = (
                <Typography variant='h4' noWrap>
                    {headline}
                </Typography>
            );
        } else {
            title = headline;
        }

        elHeadline = (
            <Stack sx={{ mb: 4 }}>
                <Stack direction='row' sx={{ alignItems: 'center' }} gap={2}>
                    {title}
                </Stack>
                <Typography>{subtitle}</Typography>
            </Stack>
        );
    }

    return (
        <>
            <Box width='100%'>{elHeadline}</Box>
            <Box
                sx={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    ...sx
                }}
                {...props}
            >
                {isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> : children}
            </Box>
        </>
    );
};

export default View;
