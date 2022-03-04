import ItemCarrito from "../ItemCarrito/ItemCarrito";
//Estilos
import { Envoltorio } from "./Carrito.styles";
//Tipos
import { TipoItemCarrito } from "../App";

type Props = {
    itemsCarrito: TipoItemCarrito[];
    agregarAlCarrito: (itemClickeado: TipoItemCarrito) => void;
    eliminarDelCarrito: (id: number) => void;
}

const Carrito: React.FC<Props> = ({ itemsCarrito, agregarAlCarrito, eliminarDelCarrito }) => {
    const calcularTotal = (items: TipoItemCarrito[]) =>
        items.reduce((acu: number, item) => acu + item.amount * item.price, 0);

    return (
        <Envoltorio>
            <h2>Tu Carrito de Compras</h2>
            {itemsCarrito.length === 0 ? <p>No hay items en el carrito.</p> : null}
            {itemsCarrito.map(item => (
                <ItemCarrito
                    key={item.id}
                    item={item}
                    agregarAlCarrito={agregarAlCarrito}
                    eliminarDelCarrito={eliminarDelCarrito}
                />
            ))}
            <h2>Total: ${calcularTotal(itemsCarrito).toFixed(2)}*</h2>
            <h5>*Pesos argentinos, impuestos no incluidos.</h5>
        </Envoltorio>
    );
};

export default Carrito;