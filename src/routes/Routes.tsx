import { IonRouterOutlet } from "@ionic/react"
import { Route, Redirect } from "react-router"
import Home from "../pages/Home"

export const Routes: React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route exact path="/">
                <Home />
            </Route>
        </IonRouterOutlet>
    )
}