import colorPallete from "@/common/styles/Colorpallete";
import styled from "styled-components";

interface StyledDefaultButtonProps {
    isFilled: boolean,
}

const StyledDefaultButton = styled.button<StyledDefaultButtonProps>`
    width: auto;
    height: auto;
    padding: .5em 2em .5em 2em;
    font-size: 1em;
    background-color: ${props => props.isFilled ? colorPallete.yellow : colorPallete.white} ;
    border: 1px solid ${props => props.isFilled ? colorPallete.yellow : colorPallete.black};
    color: ${props => props.isFilled ? colorPallete.white : colorPallete.black};
    border-radius: 3em;
`

export default StyledDefaultButton;