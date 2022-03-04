import styled from 'styled-components';

export const Envoltorio = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding-botton: 20px;

    div{
        flex: 1;
    }

    .informacion, 
    .botones{
        display: flex;
        justify-content: space-between;
    }

    img{
        max-width: 80px;
        object-fit: cover;
        margin-left: 40px;
    }
`;