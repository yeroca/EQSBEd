import { Container } from "react-bootstrap";

const Usage = () => {
  return (
    <>
      <Container className="ms-2">
        <h4>Purpose</h4>
        <p>
          Sock Drawer is an Everquest social button (aka macro) editor that you
          use while you are logged out of the game. With it, you can rearrange
          your Everquest social buttons, as well as edit them in a more
          user-friendly way than the game itself allows. For example, you can
          easily copy and paste lines, shift lines up and down, just like you
          would in an editor like Notepad. Everquest itself doesn't allow you to
          move social buttons around, but Sock Drawer does.
        </p>
        <p>
          If you have tried to edit a <i>&lt;character&gt;_&lt;server&gt;</i>
          .ini file before, you might wonder if Sock Drawer deals with the hot
          buttons that "link" to the social buttons. The answer is yes; Sock
          Drawer searches for and updates all of your hot buttons that are
          connected with the two buttons you swapped.
        </p>
        <p>
          So, in general, Sock Drawer is a big-ish upgrade to the in-game social
          button editor, except that you have to use it while logged out, which
          is admittedly a disadvantage.
        </p>
        <h4>Usage</h4>
        <ol>
          <li key="st10">
            Log out of your Everquest account completely, because it's not clear
            when Everquest reads and writes your{" "}
            <i>&lt;character&gt;_&lt;server&gt;</i>.ini file.
          </li>
          <li>
            Widen the browser window as much as possible on your monitor, as
            this will make the button labels fit better.
          </li>
          <li>
            After choosing your <i>&lt;character&gt;_&lt;server&gt;</i>.ini file
            from your Everquest folder at the top of the home Sock Drawer page,
            you can:
            <ul>
              <li key="ul1">
                click and drag a button from one location to another to swap
                those two buttons
              </li>
              <li key="ul2">
                double click on a button to view and/or edit its contents
              </li>
            </ul>
          </li>
          <li>
            When you are finished, click the Download button below. Sock Drawer
            will store the file wherever you normally download files to, for
            example your Downloads folder.
          </li>
        </ol>
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
          <li key="ki_li2">
            You may notice that some buttons on page 1 appear empty. This is
            because some buttons, if empty, have default values given by the
            game itself, such as a button for Consider which does a /con
            command. These defaults do not actually appear in the{" "}
            <i>&lt;character&gt;_&lt;server&gt;</i>.ini file, so Sock Drawer
            does not display them. I don't see a strong reason to emulate this
            default behavior in Sock Drawer, so instead you will see blank
            buttons there if you haven't redefined them already. I don't expect
            to change this behavior in the future.
          </li>
        </ul>
        <h4>Known issues in 0.9.2 Beta</h4>
        <ul>
          <li key="kir_li2">
            Once you click accept, there is no validity checking on the
            commands. If you have entered more than five lines of commands,
            lines past the fifth will be cut off without warning.
          </li>
          <li key="kir_li3">
            After loading a <i>&lt;character&gt;_&lt;server&gt;</i>.ini, if you
            then switch to one of the documentation pages, and back again, the
            file name in the "Browse..." field will say, "No file selected".
            However this is just visual, because Sock Drawer still knows the
            file name, as shown in the header of the social button pages.
          </li>
        </ul>
        <h4>Future features</h4>
        <ul>
          <li key="ff_li3">
            Add validity checking on social button editor commands field
          </li>
        </ul>
      </Container>
    </>
  );
};

export default Usage;
