import Inter from "./assets/fonts/Inter.ttf";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import RootComponent from "./components/RootComponent";
// import "../app.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/bodyComponents/Home/Dashboard";
import Customer from "./components/bodyComponents/customer/Customer";
import GuiaCarga from "./components/bodyComponents/guiaCarga/GuiaCarga";
import Inventario from "./components/bodyComponents/inventario/Inventario";
import Producto from "./components/bodyComponents/producto/Producto";
import Categoria from "./components/bodyComponents/categoria/Categoria";
import Bodega from "./components/bodyComponents/bodega/Bodega";
import Existencia from "./components/bodyComponents/existencia/Existencia";

import Movimiento from "./components/bodyComponents/movimiento/Movimiento";
import Setting from "./components/bodyComponents/Settings/Setting";

function App() {
  const theme = createTheme({
    spacing: 4,
    palette: {
      mode: "light",

      // primary: {
      //   main: "#573BFE",
      // },
      // text: {
      //   primary: "#202635",
      //   secondary: "#A0AEC0",
      // },
      // secondary: {
      //   main: "#01C0F6",
      // },
      // error: {
      //   main: "#E03137",
      // },
    },

    typography: {
      fontFamily: "Inter",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Raleway'), local('Raleway-Regular'), url(${Inter}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
    //here we customize our typographi and in the variant prop we can use out myVar value
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootComponent />}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Customer />} />
        <Route path="guias-carga" element={<GuiaCarga />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="productos" element={<Producto />} />
        <Route path="categorias" element={<Categoria />} />
        <Route path="existencias" element={<Existencia />} />
        <Route path="bodegas" element={<Bodega />} />
        <Route path="movimientos" element={<Movimiento />} />
        <Route path="configuracion" element={<Setting />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
