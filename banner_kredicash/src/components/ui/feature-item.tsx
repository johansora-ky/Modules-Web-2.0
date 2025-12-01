import { GradientIcon } from "./gradient-icon";
import "./feature-item.css";

interface FeatureItemProps {
    title: string;
}

export function FeatureItem({ title }: FeatureItemProps) {
    return (
        <div className="feature-item">
            <GradientIcon />
            <div className="feature-item-content">
                <h3 className="feature-item-title">{title}</h3>
                {/* <p className="feature-item-description">{description}</p> */}
            </div>
        </div>
    );
}

