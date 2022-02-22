import logo from "./logo.svg";
import "./App.css";
import liff from "@line/liff";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const initLine = () => {
    liff.init(
      { liffId: "1656915885-EZKrMG0B" },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff
      .getProfile()
      .then((profile) => {
        console.log(profile);
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setUserId(profile.userId);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <h1 className="text-light"> Login Test</h1>
        <div className="row">
          <div className="col bg-box">
            <img src={pictureUrl} style={{ width: "300px" }} />
            <p
              style={{
                textAlign: "left",
                marginLeft: "20%",
                marginRight: "20%",
              }}
            >
              <b style={{ color: "#F87B40 " }}>User name: </b> {displayName}
            </p>
          </div>
          <div className="col bg-box">
            <h3 style={{ color: "#F87B40 " }}>หารเลขทศนิยม</h3>
            <div className="row">
              <div className="col-4 text-end">
                <h4 style={{ color: "#F87B40 " }}>ตัวตั้ง :</h4>
              </div>
              <div className="col-6">
                <input className="w-100 rounded" style={{ borderColor: "#F87B40 " }} type="number" name="name" />
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-4 text-end">
                <h4 style={{ color: "#F87B40 " }}>ตัวหาร :</h4>
              </div>
              <div className="col-6">
              <input className="w-100 rounded" style={{ borderColor: "#F87B40 " }} type="number" name="name" />
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-4 text-end">
                <h4 style={{ color: "#F87B40 " }}>ผลลัพธ์ :</h4>
              </div>
              <div className="col-6">
              <h3>ผลหาร</h3>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>

        <Button
          className="btn btn-light w-25 shadow"
          onClick={() => logout()}
          style={{ width: "100%", background: "#F5F5F5", color: "#F87B40 " }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default App;
