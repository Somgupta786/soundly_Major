import Logo from "../LogoIcon";
import { useState,useContext} from "react";
// import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginContext } from "../../../AppRouter";
import axios  from "../../../Api/auth";
export default function SignUpCard() {
 
  const Navigation = useNavigate();
  // const [isClicked, setClicker] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isEmail, setEmail] = useState(true);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [error, setError] = useState();
  
  const email_valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobile_valid = /^((\+91)|(91)|0?)[6-9]\d{9}$/;

  const continueHandler = async (e) => {
    setLoad(true);
    e.preventDefault();

    if (isEmail) {
      try {
        const response = await axios.post(
          "user/register/email/",
          {
            username: inputs.username,
            email: inputs.email,
          }
        );

        console.log(response);

        setError(response.data);

        if (response.data.success) {
       
          toast("OTP SENT!");
          Navigation("/Otp", {
            state: {
              username: inputs.username,
              email: inputs.email,
              id: 1,
              isEmail: { isEmail },
            },
          });
        } else {
          setLoad(false);
        }
      } catch (error) {
        console.log(error.response);
        setLoad(false);

        if (error.response) {
          setError(error.response.data);
        } else {
          console.log(error);
          setLoad(false);
        }
      }
    } else {
      try {
        const response = await axios.post(
          "user/register/phone/",
          {
            username: inputs.username,
            phone_number: inputs.phone_number,
          }
        );
        setError(response.data);

        if (response.data.success) {
          
          toast("OTP SENT!");

          Navigation("/Otp", {
            state: {
              username: inputs.username,
              email: inputs.phone_number,
              id: 1,
              isEmail: { isEmail },
            },
          });
        } else {
          setClicker(true);
          setLoad(false);
        }
      } catch (error) {
        setLoad(false);

        if (error.response) {
          setError(error.response.data);
        } else {
          console.log(error);

          setLoad(false);
        }
      }
    }
  };

  const boxStyle = {
    border: error ? "2px solid red" : null,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type !== "text") {
      if (isEmail) {
        if (value.trim() === "") {
          setError();
        } else {
          const emailError =
            name === "email" &&
            (value.trim() === "" ||
              !email_valid.test(value.trim()) ||
              value.length > 50)
              ? setError({
                  message: "Enter the email correctly!",
                })
              : setError();
        }
      } else {
        if (value.trim() === "") {
          setError();
        } else {
          const emailError =
            name === "phone_number" &&
            value.trim() !== "" &&
            !mobile_valid.test(value.trim())
              ? setError({
                  message: "10 valid digits needed!",
                })
              : setError();
        }
      }
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div className="signUpCard">
      <div>
        <form className="signUpFrame" id="signUp" onSubmit={continueHandler}>
          <div className="welcome">
            <div className="welcomeText">Welcome to</div>
            <div className="try">
              <Logo />
            </div>
          </div>
          <div className="loginText">
            Sign Up to have an access to millions of songs
          </div>
          <div className="label">
            <input
              required
              type={isEmail ? "email" : "number"}
              name={isEmail ? "email" : "phone_number"}
              value={isEmail ? inputs.email : inputs.phone_number}
              onChange={handleInputChange}
              className="loginField"
              placeholder={isEmail ? "Email" : "Phone Number"}
              style={boxStyle}
            />
            <div className="emailText"> {isEmail ? "Email" : "Phone no."} </div>
            {error ? <p className="errorMsg">{error.message}</p> : null}
          </div>
          <div className="label">
            <input
              required
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleInputChange}
              className="loginField"
              placeholder="  Username"
            />
            <div className="emailText"> Enter Username</div>
          </div>

          <div className="rememberMe">
            <input type="checkbox" className="checkBox" required />
            <span className="rememberText">
              By creating an account, you agree to accept our Privacy Policy.
            </span>
          </div>
          <div className="phoneLogin" onClick={() => setEmail(!isEmail)}>
            {isEmail ? "Sign Up with Phone number?" : "Sign Up with Email."}
          </div>
          <div className="submitLogin">
            <button
              type={isLoad ? "button" : "submit"}
              className="continueButton"
              disabled={error}
            >
              {isLoad ? <div className="loader"></div> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
