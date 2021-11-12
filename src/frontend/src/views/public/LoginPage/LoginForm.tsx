import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Box,
  Button,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Grid,
  FormHelperText,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLoginMutation } from "../../../features/auth/authApi";

import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router";


export interface LoginFormProps {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("사용자 명을 입력해 주세요."),
  password: yup.string().required("패스워드는 필수값 입니다."),
});

// 기본 form value 정의 reset때 사용한다.
const defaultValues: LoginFormProps = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { status, isLoading, isSuccess, isError }] =
    useLoginMutation();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let from = location.state?.from?.pathname || "/";

    if (isSuccess) {
      enqueueSnackbar("로그인 성공", { variant: "success" });
      navigate(from, { replace: true });
    }
  }, [isSuccess, status, enqueueSnackbar, navigate, location]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("로그인 실패", { variant: "error" });
    }
  }, [isError, status, enqueueSnackbar]);

  const { control, handleSubmit, reset, formState } = useForm<LoginFormProps>({
    mode: "onBlur", // | mode: "onChange"
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = handleSubmit(async (values: LoginFormProps) => {
    const { username, password } = values;
    // submit logic 정의
    try {
      await login({
        username: username,
        password: password,
      });
      reset();
    } catch (error) {
      console.log("handleSubmit error", error);
    }
  });

  return (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
    >
      <form noValidate onSubmit={onSubmit}>
        <CardHeader
          color="primary"
          sx={{
            width: "auto",
            textAlign: "center",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-40px",
            padding: "20px 0",
            marginBottom: "15px",
          }}
        >
          <h4>Login</h4>
        </CardHeader>
        <Box
          sx={{
            marginTop: "30px",
            marginBottom: "0px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Login</Typography>
        </Box>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Controller
                control={control}
                name="username"
                defaultValue={""}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <FormControl error={!!error} variant="standard" fullWidth>
                    <InputLabel htmlFor="username-label">Username</InputLabel>
                    <Input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      name={name}
                      inputRef={ref}
                    ></Input>
                    <FormHelperText id="username-label-text">
                      {error?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <FormControl error={!!error} fullWidth variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      fullWidth
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      name={name}
                      inputRef={ref}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id="password-label-text">
                      {error?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            paddingTop: "0rem",
            border: "0",
            borderRadius: "6px",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            color="primary"
            size="large"
            disabled={!formState.isValid}
          >
            {isLoading ? <CircularProgress size={24} /> : <p>Login</p>}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
