import { Container } from "react-bootstrap";

const Privacy = () => {
  return (
    <>
      <Container className="ms-2">
        <h4>Privacy and Security</h4>
        <div>Sock Drawer:</div>
        <ul>
          <li key="psl1">Runs completely locally in your web browser.</li>
          <li key="psl2">
            Will not transfer any kind of data off of your computer. This will
            never change.
          </li>
          <li key="psl3">Doesn't read or store cookies.</li>
          <li key="psl4">Is completely free to use and always will be.</li>
        </ul>
      </Container>
    </>
  );
};

export default Privacy;
