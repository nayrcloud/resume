import { Alert, AlertTitle, Box, Button, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useMarkdown } from '../hooks/useMarkdown';

type MarkdownRendererProps = {
    fileName: string;
};

/**
 * Renders the markdown found in the file passed in as a prop
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ fileName }: MarkdownRendererProps) => {
    const { isLoading, markdown, error } = useMarkdown(fileName);

    return (
        <>
            {markdown ? (
                <Box>
                    <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>{markdown}</ReactMarkdown>
                </Box>
            ) : isLoading ? (
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert
                    severity='error'
                    action={
                        <Button color='inherit' onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                    }
                >
                    <AlertTitle>Could not load about Markown</AlertTitle>
                </Alert>
            ) : null}
        </>
    );
};

export default MarkdownRenderer;
