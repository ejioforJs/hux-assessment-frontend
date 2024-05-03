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
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";

export default function ContactList() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentId, setCurrentId] = React.useState("")
  const [currentFirstName, setCurrentFirstName] = React.useState("")
  const [currentLastName, setCurrentLastName] = React.useState("")
  const [currentPhoneNumber, setCurrentPhoneNumber] = React.useState("")

  const [contactList, setContactList] = React.useState<any>([]);

  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;

  React.useEffect(() => {
    const getContacts = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `http://localhost:8001/api/v1/contacts/getContacts/${userInfo?._id}`,
          config
        );
        console.log(response.data)
        setContactList(response.data);
        console.log(contactList)
      } catch (error: any) {
        toast.error("Error occured while fetching contacts");
      }
    };
    getContacts();
  }, []);

  const editContact = (id:any,firstName: any,lastName: any,phoneNumber: any) => {
    navigate("/editcontact", { state: { id,firstName,lastName,phoneNumber } })
  }

  const deleteContact = async(id:string) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:8001/api/v1/contacts/deleteContact",
        {
          id
        },
        config
      );
      toast.success("Contact successfully deleted");
      
      window.location.reload();
    } catch (error:any) {
      toast.error("error occured");
    }
  }

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
        {contactList.length > 0 ? (
          <>
            {contactList.map((contact:any) => (
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={contact._id}
                direction="row"
                spacing={2}
              >
                <Typography textTransform="capitalize" variant="body1">{contact.firstName} {contact.lastName} </Typography>
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
                    onClick={() => editContact(contact._id,contact.firstName,contact.lastName,contact.phoneNumber)}
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
                    onClick={() => deleteContact(contact._id)}
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
                    onClick={() => { 
                      setCurrentId(contact._id);
                      setCurrentFirstName(contact.firstName);
                      setCurrentLastName(contact.lastName);
                      setCurrentPhoneNumber(contact.phoneNumber);
                      handleOpen()
                    }}
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
          </>
        ) : (
          <p>No Contacts yet</p>
        )}
      </Container>
      <ContactDetails
        open={open}
        currentId={currentId}
        currentFirstName={currentFirstName}
        currentLastName={currentLastName}
        currentPhoneNumber={currentPhoneNumber}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
}
