"use client";
import { TextField, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { sweetAlert } from "@/components/alert";
import { error } from "console";
import Swal from "sweetalert2";
import { set } from "mongoose";

export default function Booking() {
    const [name, setName] = useState("");
    const [nameLast, setNameLast] = useState("");
    const [nameFist, setNameFirst] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");
    const [nameStatus, setNameStatus] = useState(0);
    const [nameLastStatus, setNameLastStatus] = useState(0);
    const [emailStatus, setEmailStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [passwordConStatus, setPasswordConStatus] = useState(0);
    const [telStatus, setTelStatus] = useState(0);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordCon, setShowPasswordCon] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordCon = () =>
        setShowPasswordCon((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const router = useRouter();

    const register = async () => {
        let formattedTel =
            "0" +
            tel
                .replace(/^\+66\s?(?=\d{2}\s?\d{3}\s?\d{4}$)/, "")
                .replace(/\s+/g, "-");
        if (!name || !email || !password || !tel) {
            sweetAlert(
                "Incomplete",
                "Please fill in all the fields",
                "warning"
            );
            return;
        }

        try {
            const newUser = await userRegister(
                name,
                email,
                password,
                formattedTel
            );
            if (newUser) {
                Swal.fire({
                    title: "Registration successful!",
                    // message: "Registration successful",
                    confirmButtonText: "👍 OK!",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Swal.fire("Saved!", "", "success");
                        router.push("/api/auth/signin");
                    }
                });
                // sweetAlert("Success", "Registration successful", "success");
                // router.push("/api/auth/signin");
            } else {
                sweetAlert("Failed", "Failed to register", "error");
            }
        } catch (error) {
            const err = error as Error;
            if (err.message === "Failed to register") {
                sweetAlert("Failed", "Email already in use", "error");
            } else {
                sweetAlert("Failed", "Failed to register", "error");
            }
            console.error(error);
        }
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setNameFirst(newName);
        setName(nameFist + " " + nameLast);
        if (newName.length > 0) {
            setNameStatus(2); // correct
        } else {
            setNameStatus(1); // error
        }
    };
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setNameLast(newName);
        setName(nameFist + " " + nameLast);
        if (newName.length > 0) {
            setNameLastStatus(2); // correct
        } else {
            setNameLastStatus(1); // error
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(e.target.value);
        if (emailRegex.test(e.target.value)) {
            setEmailStatus(2); // correct
        } else {
            setEmailStatus(1); // error
        }
    };

    const handlePasswordConChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const passwordCon = e.target.value;

        if (passwordCon === password) {
            setPasswordConStatus(2); // correct
        } else {
            setPasswordConStatus(1); // error
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumber = /\d/.test(newPassword);
        const hasMinLength = newPassword.length >= 6;

        if (hasUpperCase && hasLowerCase && hasNumber && hasMinLength) {
            setPasswordStatus(2); // correct
        } else {
            setPasswordStatus(1); // error
        }
    };

    const handleTelChange = (newPhone: string) => {
        const phoneRegex = /^\+66\s(\d{2})\s(\d{3})\s(\d{4})$/g;
        const isValid = phoneRegex.test(newPhone);

        setTel(newPhone);

        if (isValid) {
            setTelStatus(2); // correct
        } else {
            setTelStatus(1); // error
        }
    };

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "1000px" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random?wallpapers)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            // onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            {/* style={{ padding: 0 ,marginTop: '20px', paddingRight: '20px'}} */}
                            <Grid
                                container
                                spacing={2}
                                style={{ marginTop: "20px" }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    style={{
                                        paddingLeft: 0,
                                        paddingTop: "16px",
                                    }}
                                >
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        onChange={handleFirstNameChange}
                                        error={nameStatus === 1}
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onKeyDown={(event) => {
                                            if (event.key === ' ') {
                                                event.preventDefault();
                                            }
                                        }}
                                        sx={{
                                            // Root class for the input field
                                            "& .MuiOutlinedInput-root": {
                                                color:
                                                    nameStatus === 2
                                                        ? "green"
                                                        : "inherit",
                                                "& .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            nameStatus === 2
                                                                ? "green"
                                                                : "inherit",
                                                    },
                                            },
                                            // Class for the label of the input field
                                            "& .MuiInputLabel-outlined": {
                                                color:
                                                    nameStatus === 2
                                                        ? "green"
                                                        : "inherit",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        onChange={handleLastNameChange}
                                        error={nameLastStatus === 1}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onKeyDown={(event) => {
                                            if (event.key === ' ') {
                                                event.preventDefault();
                                            }
                                        }}
                                        sx={{
                                            // Root class for the input field
                                            "& .MuiOutlinedInput-root": {
                                                color:
                                                    nameLastStatus === 2
                                                        ? "green"
                                                        : "inherit",
                                                "& .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            nameLastStatus === 2
                                                                ? "green"
                                                                : "inherit",
                                                    },
                                            },
                                            // Class for the label of the input field
                                            "& .MuiInputLabel-outlined": {
                                                color:
                                                    nameLastStatus === 2
                                                        ? "green"
                                                        : "inherit",
                                            },
                                        }}
                                    />
                                </Grid>
                                {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Username"
                                name="name"
                                onChange={handleNameChange}
                                error={nameStatus === 1}
                                inputProps={{
                                    style: {
                                        color:
                                            nameStatus === 2
                                                ? "green"
                                                : "inherit",
                                    },
                                }}
                                sx={{
                                    // Root class for the input field
                                    "& .MuiOutlinedInput-root": {
                                        color:
                                            nameStatus === 2
                                                ? "green"
                                                : "inherit",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor:
                                                nameStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                        },
                                    },
                                    // Class for the label of the input field
                                    "& .MuiInputLabel-outlined": {
                                        color:
                                            nameStatus === 2
                                                ? "green"
                                                : "inherit",
                                    },
                                }}
                                helperText={
                                    nameStatus === 1
                                        ? "Name must be more than 3 characters"
                                        : ""
                                }
                                autoFocus
                            /> */}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleEmailChange}
                                    error={emailStatus === 1}
                                    sx={{
                                        // Root class for the input field
                                        "& .MuiOutlinedInput-root": {
                                            color:
                                                emailStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        emailStatus === 2
                                                            ? "green"
                                                            : "inherit",
                                                },
                                        },
                                        // Class for the label of the input field
                                        "& .MuiInputLabel-outlined": {
                                            color:
                                                emailStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                        },
                                    }}
                                    helperText={
                                        emailStatus === 1
                                            ? "Please enter a valid email address"
                                            : ""
                                    }
                                    autoFocus
                                    onKeyDown={(event) => {
                                        if (event.key === ' ') {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <MuiTelInput
                                    margin="normal"
                                    value={tel}
                                    onChange={handleTelChange}
                                    required
                                    fullWidth
                                    defaultCountry="TH"
                                    forceCallingCode
                                    error={telStatus === 1}
                                    sx={{
                                        // Root class for the input field
                                        "& .MuiOutlinedInput-root": {
                                            color:
                                                telStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        telStatus === 2
                                                            ? "green"
                                                            : "inherit",
                                                },
                                        },
                                        // Class for the label of the input field
                                        "& .MuiInputLabel-outlined": {
                                            color:
                                                telStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                        },
                                    }}
                                    helperText={
                                        telStatus === 1
                                            ? "Please enter a valid phone number. For example: 80 123 4567."
                                            : ""
                                    }
                                    id="Telephone Number"
                                    label="Telephone Number"
                                    name="Telephone Number"
                                    autoFocus
                                    
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    sx={{
                                        // Root class for the input field
                                        "& .MuiOutlinedInput-root": {
                                            color:
                                                passwordStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        passwordStatus === 2
                                                            ? "green"
                                                            : "inherit",
                                                },
                                        },
                                        // Class for the label of the input field
                                        "& .MuiInputLabel-outlined": {
                                            color:
                                                passwordStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                        },
                                    }}
                                    onChange={handlePasswordChange}
                                    error={passwordStatus === 1}
                                    helperText={
                                        passwordStatus === 1 ||
                                        passwordStatus === 0
                                            ? "The password must contain:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 number\n- At least 6 characters"
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))
                                            : ""
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === ' ') {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handlePasswordConChange}
                                    error={passwordConStatus === 1}
                                    sx={{
                                        // Root class for the input field
                                        "& .MuiOutlinedInput-root": {
                                            color:
                                                passwordConStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        passwordConStatus === 2
                                                            ? "green"
                                                            : "inherit",
                                                },
                                        },
                                        // Class for the label of the input field
                                        "& .MuiInputLabel-outlined": {
                                            color:
                                                passwordConStatus === 2
                                                    ? "green"
                                                    : "inherit",
                                        },
                                    }}
                                    helperText={
                                        passwordConStatus === 1
                                            ? "Passwords do not match"
                                            : ""
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === ' ') {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={register}
                                    disabled={
                                        nameStatus !== 2 ||
                                        emailStatus !== 2 ||
                                        telStatus !== 2 ||
                                        passwordStatus !== 2 ||
                                        passwordConStatus !== 2
                                    }
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2"></Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            href="../auth/signin"
                                            variant="body2"
                                        >
                                            {"have an account? Sign In"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
{
    /* <main className="flex justify-center items-center p-5">
<div className="w-fit items-center justify-center rounded-lg px-20 py-16 space-y-6 m-10"
    style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
    <div className="text-5xl font-medium text-black text-center rounded-lg p-5 mb-10 shadow-lg"
        style={{ backgroundColor: 'rgb(172, 226, 225)' }}>Register</div>

    <div className="w-fit space-y-2">
        {[
            { label: "Name", value: name, onChange: setName },
            { label: "Email", value: email, onChange: setEmail },
            { label: "Password", value: password, onChange: setPassword },
            { label: "Telephone Number", value: tel, onChange: setTel }
        ].map((field, index) => (
            <div key={index}>
                <div className="text-2xl text-left my-4 text-black">{`Enter your ${field.label}`}</div>
                <div className="w-[100%] rounded-lg space-x-5 space-y-2 px-10 py-5 text-black font-semibold shadow-lg"
                    style={{ backgroundColor: 'rgb(241, 250, 218)' }}>
                    <TextField className="text-2xl" fullWidth name={field.label} label={field.label} variant="standard"
                        value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                </div>  
            </div>
        ))}
    </div>

        <button className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-5 py-3 shadow-lg text-white mt-10 mx-auto text-2xl" name="Book Vaccine"
        onClick={register}>Register</button>
</div>
</main> */
}
