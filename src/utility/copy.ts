import toast from 'react-hot-toast';

export function copyToClipboard(value: string) {
    try {
        navigator.clipboard.writeText(value);
        toast.success('Copied to clipboard');
    } catch (error) {
        console.error(error);

        toast.error('Failed to copy. Please refresh and try again');
    }
}
