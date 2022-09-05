import { NavLink } from 'react-router-dom';

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.<br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src="/img/empty-cart.png" alt="Empty cart" />
            <NavLink to="/" className="button button--black">
              <span>Вернуться назад</span>
            </NavLink>
          </div>
    );
};

export default CartEmpty;