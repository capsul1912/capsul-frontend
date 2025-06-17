import React from "react"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { setAuthTokens } from "@/api/cookies"
import { AuthBox } from "@/features/auth-box"
import { toast } from "@/hooks/use-toast"
import { authApi } from "@/shared/lib/api/auth-api"
import { zodResolver } from "@hookform/resolvers/zod"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { z } from "zod"
import { loginSchema } from "./schema"

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false)

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: data => {
      setAuthTokens(data.access, data.refresh)
      console.log("Sign in successful:", data)
      toast({
        title: "Welcome back",
        description: "You've successfully signed in."
      })

      navigate("/main")
    },
    onError: error => {
      console.error("Sign in error:", error)
      if (isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          toast({
            title: "Cors Error",
            variant: "destructive"
          })
          return
        }

        if (error.status === 400) {
          setError("password", { message: "Invalid credentials" }, { shouldFocus: true })
        }
      }
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      })
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  const onSubmit = handleSubmit(data => {
    // Extract rememberMe from form data
    const { rememberMe, ...credentials } = data
    console.log("Form submitted:", credentials, rememberMe)
    // Set remember me preference
    // setRememberMe(rememberMe || false)

    // Call the mutation
    signIn(credentials)
  })

  return (
    <AuthBox title="Welcome to Capsul" subtitle="Welcome back! Please enter your details.">
      {" "}
      <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {" "}
        <FormControl>
          {" "}
          <FormLabel htmlFor="email">Email</FormLabel>{" "}
          <TextField
            fullWidth
            id="email"
            placeholder="your@email.com"
            autoComplete="email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />{" "}
        </FormControl>{" "}
        <FormControl>
          {" "}
          <FormLabel htmlFor="password">Password</FormLabel>{" "}
          <TextField
            fullWidth
            placeholder="••••••"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={() => setShowPassword(show => !show)}
                    edge="end"
                  >
                    {" "}
                    {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                  </IconButton>{" "}
                </InputAdornment>
              )
            }}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />{" "}
        </FormControl>{" "}
        <FormControlLabel control={<Checkbox value="rememberMe" color="primary" />} label="Remember me" />{" "}
        <Button type="submit" fullWidth variant="contained" disabled={isPending}>
          {" "}
          Sign in{" "}
        </Button>{" "}
      </Box>{" "}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {" "}
        <Typography sx={{ textAlign: "center" }}>
          {" "}
          Don't have an account?{" "}
          <Link href="/signup" variant="body2" sx={{ alignSelf: "center" }}>
            {" "}
            Sign up{" "}
          </Link>{" "}
        </Typography>{" "}
      </Box>{" "}
    </AuthBox>
  )
}
