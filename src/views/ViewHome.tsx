import ResumeMarkdown from '../components/ResumeMarkdown';
import ThemePicker from '../components/ThemePicker';
import View from '../layout/View';

/**
 * This view contains the Markdown that describes the app
 */
const ViewHome: React.FC = () => {
    return (
        <View sx={{ gap: 4, position: 'relative' }} hideHeadline={true}>
            <ThemePicker sx={{ zIndex: 1, position: 'absolute', top: 0, right: 0 }} />
            <ResumeMarkdown />
        </View>
    );
};

export default ViewHome;
