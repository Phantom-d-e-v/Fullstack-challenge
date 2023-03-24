import styles from "@/styles/Home.module.css";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";

export default function Home() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [userCards, setUserCards] = useState<Array<user>>([]);
  const [userExists, setUserExists] = useState(false);

  // defining user info types
  type user = {
    login: string;
    name: string;
    email: string;
    avatar_url: string;
    html_url: string;
    bio: string;
  };

  // Function to search user
  const searchUser = async (username: string, searchType: string) => {
    setUserCards([]);
    if (username.length >= 3) {
      const res = await fetch(`http://localhost:4000/users/`, {
        method: "POST",
        body: JSON.stringify({ username, searchType }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSearch(true);
      if (data.data.items.length === 0) {
        setUserExists(false);
      } else {
        setUserExists(true);
        for (let i = 0; i < data.data.items.length; i++) {
          // Fetching user profile data from the github api
          let profile = await fetch(data.data.items[i].url, {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`,
            },
          });
          let profile_data = await profile.json();
          data.data.items[i].bio = profile_data.bio;
          data.data.items[i].name = profile_data.name;
          data.data.items[i].email = profile_data.email;
          setUserCards((userCards) => [...userCards, data.data.items[i]]);
        }
      }
    } else {
      alert("Please enter atleast 3 characters");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value as string);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <main className={styles.main}>
          <div className={styles.description}>
            <AppBar>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  align="center"
                >
                  Github Users Search
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container spacing={3} direction={"column"}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ color: "white" }}
                      >
                        Search by
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={input}
                        label="Search by"
                        onChange={handleChange}
                      >
                        <MenuItem value={"username"}>Login</MenuItem>
                        <MenuItem value={"name"}>Name</MenuItem>
                        <MenuItem value={"email"}>Email</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    {input === "username" ? (
                      <div>
                        <TextField
                          id="outlined-basic"
                          label="Username"
                          variant="outlined"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                        <Button
                          size="large"
                          variant="contained"
                          sx={{
                            color: "white",
                            backgroundColor: "#1E2A35",
                            borderRadius: "5px",
                            margin: "5px",
                          }}
                          onClick={() => {
                            searchUser(username, "username");
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    ) : input === "name" ? (
                      <div>
                        <TextField
                          id="outlined-basic"
                          label="Name"
                          variant="outlined"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <Button
                          size="large"
                          variant="contained"
                          sx={{
                            color: "white",
                            backgroundColor: "#1E2A35",
                            borderRadius: "5px",
                            margin: "5px",
                          }}
                          onClick={() => {
                            searchUser(name, "name");
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    ) : input === "email" ? (
                      <div>
                        <TextField
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <Button
                          size="large"
                          variant="contained"
                          sx={{
                            color: "white",
                            backgroundColor: "#1E2A35",
                            borderRadius: "5px",
                            margin: "5px",
                          }}
                          onClick={() => {
                            if (/\S+@\S+\.\S+/.test(email)) {
                              searchUser(email, "email");
                            } else {
                              alert("Please enter a valid email address");
                            }
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{}}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 10, md: 12 }}
                  >
                    {search ? (
                      userExists ? (
                        userCards.map((name, index) => {
                          return (
                            <div key={index}>
                              <Grid item xs={8} sm={12} md={10} key={index}>
                                <Card
                                  sx={{
                                    maxWidth: 500,
                                    maxheight: "30vw",
                                    backgroundColor: "#070C12",
                                  }}
                                >
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      height="500"
                                      width="500"
                                      src={name.avatar_url}
                                      alt="NA"
                                    />
                                    <CardContent>
                                      <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                      >
                                        Name: {name.name}
                                      </Typography>
                                      <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                      >
                                        Username: {name.login}
                                      </Typography>
                                      <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                      >
                                        Email: {name.email}
                                      </Typography>
                                      <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                      >
                                        Website: {name.html_url}
                                      </Typography>
                                      <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        height={50}
                                        width={400}
                                        overflow={"auto"}
                                        sx={{ whiteSpace: "wrap" }}
                                        fontSize={16}
                                      >
                                        Bio: {name.bio}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              </Grid>
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          <p>No users found</p>
                        </div>
                      )
                    ) : null}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
