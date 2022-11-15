import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Empty = ({ image, title, subTitle, Button }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Box
      component="img"
      sx={{
        height: 350,
        width: 500,
      }}
      src={image}
    />
    <Typography mt={4} variant="h4">
      {title}
    </Typography>
    <Typography mt={1} variant="p">
      {subTitle}
    </Typography>
    {Button && (
      <Box sx={{ maxWidth: "200px", marginTop: "24px", width: "100%" }}>
        <Button fullWidth />
      </Box>
    )}
  </Box>
);

export default Empty;
