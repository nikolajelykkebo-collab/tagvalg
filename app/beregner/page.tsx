import Header from "../../components/Header";
import Wizard from "../../features/wizard/components/Wizard";
import { BeregnerProvider } from "../../features/wizard/context/WizardContext";

export default function BeregnerPage() {
    return (
        <>
            <Header />
            <BeregnerProvider>
                <Wizard />
            </BeregnerProvider>
        </>
    );
}