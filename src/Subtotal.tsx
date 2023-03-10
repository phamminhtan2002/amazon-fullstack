import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const style = {
	wrapper: `flex flex-col justify-between xl:w-[300px] 2xl:w-[340px] h-[114px] px-[20px] pb-[20px] pt-[16px] bg-[#f3f3f3] border-[1px] border-solid border-[#ddd] rounded-[3px]`,
	gift: `flex items-center`,
	gift__input: `mr-[5px]`,
	btn: `bg-[#f0c14b] rounded-[10px] w-full h-[30px] border-[1px] border-solid border-t-[#a88734] border-b-[#846a29] border-x-[#9c7e31] mt-[10px] text-[#111] active:scale-95 transform transition duration-100 ease-in`,
};

function Subtotal() {
	const navigate = useNavigate();
	const [{ basket }, dispatch] = useStateValue();

	return (
		<div className={style.wrapper}>
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items):
							<strong>{value}</strong>
						</p>
						<small className={style.gift}>
							<input
								className={style.gift__input}
								type="checkbox"
							/>{' '}
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2} //Total price decimal
				value={getBasketTotal(basket)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>

			<button
				onClick={(e) => navigate('/payment')}
				className={style.btn}>
				Proceed to Checkout
			</button>
		</div>
	);
}

export default Subtotal;
