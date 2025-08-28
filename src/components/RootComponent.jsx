import NavBarComponent from "./NavBarComponent";
import SideBarComponent from "./SideBarComponent";
import { Outlet } from "react-router-dom";

export default function RootComponent() {
  console.log("RootComponent is rendering!");
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '250px', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <SideBarComponent />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <NavBarComponent />
        <div style={{ marginTop: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
