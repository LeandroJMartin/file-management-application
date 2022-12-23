import styled, { createGlobalStyle } from "styled-components";
import { animated } from 'react-spring';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        /* width */
        ::-webkit-scrollbar {
        width: 6px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: #adc80a; 
        border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background: #adc80a; 
        }
    }

    body {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    button,
    input {
        border: none;
        outline: none;
    }
`;


export const inputsHeight = "52px"
export const borderRadius = "6px"


export const theme = {
    color: {
        primary: "#adc80a",
        secondary: "#004518",
        ligth_green: "#99b5a3",
    },
}

export const Container = styled(animated.div)`
    display: ${props => props.display || null};
    grid-template-columns: ${props => props.gridTemCol || null};
    grid-gap: ${props => props.gGap || null};
    flex: ${props => props.flex || null};
    flex-direction: ${props => props.direction || "row"};
    flex-wrap: ${props => props.flexWrap};
    justify-content: ${props => props.jContent || null};
    align-items: ${props => props.aContent || null};
    align-self: ${props => props.aSelf || null};
    justify-self: ${props => props.jSelf || null};
    position: ${props => props.position || "relative"};
    top: ${props => props.top || null};
    right: ${props => props.right || null};
    bottom: ${props => props.bottom || null};
    left: ${props => props.left || null};
    min-width: ${props => props.minWidth || null};
    max-width: ${props => props.maxWidth || null};
    width: ${props => props.width || "100vw"};
    min-height: ${props => props.minHeight || null};
    height: ${props => props.height || null};
    background-color: ${props => props.bgColor || "transparent"};
    border: ${props => props.border || null};
    border-top-left-radius: ${props => props.bRadiusTopLeft};
    border-top-right-radius: ${props => props.bRadiusTopRight};
    border-right: ${props => props.bRight || null};
    border-bottom: ${props => props.bBottom || null};
    border-radius: ${props => props.bRadius || 0};
    padding: ${props => props.padding || null};
    margin: ${props => props.margin || null};
    cursor: ${props => props.cursor || "default"};
    z-index: ${props => props.zIndex || null};
    overflow: ${props => props.overflow || null};
    overflow-y: ${props => props.overflowY || null};
    overflow-x: ${props => props.overflowX || null};
    transition: ${props => props.transition || null};
    box-shadow: ${props => props.bShadow || null};

    &:hover {
        background-color: ${props => props.bgColorHover || null};
    }
`;

export const Img = styled.img`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "100%"};
    object-fit: ${props => props.objFit || null};
    object-position: center;
    src: ${props => props.src || null};
    margin: ${props => props.margin || null};
    border-radius: ${props => props.bRadius || null};
`;

export const Input = styled.input`
    display: ${props => props.display || null};
    width: ${props => props.width || "100%" };
    height: ${props => props.height || inputsHeight};
    border: ${props => props.border || null};
    border-radius: ${props => props.bRadius || null};
    font-size: ${props => props.fSize || "1rem"};
    font-weight: ${props => props.fWeight || null};
    margin: ${props=> props.margin || 0};
    padding: ${props => props.padding || 0};

    &::placeholder {
        color: ${props => props.phColor || "black"};
    }
`;

export const Span = styled.span`
    display: ${props => props.display || "flex"};
    flex: ${props => props.flex || null};
    min-width: ${props => props.minWidth || null};
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    color: ${props => props.color || "black"};
    font-size: ${props => props.fSize || "1rem"};
    font-weight: ${props => props.fWeight || null};
    cursor: ${props => props.cursor || "default"};
    border-right: ${props => props.bRight || null};
    margin: ${props => props.margin || null};
    padding: ${props => props.padding || null};
    justify-content: ${props => props.jContent || null};
    align-items: ${props => props.aContent || null};
    transform: ${props => props.rotate || null};
    transition: ${props => props.transition || null};
    user-select: ${props => props.userSelect || null};

    &:hover {
        color: ${props => props.colorHover || null};
        background-color: ${props => props.bgColorHover || null};
    }
`;

export const Button = styled.button`
    display: ${props => props.display || "flex"};
    position: ${props => props.position || null};
    right: ${props => props.right || null};
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    justify-content: ${props => props.jContent || null};
    align-items: ${props => props.aContent || null};
    font-size: ${props => props.fSize || "1rem"};
    font-weight: ${props => props.fWeight || 0};
    color: ${props => props.color || "black"};
    background-color: ${props => props.bgColor || "gray"};
    padding: ${props => props.padding || 0};
    margin: ${props => props.margin || 0};
    border: ${props => props.border || null};
    border-radius: ${props => props.bRadius || 0};
    cursor: ${props => props.cursor || "default"};
    transition: all .1s;

    &:hover {
        opacity: .9;
    }
`;