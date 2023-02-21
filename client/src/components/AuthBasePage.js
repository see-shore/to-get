import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
`;
const FormWrapper = styled.div`
  padding: 20vh 9vh;
  display: flex;
  flex-direction: column;
`;
const ImageWrapper = styled.div`
  background: #abe5c2;
  width: 50vw;
  height: 100vh;
`;

const RememberCheck = styled.label`
  display: flex;
`;

function AuthBasePage({ type = 'login' }) {
  return (
    <PageContainer>
      <ImageWrapper></ImageWrapper>
      {type == 'login' ? (
        <FormWrapper>
          <h1>Welcome Back</h1>
          <p>Please enter your details</p>
          <form>
            <label>
              <p>Email</p>
              <input type='text' />
            </label>
            <label>
              <p>Password</p>
              <input type='password' />
            </label>
            <RememberCheck>
              <input type='checkbox' />
              <p>Remember me</p>
            </RememberCheck>

            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
          <Link to='/create-account'>Sign up</Link>
        </FormWrapper>
      ) : (
        <FormWrapper>
          <h1>Create an account</h1>
          <form>
            <label>
              <p>Full Name</p>
              <input type='text' />
            </label>
            <label>
              <p>Email</p>
              <input type='text' />
            </label>
            <label>
              <p>Password</p>
              <input type='password' />
            </label>

            <div>
              <button type='submit'>Sign Up</button>
            </div>
          </form>
          <Link to='/login'>Log in</Link>
        </FormWrapper>
      )}
    </PageContainer>
  );
}
export default AuthBasePage;
