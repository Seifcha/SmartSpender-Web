import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import useAuth from "../hooks/useAuth";
import "./Register.css";

const IDENTIFIER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const identifierRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [validName, setValidName] = useState(false);
  const [identifierFocus, setIdentifierFocus] = useState(false);
  const [identifierTouched, setIdentifierTouched] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdTouched, setPwdTouched] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [matchTouched, setMatchTouched] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();

  const [errMsg, setErrMsg] = useState("");

  // Pour l'email
  const handleEmailChange = (e) => {
    const email = e.target.value;
    const isValid = /\S+@\S+\.\S+/.test(email);
    setIsValidEmail(isValid);
    setEmail(email);
  };

  const handleEmailFocus = () => setEmailFocus(true);
  const handleEmailBlur = () => {
    setEmailFocus(false);
    setEmailTouched(true);
  };

  // Pour le téléphone
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const isValid = /^[0-9]{8}$/.test(phone);
    setIsValidPhone(isValid);
    setPhone(phone);
  };

  const handlePhoneFocus = () => setPhoneFocus(true);
  const handlePhoneBlur = () => {
    setPhoneFocus(false);
    setPhoneTouched(true);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefreshHome");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefreshHome");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    setValidName(IDENTIFIER_REGEX.test(identifier));
  }, [identifier]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [identifier, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = IDENTIFIER_REGEX.test(identifier);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    const formdata = new FormData();
    formdata.append("photoProfil", file);
    formdata.append("username", identifier);
    formdata.append("hashedPwd", pwd);
    formdata.append("prenom", firstName);
    formdata.append("nom", lastName);
    formdata.append("phone", phone);
    formdata.append("email", email);
    try {
      const response = await axiosPrivate.post("/register", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;

      localStorage.setItem("username", identifier);

      setAuth({ identifier, pwd, accessToken });
      //*** */
      console.log("Réponse de l'API :", response.data);
      setIdentifier("");
      setPwd("");
      setMatchPwd("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Inscription</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstname">
          <Form.Label>Prénom:</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Nom:</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Téléphone:</Form.Label>
          <Form.Control
            type="tel"
            autoComplete="off"
            onChange={handlePhoneChange}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            value={phone}
            required
          />
          {phoneTouched && !isValidPhone && (
            <p className="error-message">
              Veuillez saisir un numéro de téléphone valide.
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="profile_picture">
          <Form.Label>Photo de profil:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFile}
            required
          />
        </Form.Group>

        <hr />

        <Form.Group controlId="username">
          <Form.Label>Nom d'utilisateur:</Form.Label>
          <Form.Control
            type="text"
            ref={identifierRef}
            autoComplete="off"
            onChange={(e) => setIdentifier(e.target.value)}
            value={identifier}
            required
            aria-invalid={validName ? "false" : "true"}
            onFocus={() => setIdentifierFocus(true)}
            onBlur={() => {
              setIdentifierFocus(false);
              setIdentifierTouched(true);
            }}
          />
          {identifierTouched && (
            <p
              className={
                validName ? "instructions valid" : "instructions invalid"
              }
            >
              {!validName ? (
                <>
                  Le nom d'administrateur doit avoir entre 4 et 24 caractères et
                  commencer par une lettre. Seuls les lettres, les chiffres, les
                  tirets bas (_) et les tirets (-) sont autorisés.
                </>
              ) : (
                <>Nom d'utilisateur valide.</>
              )}
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            type="email"
            autoComplete="off"
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            value={email}
            required
          />
          {emailTouched && !isValidEmail && (
            <p className="error-message">
              Veuillez saisir une adresse e-mail valide.
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => {
              setPwdFocus(false);
              setPwdTouched(true);
            }}
          />
          {pwdTouched && (
            <p
              className={
                validPwd ? "instructions valid" : "instructions invalid"
              }
            >
              {!validPwd ? (
                <>
                  Le mot de passe doit comporter entre 8 et 24 caractères et
                  inclure au moins une lettre majuscule, une lettre minuscule,
                  un chiffre et un caractère spécial parmi !, @, #, $, %.
                </>
              ) : (
                <>Mot de passe valide.</>
              )}
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="confirm_pwd">
          <Form.Label>Confirmer mot de passe:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => {
              setMatchFocus(false);
              setMatchTouched(true);
            }}
          />
          {matchTouched && (
            <p
              className={
                validMatch ? "instructions valid" : "instructions invalid"
              }
            >
              {!validMatch ? (
                <>Les mots de passe ne correspondent pas.</>
              ) : (
                <>Correspondance du mot de passe.</>
              )}
            </p>
          )}
        </Form.Group>

        <button
          disabled={
            !validName ||
            !validPwd ||
            !validMatch ||
            !isValidEmail ||
            !isValidPhone
          }
        >
          Inscription
        </button>
      </Form>
    </section>
  );
};

export default Register;
