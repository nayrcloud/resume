import { useContext, useEffect, useState } from 'react';
import resume from '../resume/resume.md';
import { ThemeContext } from '../context/ThemeContext';

const MarkdownFileMap = new Map([['resume', resume]]);

type Cache = Map<string, string>;

const cache: Cache = new Map();

interface UseMarkdownState {
    isLoading: boolean;
    markdown: string;
    error: Error | null;
}

export function useMarkdown(fileName: string) {
    const [state, setState] = useState<UseMarkdownState>({
        isLoading: true,
        markdown: '',
        error: null
    });

    const { themeOptions, mode } = useContext(ThemeContext);

    /**
     * Dynamically replaces period-delimited strings that point to references to ThemeObject value properties with their values.
     *
     * For example: The string: {palette.primary.main} gets replaced with the value of themeOptions.palette.primary.main
     *
     */
    const replaceThemePlaceholders = (markdown: string) => {
        const placeholders = markdown.match(/{.*?}/g);

        if (placeholders) {
            for (const placeholder of new Set(placeholders)) {
                const value = placeholder
                    .replace(/[{}]/g, '')
                    .split('.')
                    .reduce((themeOptions, property) => {
                        try {
                            return themeOptions[property as keyof typeof themeOptions];
                        } catch {
                            // An error will be thrown if a placeholder contains a value that does not exist on themeOptions.
                            // Returning an empty object short-circuits the loop and an error will be thrown below.

                            return undefined as unknown as object;
                        }
                    }, themeOptions as object);

                if (typeof value == 'string') {
                    markdown = markdown.replaceAll(placeholder, value);
                } else {
                    console.error(
                        'Could not replace markdown placeholder:',
                        placeholder,
                        'because it could not be found on the theme palette options'
                    );
                }
            }
        }

        return markdown;
    };

    useEffect(() => {
        const getMarkdown = async () => {
            if (MarkdownFileMap.has(fileName)) {
                let markdown = cache.get(fileName) || '';
                let error = null;

                if (!markdown) {
                    try {
                        const markdownFile = await fetch(MarkdownFileMap.get(fileName));
                        markdown = await markdownFile.text();

                        cache.set(fileName, markdown);
                    } catch (err) {
                        console.error(err);

                        error = new Error('Failed to load About markdown', { cause: err });
                    }
                }

                setState({
                    isLoading: false,
                    markdown: replaceThemePlaceholders(markdown),
                    error
                });
            } else {
                const error = new Error(
                    `Could not find mark down file with name ${fileName} in MarkdownFileMap`
                );

                console.error(error);

                setState({
                    isLoading: false,
                    markdown: '',
                    error
                });
            }
        };

        getMarkdown();
    }, [mode]);

    return { ...state };
}
