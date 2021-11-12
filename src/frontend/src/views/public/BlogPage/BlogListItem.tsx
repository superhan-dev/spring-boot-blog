import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

interface Blog {
  date: string;
  title: string;
  subtitle: string;
  paragraph: string;
}

interface BlogListItemProps {
  blog: Blog;
}

export const BlogListItem: React.FC<BlogListItemProps> = ({ blog }) => {
  const { date, title, subtitle, paragraph } = blog;

  return (
    <Card sx={{ minWidth: 275, width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">{paragraph}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">상세보기</Button>
      </CardActions>
    </Card>
  );
};
