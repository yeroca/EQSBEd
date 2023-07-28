import { Container } from "react-bootstrap";

const Usage = () => {
  return (
    <>
      <Container className="ms-2">
        <h4>Usage</h4>
        <p>
          After choosing your <i>&lt;character&gt;_&lt;server&gt;</i>.ini file
          from your Everquest folder at the top of the page, you can:
          <ul>
            <li key="ul1">
              click and drag a button from one location to another to swap those
              two buttons
            </li>
            <li key="ul2">double click on a button to view its contents</li>
          </ul>
          When you are finished, click the Download button below. Sock Drawer
          will store the file whereever you normally download files to, for
          example your Downloads folder.
        </p>
        <p>
          <strong>Warning: </strong>Before copying or moving the downloaded file
          to your Everquest folder, make sure to rename, move, or backup your
          original <i>&lt;character&gt;_&lt;server&gt;</i>.ini file.
        </p>
        <h4>Known issues</h4>
        <ul>
          <li key="ki_li1">
            If you have added whole-line comments to your{" "}
            <i>&lt;character&gt;_&lt;server&gt;</i>.ini file, those comments
            will be removed from the subsequently downloaded file. There will be
            no fix for this issue because of the way the .ini file is read,
            modified, and then written by Sock Drawer.
          </li>
        </ul>
        <h4>Known issues in Alpha 0.5</h4>
        <ul>
          <li key="kia0.5_li1">
            The contents of social buttons cannot be saved (yet)
          </li>
          <li key="kia0.5_li2">There is no UI for choosing the color (yet)</li>
        </ul>
        <h4>Future features</h4>
        <ul>
          <li key="ff_li1">Make content of social buttons savable</li>
          <li key="ff_li2">Add color picker</li>
          <li key="ff_li3">
            Add UI component that shows which hot keys are "linked" to the
            social button being edited
          </li>
        </ul>
      </Container>
    </>
  );
};

export default Usage;
