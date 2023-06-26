import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const main = {
  backgroundColor: "#f6f9fc",
};

const header = {
  fontSize: "45px",
  color: "#012C43",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const container = {
  margin: "20px auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  minWidth: "40rem",
  borderRadius: "10px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const box = {
  padding: "0 48px",
};
const logo = {
  margin: "1.5rem auto 0px auto",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const detailHeader = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "10px",
};

const detailSubHeader = {
  color: "#525f7f",
  fontSize: "25px",
};

const button = {
  backgroundColor: "#012C43",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  margin: "0.3rem 0",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const cancelAppointment = {
  backgroundColor: "#F04438",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  margin: "0.2rem 0",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const details = {
  backgroundColor: "#ffff",
  textAlign: "left" as const,
  borderRadius: "10px",
  margin: "20px 0px",
  height: "auto",
  padding: "0.5rem 1em",
  border: "1px solid rgb(0,0,0, 0.1)",
};

export type AppointmentConfirmedProps = {
  appointmentDate: string;
  services: string;
  price: string;
  cancelUrl: string;
  rescheduleUrl: string;
};

export const AppointmentConfirmed = ({
  appointmentDate = "Sunday 20th June 2021, 10:00am",
  services = "Haircut",
  price = "$20",
  cancelUrl = "https://www.schedlu.ca",
  rescheduleUrl = "https://www.schedlu.ca",
}: Partial<AppointmentConfirmedProps>) => (
  <Html lang="en">
    <Head />
    <Preview>Your appointment is now confirmed!</Preview>
    <Body style={main}>
      {" "}
      <Container style={container}>
        {" "}
        <Img
          src={`https://images2.imgbox.com/ce/b8/iTd6NHXT_o.png`}
          width="220"
          height="70"
          style={logo}
        />
        <Section style={box}>
          <Heading style={header} as="h2">
            Your appointment has been booked!
          </Heading>

          <Section style={details}>
            <Section>
              <Text style={detailHeader}>
                <b>Appointment Date</b>
                <Text style={detailSubHeader}>{appointmentDate}</Text>
              </Text>{" "}
            </Section>{" "}
            <Section>
              <Text style={detailHeader}>
                <b>Services</b>
                <Text style={detailSubHeader}>{services}</Text>
              </Text>{" "}
            </Section>
            <Section>
              <Text style={detailHeader}>
                <b>Total Price</b>
                <Text style={detailSubHeader}>{price}</Text>
              </Text>{" "}
            </Section>
          </Section>

          <Section>
            <Button pX={0} pY={15} style={button} href={rescheduleUrl}>
              Reschedule or Change Appointment
            </Button>{" "}
            <Button pX={0} pY={15} style={cancelAppointment} href={cancelUrl}>
              Cancel Appointment
            </Button>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AppointmentConfirmed;
