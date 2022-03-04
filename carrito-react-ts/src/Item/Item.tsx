import Button from '@material-ui/core/Button';
//Tipos
import { TipoItemCarrito } from '../App';
//Stilos
import { Envoltorio } from './Item.styles'

type Props = {
    item: TipoItemCarrito;
    handleAgregarAlCarrito: (itemClickeado: TipoItemCarrito) => void;
}

const Item: React.FC<Props> = ({ item, handleAgregarAlCarrito }) => (
    <Envoltorio>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price.toFixed(2)}</h3>
        </div>
        <Button onClick={() => handleAgregarAlCarrito(item)}>Agregar al Carrito</Button>
    </Envoltorio>
)

export default Item;