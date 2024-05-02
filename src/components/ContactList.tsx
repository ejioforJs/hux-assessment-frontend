import * as React from "react";
import { IconButton, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { ContactDetails } from "./ContactDetails";

export default function ContactList() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "50%",
        ml: "25%",
        mt: "70px",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 80%",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          ml: "0",
          mt: "50px",
        },
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          height: "80vh",
          paddingBottom: "30px",
          pt: "20px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "gray",
          overflowY: "scroll",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            marginBottom={"20px"}
            fontSize={"20px"}
            fontWeight={"bold"}
          >
            Contact List
          </Typography>
          <Button
            onClick={() => navigate("/addcontact")}
            size="small"
            variant="contained"
            color="primary"
          >
            Add New Contact
          </Button>
        </Stack>
        {contacts.map((contact) => (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={contact.id}
            direction="row"
            spacing={2}
          >
            <Typography variant="body1">{contact.name}</Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <Button
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                })}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => navigate("/editcontact")}
              >
                Edit
              </Button>              
              <Button
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                })}
                size="small"
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                })}
                size="small"
                variant="contained"
                color="info"
                onClick={handleOpen}
              >
                Details
              </Button>
            </Stack>
            <Stack
              sx={(theme) => ({
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
              })}
            >
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="more details">
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Container>
      <ContactDetails open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
    </Box>
  );
}
