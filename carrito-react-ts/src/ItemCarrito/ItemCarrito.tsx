import Button from '@material-ui/core/Button'
//Tipos
import { TipoItemCarrito } from '../App';
import Item from '../Item/Item';
//Estilos
import { Envoltorio } from './ItemCarrito.styles';

type Props = {
    item: TipoItemCarrito;
    agregarAlCarrito: (itemClickeado: TipoItemCarrito) => void;
    eliminarDelCarrito: (id: number) => void;
}

const ItemCarrito: React.FC<Props> = ({ item, agregarAlCarrito, eliminarDelCarrito }) => (
    <Envoltorio>
        <div>
            <h3>{item.title}</h3>
            <div className='informacion'>
                <p>Precio: ${item.price.toFixed(2)}</p>
                <p>Cantidad: {item.amount} {(item.amount > 1) ? 'unidades' : 'unidad'}</p>
                <p>Subtotal: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='botones'>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => eliminarDelCarrito(item.id)}
                >
                    -
                </Button>
                <Button
                    size='small'
                    disableElevation
                    variant='contained'
                    onClick={() => agregarAlCarrito(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Envoltorio>
)

export default ItemCarrito;