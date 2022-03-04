import { useState } from "react";
import { useQuery } from "react-query";
//Componentes
import Item from './Item/Item'
import Carrito from "./Carrito/Carrito";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
//import { CircularProgress } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//Estilos
import { Envoltorio, BotonConEstilo } from "./App.styles";


//Tipos
export type TipoItemCarrito = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProductos = async (): Promise<TipoItemCarrito[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [carritoAbierto, estaAbierto] = useState(false);
  const [itemsCarrito, setItemsCarrito] = useState([] as TipoItemCarrito[]);


  const { data, isLoading, error } = useQuery<TipoItemCarrito[]>(
    'productos',
    getProductos
  );
  console.log(data);

  const getTotalItems = (items: TipoItemCarrito[]) => items.reduce((acu: number, item) => acu + item.amount, 0);

  const handleAgregarAlCarrito = (itemClickeado: TipoItemCarrito) => {
    setItemsCarrito(prev => {
      const estaEnElCarrito = prev.find(item => item.id === itemClickeado.id);

      if (estaEnElCarrito) { //buscar si está
        return prev.map(item =>
          item.id === itemClickeado.id
            ? { ...item, amount: item.amount + 1 } //si está agregamos uno a la cantidad
            : item
        )
      }
      return [...prev, { ...itemClickeado, amount: 1 }]; //si es la primera vez que se clickea el item, lo agregamos y establecemos la cantidad en uno
    })
  };

  const handleQuitarDelCarrito = (id: number) => {
    setItemsCarrito(prev => (
      prev.reduce((acu, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acu;
          return [...acu, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acu, item];
        }

      }, [] as TipoItemCarrito[])
    ))
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Algo anduvo mal...</div>

  return (
    <Envoltorio>
      <Drawer anchor='right' open={carritoAbierto} onClose={() => estaAbierto(false)}>
        <Carrito itemsCarrito={itemsCarrito}
          agregarAlCarrito={handleAgregarAlCarrito}
          eliminarDelCarrito={handleQuitarDelCarrito} />
      </Drawer>
      <BotonConEstilo onClick={() => estaAbierto(true)}>
        <Badge badgeContent={getTotalItems(itemsCarrito)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </BotonConEstilo>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAgregarAlCarrito={handleAgregarAlCarrito} />
          </Grid>
        ))}
      </Grid>
    </Envoltorio>
  );
}

export default App;