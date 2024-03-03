import {Background, LoadingText} from './Styles';
import Spinner from '../assets/spinner.gif';

export default function Loading() {
  return (
    <Background>
        <LoadingText>Loading</LoadingText>
        <img src={Spinner} alt="로딩중" width="10%" />
    </Background>
  );
}
