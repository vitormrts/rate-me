import { Button } from "@mui/material";
import * as S from "./Feature.style";

const Feature = ({
  onSignUpClick,
  title,
  description,
  cta,
  image,
  imagePosition = "right",
  backgroundGray,
}) => {
  return (
    <S.Wrapper backgroundGray={backgroundGray}>
      <S.Container imagePosition={imagePosition}>
        <S.TextContent>
          <S.Title dangerouslySetInnerHTML={{ __html: title }} />
          <S.Description dangerouslySetInnerHTML={{ __html: description }} />
          <S.ButtonAdapter>
            <Button variant="contained" onClick={onSignUpClick}>
              {cta}
            </Button>
          </S.ButtonAdapter>
        </S.TextContent>
        <S.ImageAdapter>
          <S.Image src={image} />
        </S.ImageAdapter>
      </S.Container>
    </S.Wrapper>
  );
};

export default Feature;
