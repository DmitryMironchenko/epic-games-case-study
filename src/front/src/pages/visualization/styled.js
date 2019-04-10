import styled from 'styled-components';

export const StyledVizWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  color: ${p => p.theme.lightGreyColor};
  & p {
    margin: 0;
    line-height: 2em;
  }
`;

export const StyledTooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
