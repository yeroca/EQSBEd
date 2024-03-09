import { Container } from "react-bootstrap";

const Privacy = () => {
  return (
    <>
      <Container className="ms-2">
        <h4>Privacy and Security</h4>
        <div>SockDrawer:</div>
        <ul>
          <li key="psl1">
            Runs completely locally in your web browser. This will never change.
          </li>
          <li key="psl2">
            Will not transfer any kind of data off of your computer nor store
            any kind of data on your computer (except when you request
            downloading your revised .ini file). This will never change.
          </li>
          <li key="psl3">
            Doesn't read or store cookies. This will never change.
          </li>
          <li key="psl4">Is completely free to use. This will never change.</li>
          <li key="psl3">
            Doesn't track your IP or other personal data. This will never
            change.
          </li>
        </ul>
      </Container>
    </>
  );
};

export default Privacy;
