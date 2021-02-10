import React from 'react'
import styled from 'styled-components';

const TitleBlock = styled.div`
    display: inline-block;
    font-weight: bold; 
    font-size: 2rem;
    color: #212529;
    border-bottom: 3px solid #212529; 
    margin-bottom: 1.5rem;
`;

function Title({ children }) {
    return <TitleBlock>{children}</TitleBlock>;
}

export default Title
