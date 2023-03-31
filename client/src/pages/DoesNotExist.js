import useWindowWidth from '../hooks/useWindowWidth';
import ProductButton from '../components/product/ProductButton';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';

import { PageContainer, AvatarContainer, StyledLink } from '../styles/pages/DoesNotExist.styled';

function DoesNotExist() {
  const width = useWindowWidth();
  return (
    <PageContainer className={'page'} style={{ backgroundColor: width > 1024 ? 'white' : 'transparent' }}>
      <AvatarContainer>
        <SpeechBox dir={'center'} text={'Nothing to see here!'} />
        <ShopOwnerAvatar embarrassed={true} />
      </AvatarContainer>
      <StyledLink to={'/products'}>
        <ProductButton back={false} product={true} />
      </StyledLink>
    </PageContainer>
  );
}

export default DoesNotExist;
