import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CONTACTDETAILSPROPS {
  open: any;
  setOpen: any;
  handleOpen: any;
  handleClose: any;
  currentId: string,
  currentFirstName: string,
  currentLastName: string,
  currentPhoneNumber: any
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ContactDetails: React.FC<CONTACTDETAILSPROPS> = ({
  open,
  handleClose,
  currentId,
  currentFirstName,
  currentLastName,
  currentPhoneNumber
}) => {

  const navigate = useNavigate()

  const deleteContact = async() => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        "http://localhost:8001/api/v1/contacts/deleteContact",
        {
          id: currentId
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
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Contact Details
            </Typography>
            <Stack
              sx={{
                mt: "10px",
              }}
            >
              <Typography>
                <Typography sx={{ fontWeight: "bold", display: "inline" }}>
                  First Name:
                </Typography>{" "}
                {currentFirstName}
              </Typography>
              <Typography>
                <Typography sx={{ fontWeight: "bold", display: "inline" }}>
                  Last Name:
                </Typography>{" "}
                {currentLastName}
              </Typography>
              <Typography>
                <Typography sx={{ fontWeight: "bold", display: "inline" }}>
                  Phone Number:
                </Typography>{" "}
                {currentPhoneNumber}
              </Typography>
              <Button onClick={deleteContact} sx={{mt: "15px"}} size="small" variant="contained" color="error">
                Delete Contact
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
