import { ReactNode } from "react";

interface HeaderProps {
    title: string;
    actionButton?: ReactNode;
}

const HeaderPage: React.FC<HeaderProps> = ({ title, actionButton }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: 10 }}>
            <h3 style={{ margin: 0, fontFamily: 'Rounded' }}>{title}</h3>
            {actionButton && <div>{actionButton}</div>}
        </div>
    );
}
export default HeaderPage;