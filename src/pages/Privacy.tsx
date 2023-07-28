import { Container } from "react-bootstrap";

const Privacy = () => {
  return (
    <>
      <Container className="ms-2">
        <h4>Privacy and Security</h4>
        <p>
          This app runs completely locally in your web browser. No data of any
          kind will be transferred off of your computer. This will never change.
          Also it makes the development of the app easier, and requires no
          hosting fees.
        </p>
      </Container>
    </>
  );
};

export default Privacy;
