import '../bootstrap';
import '../../css/app.css'

import ReactDOM from 'react-dom/client';
import AppRoutes from "./routes/routes";
ReactDOM.createRoot(document.getElementById('app')).render(
    <AppRoutes />
);
