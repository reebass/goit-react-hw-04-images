import { LoaderContainer } from "./Loader.styled"
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
    return (
    <LoaderContainer>
        <ThreeDots
        height="100"
        width="80"
        radius="9"
        color="#106adf"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderContainer>
    )
}