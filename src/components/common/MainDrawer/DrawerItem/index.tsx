import React, {FC} from 'react';
import {Box, IconButton, Typography, useTheme} from "@mui/material";
interface IProps{
  children: React.ReactNode;
  title: string;
  setCheckedItem: React.Dispatch<React.SetStateAction<string>>
}
const DrawerItem :FC<IProps> = ({children,title,setCheckedItem}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        p: '20px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
        },
      }}
      onClick={() => setCheckedItem(title)}
    >
      <IconButton edge="end" size="small" color="secondary" aria-label="SettingsIcon">
        {children}
      </IconButton>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 700,
          lineHeight: '20px',
          textAlign: 'left',
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default DrawerItem;
