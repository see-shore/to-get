import { useLocation, useParams } from 'react-router-dom';

function ProductDetails() {
  const { slug } = useParams();
  const { state } = useLocation();
  return (
    <div>
      <a className='tempPageSign'>{state.selected.name} Details Page</a>
    </div>
  );
}

export default ProductDetails;
