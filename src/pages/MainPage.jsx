import Main from "../features/main/MainHome";
import main_bg from "../assets/savee_bg.jpg";
import { AnalysisHighlightProvider } from "../context/AnalysisHighlightContext";
export default function MainPage() {
  return (
    <AnalysisHighlightProvider>
      <Main />
    </AnalysisHighlightProvider>
  );
}
