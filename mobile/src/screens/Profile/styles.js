import styled from 'styled-components/native';

import { Button } from '~/components';

export { Title, Container } from '~/screens/Dashboard/styles';
export { FormInput, SubmitButton } from '~/screens/SignIn/styles';

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;
