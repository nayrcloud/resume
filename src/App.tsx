import { ThemeContextProvider } from './context/ThemeContext';
import AppLayout from './layout/AppLayout';
import ViewContainer from './layout/ViewContainer';
import ViewHome from './views/ViewHome';

/**
 * Main app content. This function conditionally renders a View inside the main App Layout.
 */
function App() {
    return (
        <ThemeContextProvider>
            <AppLayout>
                <ViewContainer>
                    <ViewHome />
                </ViewContainer>
            </AppLayout>
        </ThemeContextProvider>
    );
}

export default App;
