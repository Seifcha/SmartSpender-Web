import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const Login = () => {
  const { setAuth, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://:9000/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;

      localStorage.setItem("username", user);

      localStorage.setItem("persist", true);
      setPersist(true);

      // localStorage.setItem("peutRetourner", true);
      // setPeutRetourner(true);
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="signin-section">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <p>SmartSpender: L'administration</p>
      <h1>Connexion</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>nom utilisateur:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </Form.Group>

        <button className="btn-primary">Connexion</button>
      </Form>

      <div className="auth-options">
        <Button variant="primary" as={Link} to="/forgot-password">
          Mot de passe oublié
        </Button>
      </div>
    </section>
  );
};

export default Login;
