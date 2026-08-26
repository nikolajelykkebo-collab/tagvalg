import Wizard from "../../features/wizard/components/Wizard";
import { BeregnerProvider } from "../../features/wizard/context/WizardContext";

export default function BeregnerPage() {
    return (
        <BeregnerProvider>
            <Wizard />
        </BeregnerProvider>
    );
}